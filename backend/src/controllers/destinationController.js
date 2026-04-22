import { getAllDestinations, getDestinationById } from '../services/dataService.js';

/**
 * GET /api/destinations
 * Retourne toutes les destinations
 */
export async function listDestinations(req, res, next) {
  try {
    const destinations = await getAllDestinations();
    res.json({ success: true, data: destinations, count: destinations.length });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/destinations/:id
 * Retourne une destination par son ID
 */
export async function getDestination(req, res, next) {
  try {
    const destination = await getDestinationById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination temporelle introuvable.' });
    }
    res.json({ success: true, data: destination });
  } catch (err) {
    next(err);
  }
}
