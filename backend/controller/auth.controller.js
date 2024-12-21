import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import {sendVerificationEmail} from "../mailtrap/emails.js"
import {generateTokenAndSandCode} from "../util/generateTokenAndSandCode.js"

export const singup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error({ message: 'All fields are required' });
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new Error({ message: 'Email already in use' });
    }

    const hashpassword = await bcryptjs.hash(password, 10);
    const verificationcode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      email,
      password: hashpassword,
      name,
      verificationcode,
      verificationTokenExpiresAt: Date.now() + 3600000 * 24, // 24 hours
    });

    await user.save();

    // jwt authentication
    generateTokenAndSandCode(res, user._id);

    // Send verification email
    await sendVerificationEmail(user.email,verificationcode);

    res.status(201).json({
      success: true,
      message:
        'User registered successfully. Check your email for verification.',
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};


export const verifyEmail = async (req, res) => {
  const { code } = req.body
  try {
    const user = await User.findOne({ 
      
     })
  } catch (error) {
    
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token and respond
    generateTokenAndSandCode(res, user._id);

    
    res.status(200).json({
      success: true,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    res.clearCookie('token'); // Clear the token cookie
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during logout' });
  }
};