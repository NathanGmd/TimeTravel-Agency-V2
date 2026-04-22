import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { createBooking, getAllBookings, getDestinationById } from '../services/dataService.js';

/**
 * POST /api/bookings
 * Crée une nouvelle réservation
 */
export async function createNewBooking(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { firstName, lastName, email, phone, destinationId, travelers, departureDate, duration, notes } = req.body;

    // Vérifier que la destination existe
    const destination = await getDestinationById(destinationId);
    if (!destination) {
      return res.status(400).json({ success: false, message: 'Destination temporelle invalide.' });
    }

    const booking = await createBooking({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      phone: phone || null,
      destinationId,
      destinationTitle: destination.title,
      travelers: parseInt(travelers) || 1,
      departureDate,
      duration,
      notes: notes || null,
      totalPrice: destination.price * (parseInt(travelers) || 1),
      currency: destination.currency,
    });

    res.status(201).json({
      success: true,
      message: 'Voyage temporel initié avec succès ! Notre équipe vous contactera sous 48h.',
      data: {
        id: booking.id,
        status: booking.status,
        destination: booking.destinationTitle,
        departureDate: booking.departureDate,
        totalPrice: booking.totalPrice,
        currency: booking.currency,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/bookings
 * Liste toutes les réservations (usage admin/dev)
 */
export async function listBookings(req, res, next) {
  try {
    const bookings = await getAllBookings();
    res.json({ success: true, data: bookings, count: bookings.length });
  } catch (err) {
    next(err);
  }
}
