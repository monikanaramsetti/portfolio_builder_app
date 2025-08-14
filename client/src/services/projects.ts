import api from './api';
import { Project } from '../types';

export const projectService = {
  async createProject(data: Partial<Project>): Promise<Project> {
    const response = await api.post('/projects', data);
    return response.data;
  },

  async getMyProjects(): Promise<Project[]> {
    const response = await api.get('/projects');
    // Map _id to id for frontend compatibility
    return response.data.map((project: any) => ({ ...project, id: project._id }));
  },

  async getProject(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    // Map _id to id for frontend compatibility
    return { ...response.data, id: response.data._id };
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }
};