import express from 'express';
<<<<<<< HEAD
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'E-mail is al in gebruik' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userCount = await User.countDocuments();
        const newUser = new User({
            user_id: userCount + 1,
            email,
            password: hashedPassword,
            name
        });
        await newUser.save();
        res.status(201).json({ message: 'Gebruiker geregistreerd' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Gebruiker bestaat niet' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Wachtwoord klopt niet' });

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: 'JWT_SECRET is not defined in environment variables' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Ingelogd', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
=======

import login from "../controllers/auth/login.js";
import register from "../controllers/auth/register.js";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
>>>>>>> 489eae762a5a11fdda5a645f572992aab7e75b5d

export default router;