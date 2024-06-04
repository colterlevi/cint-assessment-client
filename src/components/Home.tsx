import { Link } from "react-router-dom";

const Home: React.FC = () => {

    return(
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <Link to="/quiz" className="block p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold">Take the Quiz</h2>
            </Link>
            <Link to="/leaderboard" className="block p-6 bg-white rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold">Leaderboard</h2>
            </Link>
        </div>
    )
}

export default Home