const mongoose = require('mongoose');

// Ensure this schema is defined correctly
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a team name'],
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

// This line is crucial. It creates and exports the model.
module.exports = mongoose.model('Team', teamSchema);