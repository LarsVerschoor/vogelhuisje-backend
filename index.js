import { config as configEnv } from 'dotenv';
configEnv();

import express from 'express';
import http from 'http';
import mongoose from "mongoose";

await mongoose.connect(`mongodb://127.0.0.1/${process.env.DB_NAME}`);

const app = express();
const server = http.createServer(app);

import router from './routes/index.js';
app.use('/', router);

server.listen(process.env.PORT);