import { body } from 'express-validator';

export const chatValidators = [
  body('messages')
    .isArray({ min: 1, max: 20 })
    .withMessage('messages doit être un tableau de 1 à 20 éléments'),
  body('messages.*.role')
    .isIn(['user', 'assistant'])
    .withMessage('role doit être "user" ou "assistant"'),
  body('messages.*.content')
    .isString()
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('content doit être une chaîne de 1 à 2000 caractères'),
];

export const bookingValidators = [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('Prénom invalide (2-50 caractères)'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Nom invalide (2-50 caractères)'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('phone').optional().isMobilePhone().withMessage('Numéro de téléphone invalide'),
  body('destinationId').isIn(['ancient', 'medieval', 'future']).withMessage('Destination invalide'),
  body('travelers').isInt({ min: 1, max: 10 }).withMessage('Nombre de voyageurs invalide (1-10)'),
  body('departureDate').isISO8601().toDate().withMessage('Date de départ invalide'),
  body('duration').isIn(['weekend', 'week', '2weeks', 'month']).withMessage('Durée invalide'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes trop longues (max 1000 caractères)'),
];
