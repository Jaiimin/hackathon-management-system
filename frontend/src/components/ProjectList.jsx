import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import ScoreModal from './Score'; // Correctly imports ScoreModal

const ProjectList = ({ projects, setProjects, refresh }) => {
    const { user } = useAuth();
    const [scoringProject, setScoringProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user) return;
            try {
                const response = await axiosInstance.get('/api/projects', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Failed to fetch projects');
            }
        };
        fetchProjects();
    }, [user, refresh, setProjects]);

    const handleSaveScore = async (projectId, scoreData) => {
        try {
            const response = await axiosInstance.post(`/api/projects/${projectId}/score`, scoreData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setProjects(projects.map(p => p._id === projectId ? response.data : p));
            setScoringProject(null);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to submit score.');
        }
    };

    const calculateAverage = (scores) => {
        if (!scores || scores.length === 0) return 'Not Scored';
        const total = scores.reduce((acc, score) => acc + (score.innovation || 0) + (score.technicality || 0) + (score.presentation || 0), 0);
        const avg = total / (scores.length * 3);
        return avg.toFixed(2);
    };

    return (
        <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Submitted Projects</h2>
            {projects.length > 0 ? (
                projects.map(project => (
                    <div key={project._id} className="bg-gray-100 p-4 mb-4 rounded shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-xl">{project.name}</h3>
                                <p className="text-sm text-gray-600">by Team: <strong>{project.team?.name || 'Unknown'}</strong></p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">Avg Score: {calculateAverage(project.scores)}</p>
                                <button
                                    onClick={() => setScoringProject(project)}
                                    className="bg-blue-500 text-white text-sm px-3 py-1 mt-1 rounded hover:bg-blue-600"
                                >
                                    Score Project
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No projects have been submitted yet.</p>
            )}
            {/* This line now correctly uses ScoreModal */}
            {scoringProject && (
                <ScoreModal
                    project={scoringProject}
                    onSave={handleSaveScore}
                    onCancel={() => setScoringProject(null)}
                />
            )}
        </div>
    );
};

export default ProjectList;