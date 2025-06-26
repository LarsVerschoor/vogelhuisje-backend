import User from "../../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
    const { name, email, password } = req.body;
	console.log('REGISTEEEEEER');    
    console.log(req.body);

    if (!(name && email && password)) return res.status(400).json({error: 'Invalid Request Body'});

    try {
        const passwordHash = await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT_ROUNDS));
        const newUser = new User({ name, email, password_hash: passwordHash });
        console.log(await newUser.save());
        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            created_at: newUser.created_at
        });
    } catch (error) {
        if (error.code === 11000) {
		console.error(error)
            res.status(409).json({error: "You already have an account"});
            return;
        }
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export default register;
