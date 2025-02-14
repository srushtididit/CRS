const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" }, // New Role Field
    academicRecords: [{ 
        institution: { type: String },
        degree: { type: String },
        major: { type: String }, // Added Major Field
        yearOfGraduation: { type: Number },
        gpa: { type: Number, min: 0, max: 4.0 } // Optional GPA Field
    }],
    skills: [{ type: String }],
    interests: [{ type: String }],
    profileCompleted: { type: Boolean, default: false }, // Tracks if user has filled profile
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check password validity
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
