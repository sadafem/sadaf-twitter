import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 140
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});

// Update the updatedAt timestamp before saving
tweetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet; 