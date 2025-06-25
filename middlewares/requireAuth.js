import jwt from "jsonwebtoken"
import User from "../models/User.js";

const requireAuth = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.status(401).json({ error: 'Authorization header is missing' });

    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid Authorization header format' });

    const jsonWebToken = tokenParts[1];

    try {
        const { userId } = jwt.verify(jsonWebToken, process.env.JWT_SECRET);
        req.user = await User.findById(userId).select('_id name email created_at');
        if (!req.user) return res.status(401).json({ error: 'User not found' });
        next();
    } catch (error) {
        if (error.message === 'invalid token') {
            return res.status(400).json({error: 'Invalid Token'});
        } else if (error.message === 'invalid signature') {
            return res.status(400).json({error: 'Invalid Token'});
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({error: 'Token expired'});
        }
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default requireAuth;