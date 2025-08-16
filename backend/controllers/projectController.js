const Project = require('../models/Project');
const Team = require('../models/Team');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate('team', 'name').populate('scores.judge', 'name');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addProject = async (req, res) => {
  try {
    if (!req.user) { return res.status(401).json({ message: 'User not authenticated' }); }
    const { teamId, name, description, githubLink } = req.body;
    if (!teamId || !name || !description || !githubLink) { return res.status(400).json({ message: 'Please fill out all fields' }); }
    const team = await Team.findById(teamId);
    if (!team || team.user.toString() !== req.user.id) { return res.status(401).json({ message: 'Not authorized for this team' }); }
    const existingProject = await Project.findOne({ team: teamId });
    if (existingProject) { return res.status(400).json({ message: 'This team has already submitted a project' }); }
    const newProject = new Project({ name, description, githubLink, team: teamId, user: req.user.id });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addScore = async (req, res) => {
  try {
    if (!req.user) { return res.status(401).json({ message: 'User not authenticated' }); }
    const { innovation, technicality, presentation } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) { return res.status(404).json({ message: 'Project not found' }); }
    const alreadyScored = project.scores.find(score => score.judge.toString() === req.user.id);
    if (alreadyScored) { return res.status(400).json({ message: 'You have already scored this project' }); }
    project.scores.push({ innovation, technicality, presentation, judge: req.user.id });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProjects,
  addProject,
  addScore,
};