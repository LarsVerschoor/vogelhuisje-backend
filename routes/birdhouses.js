import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({birdhouses: 'Vogelhuisjes'});
});

export default router;