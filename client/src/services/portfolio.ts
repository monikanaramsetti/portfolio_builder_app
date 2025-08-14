import api from './api';
import { Portfolio } from '../types';

export const portfolioService = {
  async createPortfolio(data: Partial<Portfolio>): Promise<Portfolio> {
    const response = await api.post('/portfolio', data);
    return response.data;
  },

  async getMyPortfolio(): Promise<Portfolio> {
    const response = await api.get('/portfolio/me');
    return response.data;
  },

  async updateMyPortfolio(data: Partial<Portfolio>): Promise<Portfolio> {
    const response = await api.put('/portfolio/me', data);
    return response.data;
  },

  async deleteMyPortfolio(): Promise<void> {
    await api.delete('/portfolio/me');
  },

  async getAllPortfolios(): Promise<Portfolio[]> {
    const response = await api.get('/portfolio');
    return response.data;
  },

  async deletePortfolioById(id: string): Promise<void> {
    await api.delete(`/portfolio/${id}`);
  }
};