import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleStartQuiz = (difficulty: string) => {
        navigate(`/quiz?difficulty=${difficulty}`);
    };

    return(
        <motion.div 
            className="text-center p-4"
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            >
            <h1 className="text-2xl font-bold mb-4">Choose Difficulty</h1>
            <div className="flex justify-center mb-4">
                <button
                    className="mx-2 p-2 bg-red-400 text-white font-semibold rounded"
                    onClick={() => handleStartQuiz('easy')}
                >
                    Easy
                </button>
                <button
                    className="mx-2 p-2 bg-yellow-400 text-white font-semibold rounded"
                    onClick={() => handleStartQuiz('medium')}
                >
                    Medium
                </button>
                <button
                    className="mx-2 p-2 bg-green-400 text-white font-semibold rounded"
                    onClick={() => handleStartQuiz('hard')}
                >
                    Hard
                </button>
                {/* <button
                    className="mx-2 p-2 bg-blue-400 text-white font-semibold rounded"
                    onClick={() => handleStartQuiz('any')}
                >
                    Any Difficulty
                </button> */}
            </div>
        </motion.div>
    )
}

export default Home