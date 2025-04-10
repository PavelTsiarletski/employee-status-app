import { Request, Response } from 'express';
import { getAllUsers, updateUserStatus } from '../services/usersService';
import { isValidStatus } from '../utils/validateStatus';
import { v4 as uuid } from 'uuid';
import { User } from '../types/User';
import { users } from '../data/usersDb';

const DEFAULT_AVATAR =
  'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png';

export const getUsersHandler = (req: Request, res: Response) => {
  res.json(getAllUsers());
};

export const updateStatusHandler = (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { status } = req.body;

  if (!isValidStatus(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const updated = updateUserStatus(userId, status);
  if (!updated) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(updated);
};

export const createUserHandler = (req: Request, res: Response) => {
  const { name, status, img } = req.body;

  if (!name || typeof name !== 'string' || !/^[A-Za-z\s]+$/.test(name)) {
    return res.status(400).json({ message: 'Invalid name' });
  }

  if (!isValidStatus(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const newUser: User = {
    id: uuid(),
    name,
    status,
    img: img?.trim() || DEFAULT_AVATAR,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};
