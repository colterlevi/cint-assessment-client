import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get<Question[]>('http://localhost:3000/questions');
                const uniqueQuestions = getRandomQuestions(response.data, 10);
                setQuestions(uniqueQuestions);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch questions');
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const getRandomQuestions = (questions: Question[], count: number): Question[] => {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const renderQuestionInput = (question: Question) => {
        switch (question.question_type) {
            case 'multiple':
                return (
                    <div className="space-y-2">
                        {[question.correct_answer, ...question.incorrect_answers].sort().map((answer, index) => (
                            <label key={index} className="block">
                                <input type="radio" name={`question-${question.id}`} value={answer} className="mr-2" />
                                {answer}
                            </label>
                        ))}
                    </div>
                );
            case 'boolean':
                return (
                    <div className="space-y-2">
                        {['True', 'False'].map((answer, index) => (
                            <label key={index} className="block">
                                <input type="radio" name={`question-${question.id}`} value={answer} className="mr-2" />
                                {answer}
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

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quiz</h1>
            <form>
                {questions.map((question) => (
                    <div key={question.id} className="mb-6">
                        <h2 className="text-xl mb-2">{question.question}</h2>
                        {renderQuestionInput(question)}
                    </div>
                ))}
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
        </div>
    );
};

export default Quiz;
