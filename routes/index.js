import express from 'express';

import birdhouses from './birdhouses.js';
import shopitems from "./shopitems.js";
import recordings from "./recordings.js";
import rentals from "./rentals.js";
import users from "./users.js";
import auth from "./auth.js";
<<<<<<< HEAD

const router = express.Router();

router.use('/', birdhouses);
router.use('/', notes);
router.use('/', shopitems);
router.use('/', recordings);
router.use('/', rentals);
router.use('/', auth);

router.use('/', users);
=======
import cameras from "./cameras.js";

const router = express.Router();

router.use('/birdhouses', birdhouses);
router.use('/shopitems', shopitems);
router.use('/recordings', recordings);
router.use('/rentals', rentals);
router.use('/users', users);
router.use('/auth', auth);
router.use('/cameras', cameras)
>>>>>>> 489eae762a5a11fdda5a645f572992aab7e75b5d

export default router;