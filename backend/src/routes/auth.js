import express from 'express';
import { body, validationResult } from 'express-validator';
import { signup, login, logout } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateSignup = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('username').trim().isLength({ min: 3 })
];

const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
];

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post('/signup', validateSignup, validate, signup);
router.post('/login', validateLogin, validate, login);
router.post('/logout', auth, logout);

export default router;