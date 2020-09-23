import { Router } from 'express';
import { indexWelcome } from './index.controller';

const router = Router();

router.route('/')
  .get(indexWelcome);

export default router;
