
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '30days',
  });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password} = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Name, Email, and Password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user);
    res.status(201).send({ id: user._id, name, email, token });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.code === 11000) {
      return res.status(400).send('Email already in use');
    }
    res.status(500).send('Server error: ' + error.message);
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //console.log(!password)

  if (!email || !password) {
    return res.status(400).send('Email and Password are required');
  }

  try {
    const user = await User.findOne({ email });
    
    // if (!user) return res.status(400).send('Invalid Email or Password');
    // const isMatch = await bcrypt.compare(password, user.password);
    // //console.log(!isMatch)
    // if (!isMatch) return res.status(400).send('Invalid Email or Password');

    const token = generateToken(user);
    res.send({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error: ' + error.message);
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
