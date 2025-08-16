const express = require('express');
const router = express.Router();
const path = require('path'); 
const Project = require(path.resolve(__dirname, '../models/Project.js'));
const { protect } = require('../middleware/authMiddleware');
router.get('/', protect, async (req, res) => {
    try {
        const projects = await Project.find({}).populate('team', 'name');

        const rankedProjects = projects.map(project => {
            let avgScore = 0;
            if (project.scores && project.scores.length > 0) {
                const totalScore = project.scores.reduce((acc, score) =>
                    acc + (score.innovation || 0) + (score.technicality || 0) + (score.presentation || 0), 0);
                const numScores = project.scores.length * 3;
                avgScore = numScores > 0 ? totalScore / numScores : 0;
            }
            return { ...project.toObject(), avgScore };
        });

        rankedProjects.sort((a, b) => b.avgScore - a.avgScore);

        res.json(rankedProjects);
    } catch (error)
    {
        console.error('**ERROR FETCHING LEADERBOARD**:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;