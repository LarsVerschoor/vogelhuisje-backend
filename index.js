import { config as configEnv } from 'dotenv';
configEnv();

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import shopitems from './routes/shopitems.js';

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use('/shopitems', shopitems);

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

let users = [];
let currentUserId = 1;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token ontbreekt' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token ongeldig' });
        req.user = user;
        next();
    });
}

app.post('/auth/register', (req, res) => {
    const { email, password, name } = req.body;

    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'E-mail is al in gebruik' });
    }

    const newUser = {
        user_id: currentUserId++,
        email,
        password,
        name,
        created_at: new Date()
    };

    users.push(newUser);
    res.status(201).json({ message: 'Gebruiker geregistreerd', user: newUser });
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) return res.status(400).json({ error: 'Gebruiker bestaat niet' });
    if (user.password !== password) return res.status(400).json({ error: 'Wachtwoord klopt niet' });

    const payload = { user_id: user.user_id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Ingelogd', token, user_id: user.user_id });
});

app.get('/users', authenticateToken, (req, res) => {
    res.json({ success: true, data: users });
});

app.get('/users/:user_id', authenticateToken, (req, res) => {
    const user = users.find(u => u.user_id === parseInt(req.params.user_id));
    if (!user) return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    res.json({ success: true, data: user });
});

const server = http.createServer(app);
server.listen(process.env.PORT || 80, () => {
    console.log(`✅ Server draait op http://145.24.223.199:${process.env.PORT || 80}`);
});
