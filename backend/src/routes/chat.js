import { Router } from 'express';
import { chat } from '../controllers/chatController.js';
import { chatLimiter } from '../middleware/rateLimiter.js';
import { chatValidators } from '../middleware/validators.js';

const router = Router();

router.post('/', chatLimiter, chatValidators, chat);

export default router;
