import { Request, Response } from 'express';
import { getAllUsers, updateUserStatus } from '../services/usersService';
import { isValidStatus } from '../utils/validateStatus';
import { v4 as uuid } from 'uuid';
import { User } from '../types/User';
import { users } from '../data/usersDb';

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
  const { name, status } = req.body;

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
  };

  users.push(newUser);
  res.status(201).json(newUser);
};
