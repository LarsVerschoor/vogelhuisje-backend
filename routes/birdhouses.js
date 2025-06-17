import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({birdhouses: 'Vogelhuisjes'});
});
/************************
 ROUTES VOOR VOGELHUISJE
 ************************/
router.get('/:birdhouse_id', (req, res) => {
    res.status(200).json({birdhouse: `Vogelhuisje ${req.params.id}`});
});

router.post('/', (req, res) => {
    res.status(200).json({birdhouse: 'Vogelhuisje aangemaakt'});
});

router.put('/:id', (req, res) => {
    res.status(200).json({birdhouse: `Vogelhuisje ${req.params.id} aangepast`});
});

router.delete('/:id', (req, res) => {
    res.status(200).json({birdhouse: `Vogelhuisje ${req.params.id} verwijderd`});
});

/************************
 ROUTES VOOR NOTES VAN HET VOGELHUISJE
 ************************/
router.get('/:id/notes', (req, res) => {
    res.status(200).json({notes: `Notities voor vogelhuisje ${req.params.id}`});
})

router.post('/:id/notes', (req, res) => {
    res.status(200).json({note: `Notitie voor vogelhuisje ${req.params.id}`});
})

router.put('/:id/notes', (req, res) => {
    res.status(200).json({note: `Notitie edit voor vogelhuisje ${req.params.id}`});
})

router.delete('/:id/notes', (req, res) => {
    res.status(200).json({recordings: `Verwijderd note voor vogelhuisje ${req.params.id}`});
})

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