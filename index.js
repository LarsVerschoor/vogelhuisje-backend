import { config as configEnv } from 'dotenv';
configEnv();

import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors'

// Connect to MongoDB using the URI from .env
await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

import router from './routes/index.js';
app.use('/', router);

import usersRouter from './routes/users.js';
app.use('/users', usersRouter);

import shopsRouter from './routes/shopitems.js';
app.use('/shopitems', shopsRouter);

import notesRouter from './routes/notes.js';
app.use('/notes', notesRouter);

import rentalsRouter from './routes/rentals.js';
app.use('/rentals', rentalsRouter);

import camerasRouter from './routes/cameras.js';
app.use('/cameras', camerasRouter);

import recordingsRouter from './routes/recordings.js';
app.use('/recordings', recordingsRouter);

import birdhouseRouter from './routes/birdhouses.js';
app.use('/birdhouses', birdhouseRouter);

import User from './models/User.js';

app.get('/test-create-user', async (req, res) => {
    try {
        const user = new User({ email: `test${Date.now()}@mail.com`, password: 'password123' });
        await user.save();
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/test-get-users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});