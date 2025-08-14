import api from './api';
import { User } from '../types';

export const adminService = {
  async getAllUsers(): Promise<User[]> {
    const response = await api.get('/admin/users');
    // Map _id to id for all users
    return response.data.map((user: any) => ({
      ...user,
      id: user._id,
    }));
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/admin/user/${id}`);
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await api.put(`/admin/user/${id}`, data);
    // Map _id to id
    return { ...response.data, id: response.data._id };
  },

  async generateInviteCode(): Promise<{ inviteCode: string; expiresAt: string }> {
    const response = await api.post('/admin/invite');
    return response.data;
  },

  async getAllInviteCodes(): Promise<any[]> {
    const response = await api.get('/admin/invites');
    return response.data;
  }
};