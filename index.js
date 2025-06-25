import { config as configEnv } from 'dotenv';
configEnv();

import express from 'express';
import http from 'http';
import cors from 'cors';
import router from './routes/index.js';
import mongoose from 'mongoose';

await mongoose.connect(process.env.MONGODB_URI);

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use('/', router);

server.listen(process.env.PORT || 80, () => {
    console.log(`Server draait op http://145.24.223.199:${process.env.PORT || 80}`);
});
