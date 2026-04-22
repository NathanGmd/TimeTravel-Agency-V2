import { Router } from 'express';
import { createNewBooking, listBookings } from '../controllers/bookingController.js';
import { bookingValidators } from '../middleware/validators.js';

const router = Router();

router.post('/', bookingValidators, createNewBooking);
router.get('/', listBookings); // À sécuriser avec auth en production

export default router;
