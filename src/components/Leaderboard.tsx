import { motion } from 'framer-motion';
import { useLoaderData } from 'react-router-dom';

type User = {
    id: number;
    name: string;
    score: number;
};

type LoaderData = {
    users: User[];
};

type LeaderboardProps = {
    users: User[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
    // Explicitly define the type of loader data and use type assertion
    const loaderData = useLoaderData() as LoaderData;

    // Check if loader data exists and has the users property
    const displayUsers = loaderData && 'users' in loaderData ? loaderData.users : users;

    // Sort the users by score
    const sortedUsers = displayUsers.slice().sort((a, b) => b.score - a.score);

    return (
        <motion.div 
            className="p-4 bg-white rounded-lg shadow-md w-3/5 overflow-auto max-h-5/6"
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            >
            <h1 className="p-4 text-2xl font-bold mb-4 text-center bg-red-400 text-gray-100 rounded-lg">Leaderboard</h1>
            <table className="min-w-full bg-white text-gray-600">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-100 text-left">Name</th>
                        <th className="py-2 px-4 bg-gray-100 text-left">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user) => (
                        <tr key={user.id}>
                            <td className="border-t py-2 px-4">{user.name}</td>
                            <td className="border-t py-2 px-4">{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};

export default Leaderboard;
