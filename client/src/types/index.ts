export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Portfolio {
  id?: string;
  _id?: string;
  name: string;
  profession: string;
  bio: string;
  profileImage?: string;
  contactInfo: string;
  skills: string[];
  projects: Project[];
  socialLinks: string[];
  templateStyle: 'modern' | 'minimal' | 'creative' | 'professional' | 'elegant' | 'bold';
  user?: User;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  projectLink: string;
  image?: string;
  user: User;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}