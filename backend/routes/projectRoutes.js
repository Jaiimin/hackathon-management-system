const express = require('express');
const router = express.Router();
const { getProjects, addProject, addScore } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getProjects).post(protect, addProject);
router.route('/:id/score').post(protect, addScore);

module.exports = router;