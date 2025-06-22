import express from 'express';

import birdhouses from './birdhouses.js';
import notes from "./notes.js";
import shopitems from "./shopitems.js";
import recordings from "./recordings.js";
import rentals from "./rentals.js";
import users from "./users.js";
import auth from "./auth.js";

const router = express.Router();

router.use('/', birdhouses);
router.use('/', notes);
router.use('/', shopitems);
router.use('/', recordings);
router.use('/', rentals);
router.use('/', auth);

router.use('/', users);

export default router;