import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TeamForm = ({ onTeamCreated }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!name) {
      setError('Please enter a team name.');
      return;
    }

    if (!user || !user.token) {
      setError('You must be logged in to create a team.');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting to create team with name:', name);
      console.log('Using auth token:', user.token);

      const response = await axiosInstance.post(
        '/api/teams', // The API endpoint
        { name },     // The data being sent
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // The authentication header
          },
        }
      );

      console.log('Team created successfully:', response.data);
      onTeamCreated(response.data); // Update the parent component's state
      setName(''); // Clear the form input

    } catch (err) {
      // This block will run if the server returns an error
      console.error('**An error occurred while creating the team**');
      console.error('Error object:', err);
      if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server responded with:', err.response.data);
          setError(err.response.data.message || 'An error occurred on the server.');
      } else if (err.request) {
          // The request was made but no response was received
          console.error('No response received from server:', err.request);
          setError('Could not connect to the server. Is it running?');
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', err.message);
          setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create a New Team</h2>
      {error && <p className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Create Team'}
        </button>
      </form>
    </div>
  );
};

export default TeamForm;