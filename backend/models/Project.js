const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team',
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Please add a project name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a project description'],
  },
  githubLink: {
    type: String,
    required: [true, 'Please add a GitHub link'],
  },
  scores: [{
    judge: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    innovation: { type: Number, min: 1, max: 10 },
    technicality: { type: Number, min: 1, max: 10 },
    presentation: { type: Number, min: 1, max: 10 },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);