import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const Results: React.FC = () => {
    const location = useLocation();
    const { questions, answers, result } = location.state || { questions: [], answers: {}, result: Number };

    const renderAnswer = (question: Question) => {
        const selectedAnswer = answers[question.id];
        const correctAnswer = question.correct_answer;

        if (!selectedAnswer) {
            return <span className="text-red-400">No answer selected</span>;
        }

        return (
            <>
                <span className={selectedAnswer === correctAnswer ? "text-green-400" : "text-red-400"}>
                    {he.decode(selectedAnswer)}
                </span>
                {selectedAnswer !== correctAnswer && (
                    <> (Correct Answer: <span className="text-green-400">{he.decode(correctAnswer)}</span>)</>
                )}
            </>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto my-2 p-4 bg-white rounded-lg shadow-md"
            >
            <h1 className="text-3xl font-bold mb-4 text-red-400">Quiz Results</h1>
            <p className='text-2xl font-semibold mb-4'>Score: {result}%</p>
            {questions.map((question: Question, index: number) => (
                <div key={question.id} className="mb-4">
                    <h2 className='text-xl font-bold text-red-400'>Question {index + 1}</h2>
                    <h2 className="text-lg mb-2">{he.decode(question.question)}</h2>
                    <p>{renderAnswer(question)}</p>
                    <hr />
                </div>
            ))}
        </motion.div>
    );
};

export default Results;
