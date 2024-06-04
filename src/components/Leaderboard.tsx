import React from 'react';

type User = {
    id: number;
    name: string;
    score: number;
};

type LeaderboardProps = {
    users: User[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
    console.log(users)
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-100">Name</th>
                        <th className="py-2 px-4 bg-gray-100">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border-t py-2 px-4">{user.name}</td>
                            <td className="border-t py-2 px-4">{user.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
