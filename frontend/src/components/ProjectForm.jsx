import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const ProjectForm = ({ teams, onProjectSubmitted }) => {
  const { user } = useAuth();
  const [selectedTeam, setSelectedTeam] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTeam || !name || !description || !githubLink) {
      setError('Please fill out all fields and select a team.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/api/projects', {
        teamId: selectedTeam,
        name,
        description,
        githubLink,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      onProjectSubmitted(response.data);
      // Reset form
      setSelectedTeam('');
      setName('');
      setDescription('');
      setGithubLink('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Submit Your Project</h2>
      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Select Your Team</option>
          {teams.map(team => (
            <option key={team._id} value={team._id}>{team.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          rows="4"
        ></textarea>
        <input
          type="url"
          placeholder="GitHub Link (https://...)"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Submit Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;