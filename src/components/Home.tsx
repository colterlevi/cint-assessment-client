import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home: React.FC = () => {

    return(
        <motion.div 
            className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            >
            <Link to="/quiz" className="block p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold">Take the Quiz</h2>
            </Link>
            <Link to="/leaderboard" className="block p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold">Leaderboard</h2>
            </Link>
        </motion.div>
    )
}

export default Home