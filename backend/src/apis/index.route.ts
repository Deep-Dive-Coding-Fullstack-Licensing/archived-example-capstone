import { Router } from 'express';
import { indexWelcome } from './index.controller';

const router : Router = Router();

router.route('/')
  .get(indexWelcome);

export default router;
