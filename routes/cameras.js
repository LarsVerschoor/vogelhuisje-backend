import express from 'express';
import Camera from '../models/Camera.js'; // Zorg ervoor dat het pad naar je Camera-model klopt

const router = express.Router();

/**
 * @route GET /cameras/
 * @desc Haal een lijst op van alle camera's
 */
router.get('/', async (req, res) => {
    try {
        const cameras = await Camera.find();
        res.status(200).json({ success: true, data: cameras });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van camera\'s', error });
    }
});

/**
 * @route GET /cameras/:camera_id
 * @desc Haal gegevens op van een specifieke camera
 */
router.get('/:camera_id', async (req, res) => {
    try {
        const camera = await Camera.findOne({ camera_id: req.params.camera_id });
        if (!camera) {
            return res.status(404).json({ success: false, message: 'Camera niet gevonden' });
        }
        res.status(200).json({ success: true, data: camera });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het ophalen van de camera', error });
    }
});

/**
 * @route POST /cameras/
 * @desc Maak een nieuwe camera aan
 */
router.post('/', async (req, res) => {
    const { camera_id, brand, model, resolution, location, is_active } = req.body;

    try {
        const newCamera = new Camera({
            camera_id,
            brand,
            model,
            resolution,
            location,
            is_active,
        });

        await newCamera.save();
        res.status(201).json({ success: true, message: 'Camera succesvol aangemaakt', data: newCamera });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het aanmaken van de camera', error });
    }
});

/**
 * @route PUT /cameras/:camera_id
 * @desc Update gegevens van een bestaande camera
 */
router.put('/:camera_id', async (req, res) => {
    try {
        const updatedCamera = await Camera.findOneAndUpdate(
            { camera_id: req.params.camera_id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCamera) {
            return res.status(404).json({ success: false, message: 'Camera niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Camera succesvol geüpdatet', data: updatedCamera });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het updaten van de camera', error });
    }
});

/**
 * @route DELETE /cameras/:camera_id
 * @desc Verwijder een specifieke camera
 */
router.delete('/:camera_id', async (req, res) => {
    try {
        const deletedCamera = await Camera.findOneAndDelete({ camera_id: req.params.camera_id });

        if (!deletedCamera) {
            return res.status(404).json({ success: false, message: 'Camera niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Camera succesvol verwijderd', data: deletedCamera });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fout bij het verwijderen van de camera', error });
    }
});

export default router;