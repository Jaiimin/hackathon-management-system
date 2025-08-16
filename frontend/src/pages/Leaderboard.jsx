import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const Leaderboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const response = await axiosInstance.get('/api/leaderboard', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Failed to fetch leaderboard');
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, [user]);

    if (loading) {
        return <p className="text-center mt-8 text-xl">Loading Leaderboard...</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Leaderboard</h1>
            <div className="bg-white p-8 shadow-md rounded">
                {projects.length > 0 ? (
                    <ol className="list-decimal list-inside">
                        {projects.map((project, index) => (
                            <li key={project._id} className="p-4 mb-4 border rounded-lg flex justify-between items-center bg-gray-50">
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-gray-500 mr-4">{index + 1}</span>
                                    <div>
                                        <h2 className="text-xl font-bold">{project.name}</h2>
                                        <p className="text-md text-gray-700">by Team: <strong>{project.team?.name || 'Unknown'}</strong></p>
                                    </div>
                                </div>
                                <span className="text-2xl font-bold text-green-600">{project.avgScore.toFixed(2)}</span>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-center text-gray-500">No projects have been scored yet.</p>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;