import { useLocation, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate()
    const location = useLocation();
    const { questions, answers, result } = location.state || { questions: [], answers: {}, result: Number };

    const renderAnswer = (question: Question) => {
        const selectedAnswer = answers[question.id];
        const correctAnswer = question.correct_answer;

        if (!selectedAnswer) {
            return (
            <>
                <span className="text-red-400">No answer selected</span>
                <> (Correct Answer: <span className="text-green-400">{he.decode(correctAnswer)}</span>)</>
            </>
            )
        }

        const isCorrect =
            question.question_type === 'text'
                ? selectedAnswer.toLowerCase() === correctAnswer.toLowerCase()
                : selectedAnswer === correctAnswer;

        return (
            <>
                <span className={isCorrect ? "text-green-400" : "text-red-400"}>
                    {he.decode(selectedAnswer)}
                </span>
                {!isCorrect && (
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
            className="container mx-auto mt-2 mb-10 p-4 bg-white rounded-lg shadow-md w-4/5 h-full overflow-auto"
            >
            <h1 className="text-3xl font-bold mb-4 text-red-400">Quiz Results</h1>
            <p className='text-2xl font-semibold mb-4 text-gray-600'>Score: {result}%</p>
            {questions.map((question: Question, index: number) => (
                <div key={question.id} className="mb-4">
                    <h2 className='text-xl font-bold text-red-400'>Question {index + 1}</h2>
                    <h2 className="text-lg mb-2 text-gray-600">{he.decode(question.question)}</h2>
                    <p className='text-gray-600'>{renderAnswer(question)}</p>
                    <hr />
                </div>
            ))}
            <button 
                type="button"
                className="mt-2 py-1 px-2 bg-red-400 text-white font-semibold rounded 
                    hover:bg-red-300 hover:shadow-xl transition-shadow duration-300"
                onClick={()=> navigate('/')}>Try Again?</button>
        </motion.div>
    );
};

export default Results;
