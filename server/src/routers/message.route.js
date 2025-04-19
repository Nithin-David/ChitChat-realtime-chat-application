import express from 'express';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';


const router = express.Router();

router.get('/users', protectedRoute, getUsersForSidebar);
router.post('/send/:id', protectedRoute, sendMessage);

router.get('/chat/:id', protectedRoute, getMessages);

export default router;