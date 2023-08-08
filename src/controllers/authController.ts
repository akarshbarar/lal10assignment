// src/controllers/authController.ts
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../database/models';

interface RegisterRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}
const registerUser = async (req: RegisterRequest, res: Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({
      where: { email: email, username: username },
    });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record in the database
    await User.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error in registerUser:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const loginUser = async (req: LoginRequest, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JSON Web Token (JWT) for the user
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    return res.status(200).json({ token: token });
  } catch (err) {
    console.error('Error in loginUser:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export { registerUser, loginUser };
