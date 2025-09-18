import express from 'express';
import { createMessage, getMessagesByMatch } from '../controllers/messageController.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/:matchId', getMessagesByMatch);

export default router;