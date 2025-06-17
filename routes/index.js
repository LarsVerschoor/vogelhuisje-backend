import express from 'express';

import birdhouses from './birdhouses.js';
import notes from "./notes.js";
import shopitems from "./shopitems.js";
import recordings from "./recordings.js";
import rentals from "./rentals.js";
import users from "./users.js";

const router = express.Router();

router.use('/birdhouses', birdhouses);
router.use('/notes', notes);
router.use('/shopitems', shopitems);
router.use('/recordings', recordings);
router.use('/rentals', rentals)
router.use('/users', users)

export default router;