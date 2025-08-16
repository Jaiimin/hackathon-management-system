const Team = require('../models/Team');

const getTeams = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const teams = await Team.find({ user: req.user.id });
    res.json(teams);
  } catch (error) {
    console.error('Error in getTeams:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addTeam = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Please provide a team name' });
    }
    const newTeam = new Team({
      name,
      user: req.user.id,
      members: [req.user.id],
    });
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    console.error('**ERROR CREATING TEAM**:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A team with this name already exists.' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- NEW FUNCTION: Update a team ---
const updateTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    // Ensure the logged-in user is the one who created the team
    if (team.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTeam);
  } catch (error) {
    console.error('**ERROR UPDATING TEAM**:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- NEW FUNCTION: Delete a team ---
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    if (team.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await team.deleteOne();
    res.json({ id: req.params.id }); // Send back the ID of the deleted team
  } catch (error) {
    console.error('**ERROR DELETING TEAM**:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  getTeams,
  addTeam,
  updateTeam, // Export the new functions
  deleteTeam,
};