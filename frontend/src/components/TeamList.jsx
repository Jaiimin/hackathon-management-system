import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import EditTeamModal from './EditTeam'; 

const TeamList = ({ teams, setTeams, refresh }) => {
  const { user } = useAuth();
  const [editingTeam, setEditingTeam] = useState(null); 

  useEffect(() => {
    const fetchTeams = async () => {
      if (!user) return;
      try {
        const response = await axiosInstance.get('/api/teams', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTeams(response.data);
      } catch (error) {
        console.error('Failed to fetch teams.');
      }
    };
    fetchTeams();
  }, [user, refresh, setTeams]);

  const handleDelete = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await axiosInstance.delete(`/api/teams/${teamId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTeams(teams.filter((team) => team._id !== teamId));
      } catch (error) {
        alert('Failed to delete team.');
      }
    }
  };

  const handleSave = async (teamId, updatedData) => {
      try {
          const response = await axiosInstance.put(`/api/teams/${teamId}`, updatedData, {
              headers: { Authorization: `Bearer ${user.token}` },
          });
          setTeams(teams.map(team => team._id === teamId ? response.data : team));
          setEditingTeam(null);
      } catch (error) {
          alert('Failed to update team. Name might already be taken.');
      }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Your Teams</h2>
      {teams.length > 0 ? (
        teams.map((team) => (
          <div key={team._id} className="bg-gray-100 p-4 mb-4 rounded shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">{team.name}</h3>
              <p className="text-sm text-gray-500">Created on: {new Date(team.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <button
                onClick={() => setEditingTeam(team)}
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(team._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>You have not created any teams yet.</p>
      )}
      {}
      {editingTeam && (
        <EditTeamModal
          team={editingTeam}
          onSave={handleSave}
          onCancel={() => setEditingTeam(null)}
        />
      )}
    </div>
  );
};

export default TeamList;