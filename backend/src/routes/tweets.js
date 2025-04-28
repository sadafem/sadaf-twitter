import express from 'express';
import { body, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
import { 
  createTweet, 
  getAllTweets, 
  getTweet, 
  updateTweet, 
  deleteTweet 
} from '../controllers/tweetController.js';

const router = express.Router();

// Validation middleware
const validateTweet = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 140 })
    .withMessage('Tweet must be between 1 and 140 characters')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post('/', auth, validateTweet, validate, createTweet);
router.get('/', getAllTweets);
router.get('/:id', getTweet);
router.patch('/:id', auth, validateTweet, validate, updateTweet);
router.delete('/:id', auth, deleteTweet);

export default router; 