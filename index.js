import { config as configEnv } from 'dotenv';
configEnv();

import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
<<<<<<< HEAD
import cors from 'cors';

import router from './routes/index.js';
=======
import cors from 'cors'

await mongoose.connect(process.env.MONGODB_URI);

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

app.use(express.json());

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

>>>>>>> 489eae762a5a11fdda5a645f572992aab7e75b5d
import User from './models/User.js';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/', router);

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

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const server = http.createServer(app);
        server.listen(process.env.PORT || 80, () => {
            console.log(`✅ Server running on port ${process.env.PORT || 80}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
    }
}

startServer();
