import express from 'express';
import {
  createUserHandler,
  getUsersHandler,
  updateStatusHandler,
} from '../controllers/usersController';

const router = express.Router();

router.get('/', getUsersHandler);
router.post('/:userId', updateStatusHandler);
router.post('/', createUserHandler);

export default router;
