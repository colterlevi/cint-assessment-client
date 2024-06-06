import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleStartQuiz = (difficulty: string) => {
        navigate(`/quiz?difficulty=${difficulty}`);
    };

    return(
        <motion.div 
            className="flex text-center p-4 bg-white rounded-lg shadow-lg w-4/5 h-96 items-center justify-center"
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            >
            <div className="flex flex-col justify-center items-center text-center p-4 bg-gray-100 rounded-lg shadow-lg w-3/5 h-3/5">
            <h1 className="text-2xl font-bold mb-4 text-gray-600">What Quiz Experience Do You Want?</h1>
            <div className="flex justify-center mb-4">
                <button
                    className="mx-2 p-2 bg-green-400 text-white font-semibold rounded"
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
                    className="mx-2 p-2 bg-red-400 text-white font-semibold rounded"
                    onClick={() => handleStartQuiz('hard')}
                >
                    Hard
                </button>
                {/* <button
                    className="mx-2 p-2 bg-blue-400 text-white font-semibold rounded"
                    onClick={() => navigate('quiz')}
                >
                    Any Difficulty
                </button> */}
            </div>
            </div>
        </motion.div>
    )
}

export default Home