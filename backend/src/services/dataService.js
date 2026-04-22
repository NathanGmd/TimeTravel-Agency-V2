import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../../data');

/**
 * Lit un fichier JSON de données
 */
async function readData(filename) {
  const path = join(DATA_DIR, filename);
  const raw = await readFile(path, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Écrit dans un fichier JSON de données
 */
async function writeData(filename, data) {
  const path = join(DATA_DIR, filename);
  await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Destinations ──────────────────────────────────────────────

export async function getAllDestinations() {
  const { destinations } = await readData('destinations.json');
  return destinations;
}

export async function getDestinationById(id) {
  const destinations = await getAllDestinations();
  return destinations.find(d => d.id === id) || null;
}

// ── Bookings ──────────────────────────────────────────────────

export async function getAllBookings() {
  const { bookings } = await readData('bookings.json');
  return bookings;
}

export async function createBooking(bookingData) {
  const { bookings } = await readData('bookings.json');
  const newBooking = {
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  bookings.push(newBooking);
  await writeData('bookings.json', { bookings });
  return newBooking;
}
