import { Router } from 'express';
import { indexWelcome } from '../controllers/index.controller';

const router = Router();

router.route('/apis')
  .get(indexWelcome);

export default router;
