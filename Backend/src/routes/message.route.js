import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {getUsersForSidebar,getMessages,sendMessages} from '../controllers/message.controller.js';

const router = express.Router();

router.post("/users",protectRoute,getUsersForSidebar);
router.get("/:id",protectRoute,getMessages);
router.get("/send/:id",protectRoute,sendMessages);

export default router;