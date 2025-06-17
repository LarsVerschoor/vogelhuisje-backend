import express from 'express';

import birdhouses from './birdhouses.js';

const router = express.Router();

router.use('/birdhouses', birdhouses);

export default router;