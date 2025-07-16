// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generatetoken.js'

import User from '../models/user.model.js';

export const register = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ where: { mobile } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, mobile, password: hashed });

    const token = generateToken(newUser.id);
    res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
