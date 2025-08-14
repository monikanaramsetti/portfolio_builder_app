import api from './api';
import { User } from '../types';

export const authService = {
  async login(email: string, password: string, role: string): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/login', { email, password, role });
    return response.data;
  },

  async register(name: string, email: string, password: string, role: string): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put('/auth/profile', data);
    return response.data;
  }
};