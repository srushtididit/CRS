// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

MONGO_URI = "mongodb+srv://srushtigg1706:R2XWQOMkHGarhQ4j@cluster0.g9ce4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;