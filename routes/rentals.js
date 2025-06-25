import express from 'express';
import Rental from '../models/Rental.js'; // Zorg ervoor dat het pad correct is volgens jouw projectstructuur

const router = express.Router();

/**
 * @route GET /rentals/
 * @desc Haal een lijst van alle huurcontracten op
 */
router.get('/', async (req, res) => {
    try {
        const rentals = await Rental.find();
        res.status(200).json({ success: true, data: rentals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @route GET /rentals/:rental_id
 * @desc Haal een specifiek huurcontract op
 */
router.get('/:rental_id', async (req, res) => {
    try {
        const rental = await Rental.findOne({ rental_id: req.params.rental_id });
        if (!rental) {
            return res.status(404).json({ success: false, message: 'Huurcontract niet gevonden' });
        }
        res.status(200).json({ success: true, data: rental });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @route POST /rentals/
 * @desc Maak een nieuw huurcontract aan
 */
router.post('/', async (req, res) => {
    const { rental_id, user_id, birdhouse_id, start_date, end_date, is_active } = req.body;

    try {
        const newRental = new Rental({
            rental_id,
            user_id,
            birdhouse_id,
            start_date,
            end_date,
            is_active
        });

        await newRental.save();
        res.status(201).json({ success: true, message: 'Huurcontract succesvol aangemaakt', data: newRental });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @route DELETE /rentals/:rental_id
 * @desc Verwijder een specifiek huurcontract
 */
router.delete('/:rental_id', async (req, res) => {
    try {
        const deletedRental = await Rental.findOneAndDelete({ rental_id: req.params.rental_id });

        if (!deletedRental) {
            return res.status(404).json({ success: false, message: 'Huurcontract niet gevonden' });
        }

        res.status(200).json({ success: true, message: 'Huurcontract succesvol verwijderd', data: deletedRental });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;