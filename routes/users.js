import express from 'express';
import User from '../models/User.js'; // Zorg ervoor dat het pad klopt volgens jouw projectstructuur

const router = express.Router();

/**
 * @route GET /users/
 * @desc Haal een lijst op van alle gebruikers
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van gebruikers', error });
    }
});

/**
 * @route GET /users/:user_id
 * @desc Haal gegevens van een specifieke gebruiker op
 */
router.get('/:user_id', async (req, res) => {
    try {
        const user = await User.findOne({ user_id: req.params.user_id });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Gebruiker niet gevonden' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van de gebruiker', error });
    }
});

/**
 * @route POST /users/
 * @desc Maak een nieuwe gebruiker aan
 */
router.post('/', async (req, res) => {
    const { user_id, name, email, password, role } = req.body;

    try {
        const newUser = new User({
            user_id,
            name,
            email,
            password,
            role
        });

        await newUser.save();
        res.status(201).json({ success: true, message: 'Gebruiker succesvol aangemaakt', data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het aanmaken van de gebruiker', error });
    }
});

/**
 * @route PUT /users/:user_id
 * @desc Update gegevens van een bestaande gebruiker
 */
router.put('/:user_id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { user_id: req.params.user_id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'Gebruiker niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Gebruiker succesvol geüpdatet', data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het updaten van de gebruiker', error });
    }
});

/**
 * @route DELETE /users/:user_id
 * @desc Verwijder een specifieke gebruiker
 */
router.delete('/:user_id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ user_id: req.params.user_id });

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'Gebruiker niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Gebruiker succesvol verwijderd', data: deletedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het verwijderen van de gebruiker', error });
    }
});

export default router;