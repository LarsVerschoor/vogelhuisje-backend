import express from 'express';
import Note from '../models/Note.js'; // Zorg ervoor dat het pad klopt voor jouw projectstructuur

const router = express.Router();


/**
 * @route GET /notes/
 * @desc Haal een lijst op van alle notities
 */
router.get('/', async (req, res) => {
    try {
        const birdhouseId = req.birdhouseId; // Verkrijg birdhouseId vanuit de middleware
        console.log('BirdhouseId binnen GET /notes:', birdhouseId);

        // Haal alleen notities op van dit birdhouseId
        const notes = await Note.find({ birdhouse: birdhouseId });
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

/**
 * @route GET /notes/:note_id
 * @desc Haal een specifieke notitie op
 */
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        console.log('get /:id')

        res.status(200).json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/birdhouse/:birdhouseId/notes', async (req, res) => {
    try {
        const notes = await Note.find({ birdhouse: req.params.birdhouseId }).sort({ createdAt: -1 });
        console.log('get /birdhouse/:birdhouseId/notes')
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Could not fetch notes' });
    }
});

/**
 * @route POST /notes/
 * @desc Maak een nieuwe notitie aan
 */
router.post('/', async (req, res) => {
    const { content } = req.body;
    const birdhouseId = req.birdhouseId;

    try {
        const note = new Note({
            birdhouse: birdhouseId,
            content,
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;