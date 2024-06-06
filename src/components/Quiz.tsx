import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import he from 'he';

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
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const fetchQuestions = async (difficulty: string) => {
            try {
                let questionsData = [];
                if (difficulty === 'any') {
                    const easyQuestions = await axios.get<Question[]>('https://colters-quiz-api-6118b7b1799e.herokuapp.com/questions', {
                        params: { difficulty: 'easy' },
                    });
                    const mediumQuestions = await axios.get<Question[]>('https://colters-quiz-api-6118b7b1799e.herokuapp.com/questions', {
                        params: { difficulty: 'medium' },
                    });
                    const hardQuestions = await axios.get<Question[]>('https://colters-quiz-api-6118b7b1799e.herokuapp.com/questions', {
                        params: { difficulty: 'hard' },
                    });
                    questionsData = [...easyQuestions.data, ...mediumQuestions.data, ...hardQuestions.data];
                } else {
                    const response = await axios.get<Question[]>('https://colters-quiz-api-6118b7b1799e.herokuapp.com/questions', {
                        params: { difficulty },
                    });
                    questionsData = response.data;
                }

                const previouslyAskedQuestionIds = getPreviouslyAskedQuestionIds();
                const filteredQuestions = questionsData.filter(
                    question => !previouslyAskedQuestionIds.includes(question.id)
                );
                const shuffledQuestions = getRandomQuestions(filteredQuestions, 10); // Adjust count as needed
                setQuestions(shuffledQuestions);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch questions');
                setLoading(false);
            }
        };

        const difficultyParam = new URLSearchParams(location.search).get('difficulty');
        fetchQuestions(difficultyParam || 'any');
        setDifficulty(difficultyParam || 'any');
    }, [location.search]);

    const getRandomQuestions = (questions: Question[], count: number): Question[] => {
        const questionMap: { [key: number]: Question } = {};
        questions.forEach(question => {
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
            question => question.question_type === 'text'
                ? answers[question.id]?.toLowerCase() === question.correct_answer.toLowerCase()
                : answers[question.id] === question.correct_answer
        ).length;
        setResult((correctAnswers / questions.length) * 100);
    };

    const handleSubmit = async () => {
        try {
            await axios.post('https://colters-quiz-api-6118b7b1799e.herokuapp.com/users', {
                user: { name, score: result }
            });
            setSubmitted(true);
            // Redirect to results page after submitting
            navigate('/results', { state: { questions, answers, result, difficulty } });
            saveAskedQuestionIds();
        } catch (error) {
            console.error('Failed to submit score:', error);
        }
    };

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

    const getPreviouslyAskedQuestionIds = (): number[] => {
        const ids = localStorage.getItem('askedQuestionIds');
        return ids ? JSON.parse(ids) : [];
    };

    const saveAskedQuestionIds = () => {
        const askedQuestionIds = getPreviouslyAskedQuestionIds();
        const newAskedQuestionIds = [...askedQuestionIds, ...questions.map(question => question.id)];
        localStorage.setItem('askedQuestionIds', JSON.stringify(newAskedQuestionIds));
    };

    if (loading) {
        return <div className="text-center text-gray-600 font-semibold text-2xl">Loading...</div>;
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
                <h1 className="text-2xl font-bold mb-4 text-red-400">Name Your Entry & Submit to See Results</h1>
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
        <div className='w-5/6'>
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
                    <div className="mb-6 text-gray-600">
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
