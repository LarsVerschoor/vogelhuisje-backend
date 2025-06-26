import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) return res.status(400).json({error: 'Invalid Request Body'});
		
console.log(email, password);
    try {
        const user = await User.findOne({ email }).select('_id email password_hash');
	console.log(user)
        if (!user) {
            return res.status(401).json({error: 'This email is not linked to an account'});
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({error: 'Incorrect password'});

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default login;
