import express from 'express';
import { register } from '../controllers/auth.controller.js';
import { generateToken } from '../utils/generatetoken.js';
import User from '../models/user.model.js';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// ✅ New route to check if user exists using mobile/email
router.post('/check-user', async (req, res) => {
  const { userInput } = req.body;

  try {
    const whereClause = /\S+@\S+\.\S+/.test(userInput)
      ? { email: userInput }
      : { mobile: userInput };

    const user = await User.findOne({ where: whereClause });

    if (!user) {
      return res.status(404).json({ exists: false });
    }

    const token = generateToken(user.id);
    return res.status(200).json({ exists: true, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
