import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import he from 'he'

type Question = {
    id: number;
    category: string;
    question_type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

const Quiz: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const fetchQuestions = async (difficulty: string) => {
            try {
                const response = await axios.get<Question[]>('http://localhost:3000/questions', {
                    params: { difficulty },
                });
                console.log(response);
                const shuffledQuestions = getRandomQuestions(response.data, 10, difficulty); // Adjust count as needed
                setQuestions(shuffledQuestions);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch questions');
                setLoading(false);
            }
        };

        const difficultyParam = new URLSearchParams(location.search).get('difficulty');
        if (difficultyParam) {
            fetchQuestions(difficultyParam);
        }
    }, [location.search]);

    const getRandomQuestions = (questions: Question[], count: number, difficulty: string): Question[] => {
        // Filter questions by difficulty
        const filteredQuestions = questions.filter(question => question.difficulty === difficulty);
        const questionMap: { [key: number]: Question } = {};
        filteredQuestions.forEach(question => {
            questionMap[question.id] = question;
        });

        const uniqueQuestions = Object.values(questionMap);

        const groupedByType = uniqueQuestions.reduce((acc: { [key: string]: Question[] }, question) => {
            (acc[question.question_type] = acc[question.question_type] || []).push(question);
            return acc;
        }, {});

        const types = Object.keys(groupedByType);
        let selectedQuestions: Question[] = [];

        types.forEach(type => {
            selectedQuestions = selectedQuestions.concat(groupedByType[type].slice(0, 2));
        });

        const remainingCount = count - selectedQuestions.length;
        const remainingQuestions = uniqueQuestions.filter(
            question => !selectedQuestions.includes(question)
        );

        selectedQuestions = selectedQuestions.concat(
            remainingQuestions.sort(() => 0.5 - Math.random()).slice(0, remainingCount)
        );

        return selectedQuestions.sort(() => 0.5 - Math.random());
    };

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswers({
            ...answers,
            [questions[currentQuestionIndex].id]: event.target.value
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        const correctAnswers = questions.filter(
            question => answers[question.id] === question.correct_answer
        ).length;
        setResult((correctAnswers / questions.length) * 100);
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3000/users', {
                user: { name, score: result }
            });
            setSubmitted(true);
            // Redirect to results page after submitting
            navigate('/results', { state: { questions, answers, result } });
        } catch (error) {
            console.error('Failed to submit score:', error);
        }
    };


    console.log(questions)

    const renderQuestionInput = (question: Question) => {
        switch (question.question_type) {
            case 'multiple':
                return (
                    <div className="space-y-2">
                        {[question.correct_answer, ...question.incorrect_answers].sort().map((answer, index) => (
                            <label key={index} className="block">
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={answer}
                                    className="mr-2"
                                    onChange={handleAnswerChange}
                                    checked={answers[question.id] === answer}
                                />
                                {he.decode(answer)}
                            </label>
                        ))}
                    </div>
                );
            case 'boolean':
                return (
                    <div className="space-y-2">
                        {['True', 'False'].map((answer, index) => (
                            <label key={index} className="block">
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={answer}
                                    className="mr-2"
                                    onChange={handleAnswerChange}
                                    checked={answers[question.id] === answer}
                                />
                                {he.decode(answer)}
                            </label>
                        ))}
                    </div>
                );
            case 'text':
                return (
                    <input
                        type="text"
                        name={`question-${question.id}`}
                        className="w-full border rounded p-2"
                        onChange={handleAnswerChange}
                        value={answers[question.id] || ''}
                    />
                );
            default:
                return null;
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (result !== null) {
        if (submitted) {
            return (
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Thank you for participating!</h1>
                    <p>Your score has been submitted.</p>
                </div>
            );
        }

        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 text-red-400">Name Your Entry & Submit to See Reults</h1>
                {/* <p>Your score: {result}%</p> */}
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                    />
                    <button
                        type="button"
                        className="p-2 bg-red-400 text-white font-semibold rounded"
                        onClick={handleSubmit}
                    >
                        Submit Score
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='quiz-container'>
        <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-auto p-4 bg-white rounded-lg shadow-lg"
            >
            <h1 className="text-2xl font-bold mb-4 text-red-400">Question {currentQuestionIndex + 1}</h1>
            <form>
                <div className="mb-6">
                    <h2 className="text-xl mb-2">{he.decode(questions[currentQuestionIndex].question)}</h2>
                    {renderQuestionInput(questions[currentQuestionIndex])}
                </div>
                <button
                    type="button"
                    className="mt-2 py-1 px-2 bg-red-400 text-white font-semibold rounded 
                    hover:bg-red-300 hover:shadow-xl transition-shadow duration-300"
                    onClick={handleNext}
                    >
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                </button>
            </form>
        </motion.div>
        </div>
    );
};

export default Quiz;
