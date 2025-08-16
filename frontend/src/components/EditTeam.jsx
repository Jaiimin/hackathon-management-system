import React, { useState } from 'react';

const EditTeam = ({ team, onSave, onCancel }) => {
  const [name, setName] = useState(team.name);

  const handleSave = () => {
    onSave(team._id, { name });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Edit Team</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeam;