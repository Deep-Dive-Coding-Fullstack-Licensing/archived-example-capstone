import { Router } from 'express';
import {toggleLike} from "../controllers/like.controller";

const router = Router();

// Every new route is instantiated below. It will include the controller name and the type of action (get, post, delete, put, patch)
router.route('/')
	.post(toggleLike);

export default router;
