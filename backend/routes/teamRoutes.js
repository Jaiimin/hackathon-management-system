const express = require('express');
const router = express.Router();
const { getTeams, addTeam, updateTeam, deleteTeam } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');

// Requests to /api/teams/
router.route('/').get(protect, getTeams).post(protect, addTeam);

// Requests to /api/teams/:id
router.route('/:id').put(protect, updateTeam).delete(protect, deleteTeam);

module.exports = router;