import express from 'express';
import Note from '../models/Note.js'; // Zorg ervoor dat het pad klopt voor jouw projectstructuur

const router = express.Router();

/**
 * @route GET /notes/
 * @desc Haal een lijst op van alle notities
 */
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van de notities', error });
    }
});

/**
 * @route GET /notes/:note_id
 * @desc Haal een specifieke notitie op
 */
router.get('/:note_id', async (req, res) => {
    try {
        const note = await Note.findOne({ note_id: req.params.note_id });
        if (!note) {
            return res.status(404).json({ success: false, message: 'Notitie niet gevonden' });
        }
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van de notitie', error });
    }
});

/**
 * @route POST /notes/
 * @desc Maak een nieuwe notitie aan
 */
router.post('/', async (req, res) => {
    const { note_id, rental_id, content } = req.body;

    try {
        const newNote = new Note({
            note_id,
            rental_id,
            content
        });

        await newNote.save();
        res.status(201).json({ success: true, message: 'Notitie succesvol aangemaakt', data: newNote });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het aanmaken van de notitie', error });
    }
});

/**
 * @route PUT /notes/:note_id
 * @desc Update een bestaande notitie
 */
router.put('/:note_id', async (req, res) => {
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { note_id: req.params.note_id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: 'Notitie niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Notitie succesvol geüpdatet', data: updatedNote });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het updaten van de notitie', error });
    }
});

/**
 * @route DELETE /notes/:note_id
 * @desc Verwijder een specifieke notitie
 */
router.delete('/:note_id', async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ note_id: req.params.note_id });

        if (!deletedNote) {
            return res.status(404).json({ success: false, message: 'Notitie niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Notitie succesvol verwijderd', data: deletedNote });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het verwijderen van de notitie', error });
    }
});

export default router;