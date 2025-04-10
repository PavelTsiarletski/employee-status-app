import axios from 'axios';
import { User, UserStatus } from '@store/employeesSlice';

const API_BASE = 'http://localhost:8000';

export const usersApi = {
  async getAll(): Promise<User[]> {
    const res = await axios.get(`${API_BASE}/users`);
    return res.data;
  },

  async updateStatus(userId: string, status: UserStatus): Promise<void> {
    await axios.post(`${API_BASE}/users/${userId}`, { status });
  },

  async createUser(name: string, status: UserStatus): Promise<User> {
    const res = await axios.post(`${API_BASE}/users`, { name, status });
    return res.data;
  },
};
