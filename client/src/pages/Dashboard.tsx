import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { portfolioService } from '../services/portfolio';
import { projectService } from '../services/projects';
import { Portfolio, Project } from '../types';
import { Plus, HdmiPort as PortfolioIcon, FolderOpen, Eye, Edit, Trash2, Home } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [portfolioData, projectsData] = await Promise.allSettled([
        portfolioService.getMyPortfolio(),
        projectService.getMyProjects(),
      ]);

      if (portfolioData.status === 'fulfilled') {
        setPortfolio(portfolioData.value);
      }

      if (projectsData.status === 'fulfilled') {
        setProjects(projectsData.value);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
        toast.success('Project deleted successfully');
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Home Icon Navigation */}
      <div className="flex justify-end">
        <Link to="/" className="inline-flex items-center p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors shadow-lg mb-2" title="Go to Home">
          <Home className="w-6 h-6 text-white" />
        </Link>
      </div>
      {/* Welcome Section */}
              <div className="glass-beautiful rounded-2xl p-8 text-white hover-glow fade-in">
          <h1 className="text-4xl font-bold mb-2 text-shadow">Welcome back, {user?.name}!</h1>
          <p className="text-slate-100 text-shadow">Manage your portfolio and showcase your amazing work.</p>
        </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 shadow-2xl hover-lift card-hover slide-in-left">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg">
              <PortfolioIcon className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-200">Portfolio Status</p>
              <p className="text-2xl font-bold text-white">
                {portfolio ? 'Active' : 'Not Created'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 shadow-2xl hover-lift card-hover fade-in" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg">
              <FolderOpen className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-200">Projects</p>
              <p className="text-2xl font-bold text-white">{projects.length}</p>
            </div>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 shadow-2xl hover-lift card-hover slide-in-right">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-custom-400 to-custom-600 rounded-lg">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-200">Profile Views</p>
              <p className="text-2xl font-bold text-white">--</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="glass rounded-xl shadow-2xl hover-glow">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">My Portfolio</h2>
            {portfolio ? (
              <div className="flex space-x-2">
                <Link
                  to="/portfolio/edit"
                  className="glass inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white hover-glow transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Link>
                <Link
                  to={portfolio ? `/portfolio/me/${portfolio.id}` : '/portfolio/preview'}
                  className="btn-gradient inline-flex items-center px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover-lift"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Link>
              </div>
            ) : (
              <Link
                to="/portfolio/create"
                className="btn-gradient inline-flex items-center px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover-lift"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Portfolio
              </Link>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {portfolio ? (
            <div>
              <h3 className="text-lg font-medium text-white mb-2">{portfolio.name}</h3>
              <p className="text-white/80 mb-4">{portfolio.profession}</p>
              <p className="text-white/70 text-sm">{portfolio.bio}</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <PortfolioIcon className="w-12 h-12 text-white/60 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Portfolio Yet</h3>
              <p className="text-white/70 mb-4">Create your first portfolio to get started.</p>
              <Link
                to="/portfolio/create"
                className="btn-gradient inline-flex items-center px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover-lift"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Now
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div className="glass rounded-xl shadow-2xl hover-glow">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
            <Link
              to="/projects/create"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover-lift transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project) => (
                <div key={project.id} className="glass rounded-lg p-4 hover-lift card-hover transition-all">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="font-medium text-white mb-2">{project.title}</h3>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-white/20 text-white rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-1">
                      <Link
                        to={`/projects/${project.id}/edit`}
                        className="p-1 text-white/60 hover:text-white transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-1 text-white/60 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FolderOpen className="w-12 h-12 text-white/60 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Projects Yet</h3>
              <p className="text-white/70 mb-4">Add your first project to showcase your work.</p>
              <Link
                to="/projects/create"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover-lift transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;