import express from 'express';
import Birdhouse from "../models/Birdhouse.js";
const router = express.Router();
import notesRouter from './notes.js';

router.use('/:birdhouseId/notes', (req, res, next) => {
    req.birdhouseId = req.params.birdhouseId; // Koppel birdhouseId aan req-object
    next();
}, notesRouter);




/************************
 ROUTES VOOR VOGELHUISJE
 ************************/
router.get('/', async (req, res) => {
    try {
        const query = {};

        // If "is_available" is passed in query, add it to the filter
        if (req.query.is_available !== undefined) {
            // Convert string to actual boolean
            query.is_available = req.query.is_available === 'true';
            let birdhouses = await Birdhouse.find({ is_available: true});
            birdhouses.map((birdhouse) => ({
                ...birdhouse.toObject(),
                price: parseFloat(birdhouse.price.toString()),
                oldPrice: birdhouse.oldPrice ? parseFloat(birdhouse.oldPrice.toString()) : undefined
            }));
            res.status(200).json(birdhouses);
        } else {
            const birdhouses = await Birdhouse.find();
            console.log(req.query);
            res.status(200).json(birdhouses);
        }



    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const birdhouse = await Birdhouse.findById(req.params.id);
        if (!birdhouse) {
            return res.status(404).json({ message: 'Birdhouse not found' });
        }
        res.status(200).json(birdhouse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' , err});
    }
});

router.post('/', async (req, res) => {
    try {
        const { birdhouse_id, location_description, is_available, image_url, price, camera_id, owner_id, added_at} = req.body;

        const newBirdhouse = new Birdhouse({
            birdhouse_id,
            location_description,
            is_available,
            image_url,
            price,
            camera_id,
            owner_id,
            added_at
        });

        const savedBirdhouse = await newBirdhouse.save();
        res.status(201).json(savedBirdhouse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Birdhouse.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Birdhouse not found' });
        }
        res.status(200).json({ message: `Birdhouse ${req.params.id} deleted` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// /************************
//  ROUTES VOOR NOTES VAN HET VOGELHUISJE
//  ************************/
// router.get('/:id/notes', (req, res) => {
//     res.status(200).json({notes: `Notities voor vogelhuisje ${req.params.id}`});
// })
//
// router.post('/:id/notes', (req, res) => {
//     res.status(200).json({note: `Notitie voor vogelhuisje ${req.params.id}`});
// })
//
// router.put('/:id/notes', (req, res) => {
//     res.status(200).json({note: `Notitie edit voor vogelhuisje ${req.params.id}`});
// })
//
// router.delete('/:id/notes', (req, res) => {
//     res.status(200).json({recordings: `Verwijderd note voor vogelhuisje ${req.params.id}`});
// })

/************************
 ROUTES VOOR RECORDINGS VAN HET VOGELHUISJE
 ************************/
router.get('/:id/recordings', (req, res) => {
    res.status(200).json({recordings: `Recordings voor vogelhuisje ${req.params.id}`});
});

router.post('/:id/recordings', (req, res) => {
    res.status(200).json({recording: `Recording voor vogelhuisje ${req.params.id}`});
});

router.put('/:id/recordings', (req, res) => {
    res.status(200).json({recording: `Recording edit voor vogelhuisje ${req.params.id}`});
});

router.delete('/:id/recordings', (req, res) => {
    res.status(200).json({recordings: `Verwijderd recording voor vogelhuisje ${req.params.id}`});
});

export default router;