import Tweet from '../models/Tweet.js';

export const createTweet = async (req, res) => {
  try {
    const tweet = new Tweet({
      content: req.body.content,
      author: req.user._id
    });

    await tweet.save();
    
    // Populate author details
    await tweet.populate('author', 'username');
    
    res.status(201).json(tweet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tweet' });
  }
};

export const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ updatedAt: -1 })
      .populate('author', 'username');
    
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tweets' });
  }
};

export const getTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
      .populate('author', 'username');
    
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tweet' });
  }
};

export const updateTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Check if the user is the author of the tweet
    if (tweet.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this tweet' });
    }

    tweet.content = req.body.content;
    await tweet.save();
    
    // Populate author details
    await tweet.populate('author', 'username');
    
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tweet' });
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Check if the user is the author of the tweet
    if (tweet.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this tweet' });
    }

    await tweet.deleteOne();
    res.json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tweet' });
  }
}; 