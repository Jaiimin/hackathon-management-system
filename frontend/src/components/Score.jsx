import React, { useState } from 'react';

const Score = ({ project, onSave, onCancel }) => {
    const [innovation, setInnovation] = useState(5);
    const [technicality, setTechnicality] = useState(5);
    const [presentation, setPresentation] = useState(5);

    const handleSave = () => {
        onSave(project._id, { innovation, technicality, presentation });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Score: {project.name}</h2>
                <div className="mb-4">
                    <label className="block">Innovation: <span className="font-bold">{innovation}</span></label>
                    <input type="range" min="1" max="10" value={innovation} onChange={(e) => setInnovation(Number(e.target.value))} className="w-full" />
                </div>
                <div className="mb-4">
                    <label className="block">Technicality: <span className="font-bold">{technicality}</span></label>
                    <input type="range" min="1" max="10" value={technicality} onChange={(e) => setTechnicality(Number(e.target.value))} className="w-full" />
                </div>
                <div className="mb-4">
                    <label className="block">Presentation: <span className="font-bold">{presentation}</span></label>
                    <input type="range" min="1" max="10" value={presentation} onChange={(e) => setPresentation(Number(e.target.value))} className="w-full" />
                </div>
                <div className="flex justify-end">
                    <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">Cancel</button>
                    <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit Score</button>
                </div>
            </div>
        </div>
    );
};

export default Score;