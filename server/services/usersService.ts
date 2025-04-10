import { users } from '../data/usersDb';
import { User, UserStatus } from '../types/User';

export const getAllUsers = (): User[] => {
  return users;
};

export const updateUserStatus = (
  userId: string,
  status: UserStatus
): User | null => {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  user.status = status;
  return user;
};
