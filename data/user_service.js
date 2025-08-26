import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const registerUser = async (username, password) => {
  const existingUsers = await User.countDocuments();
  const role = existingUsers === 0 ? 'admin' : 'user'; // first user is admin

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  return user;
};

export const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { user, token };
};

export const promoteUser = async (username) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');
  user.role = 'admin';
  await user.save();
  return user;
};
