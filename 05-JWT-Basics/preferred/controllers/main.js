const jwt = require('jsonwebtoken');
const { BadRequest, Unauthenticated } = require('../errors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !password || !email) {
            throw new BadRequest('All fields (name, email, password) are required', 400);
        }

        const existingUser = await User.findOne({email});

        if (existingUser) {
            throw new BadRequest('Email is already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({name, email, password: hashedPassword});

        res.status(201).json({msg: 'Account successfully created!', newUser});
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessage = Object.values(error.errors)[0].message;
            throw new BadRequest(errorMessage);
        }
        throw error;
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequest('Please provide valid email and password to log in');
    }

    const user = await User.findOne({ email });

    if (!user) {
        // Email doesn't exist
        throw new Unauthenticated('Invalid email or password. Please try again.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        // Password doesn't match
        throw new Unauthenticated('Invalid email or password. Please try again.');
    }

    const id = user._id;
    const token = jwt.sign({ email, id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });

    res.status(200).json({ msg: 'Login successful', token });
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.name}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
};

module.exports = {
    login,
    dashboard,
    signup,
};