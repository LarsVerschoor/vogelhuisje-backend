import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'E-mail is al in gebruik' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();


        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Gebruiker geregistreerd',
            token,
            user_id: newUser._id
        });
    } catch (error) {
        console.error('Registratie fout:', error);
        res.status(500).json({ error: 'Serverfout bij registratie' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Gebruiker bestaat niet' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Wachtwoord klopt niet' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Ingelogd',
            token,
            user_id: user._id
        });
    } catch (error) {
        console.error('Login fout:', error);
        res.status(500).json({ error: 'Serverfout bij inloggen' });
    }
});

export default router;