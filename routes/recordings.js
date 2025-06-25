import express from 'express';
import Recording from '../models/Recording.js'; // Zorg ervoor dat het pad correct is volgens jouw projectstructuur

const router = express.Router();

/**
 * @route GET /recordings/
 * @desc Haal een lijst op van alle opnames, optioneel gefilterd op streamId
 */
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.streamId) {
            filter.streamId = req.query.streamId;
        }
        const recordings = await Recording.find(filter);
        res.status(200).json({ success: true, data: recordings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van opnames', error });
    }
});

/**
 * @route GET /recordings/:recording_id
 * @desc Haal een specifieke opname op
 */
router.get('/:recording_id', async (req, res) => {
    try {
        const recording = await Recording.findOne({ recording_id: req.params.recording_id });
        if (!recording) {
            return res.status(404).json({ success: false, message: 'Opname niet gevonden' });
        }
        res.status(200).json({ success: true, data: recording });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van de opname', error });
    }
});

/**
 * @route POST /recordings/
 * @desc Maak een nieuwe opname aan
 */
router.post('/', async (req, res) => {
    const { recording_id, rental_id, streamId, clip_url, timestamp, duration, note } = req.body;

    try {
        const newRecording = new Recording({
            recording_id,
            rental_id,
            streamId,
            clip_url,
            timestamp,
            duration,
            note,
        });

        await newRecording.save();
        res.status(201).json({ success: true, message: 'Opname succesvol aangemaakt', data: newRecording });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het aanmaken van de opname', error });
    }
});

/**
 * @route DELETE /recordings/:recording_id
 * @desc Verwijder een specifieke opname
 */
router.delete('/:recording_id', async (req, res) => {
    try {
        const deletedRecording = await Recording.findOneAndDelete({ recording_id: req.params.recording_id });

        if (!deletedRecording) {
            return res.status(404).json({ success: false, message: 'Opname niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Opname succesvol verwijderd', data: deletedRecording });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het verwijderen van de opname', error });
    }
});

/**
 * @route PATCH /recordings/:recording_id
 * @desc Werk een specifieke opname bij
 */
router.patch('/:recording_id', async (req, res) => {
    try {
        const updatedRecording = await Recording.findOneAndUpdate(
            { recording_id: req.params.recording_id },
            req.body,
            { new: true }
        );
        if (!updatedRecording) {
            return res.status(404).json({ success: false, message: 'Opname niet gevonden' });
        }
        res.status(200).json({ success: true, message: 'Opname succesvol bijgewerkt', data: updatedRecording });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het bijwerken van de opname', error });
    }
});

export default router;