const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// ✅ Register User Function (With Validation & Response Fix)
const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        // Check if username or email already exists
        const existUser = await UserModel.findOne({ $or: [{ name }, { email }] });
        if (existUser) {
            return res.status(400).json({ message: "Username or Email already taken" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new UserModel({ name, password: hashedPassword, email });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            message: "User Registered Successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ Login User Function (More Secure)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ Get User Profile Function (No Changes Needed)
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await UserModel.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ✅ Update User Profile Function (Secure Update)
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const updateFields = {};
        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.academicRecords) updateFields.academicRecords = req.body.academicRecords;
        if (req.body.skills) updateFields.skills = req.body.skills;
        if (req.body.interests) updateFields.interests = req.body.interests;

        const user = await UserModel.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
