import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projects';
import { Project } from '../types';
import { Plus, Edit, Trash2, ExternalLink, Loader2, Calendar, Code, Star, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.getMyProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
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

  const getTechStackColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      'python': 'bg-green-100 text-green-800',
      'javascript': 'bg-yellow-100 text-yellow-800',
      'react': 'bg-blue-100 text-blue-800',
      'node.js': 'bg-green-100 text-green-800',
      'typescript': 'bg-blue-100 text-blue-800',
      'html': 'bg-orange-100 text-orange-800',
      'css': 'bg-blue-100 text-blue-800',
      'opencv': 'bg-purple-100 text-purple-800',
      'pandas': 'bg-red-100 text-red-800',
      'numpy': 'bg-blue-100 text-blue-800',
      'mongodb': 'bg-green-100 text-green-800',
      'express': 'bg-gray-100 text-gray-800',
      'tailwind': 'bg-cyan-100 text-cyan-800',
      'next.js': 'bg-black text-white',
      'vue': 'bg-green-100 text-green-800',
      'angular': 'bg-red-100 text-red-800',
      'php': 'bg-purple-100 text-purple-800',
      'mysql': 'bg-blue-100 text-blue-800',
      'postgresql': 'bg-blue-100 text-blue-800',
      'docker': 'bg-blue-100 text-blue-800',
      'aws': 'bg-orange-100 text-orange-800',
      'firebase': 'bg-orange-100 text-orange-800',
      'git': 'bg-orange-100 text-orange-800',
      'figma': 'bg-purple-100 text-purple-800',
      'adobe': 'bg-pink-100 text-pink-800'
    };
    return colors[tech.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-custom-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="glass-beautiful rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Projects</h1>
            <p className="text-slate-200 text-lg">Manage and showcase your amazing work</p>
          </div>
          <Link
            to="/projects/create"
            className="btn-gradient inline-flex items-center px-6 py-3 text-white rounded-xl hover-lift transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Project
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{projects.length}</div>
            <div className="text-slate-200">Total Projects</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {projects.filter(p => p.projectLink).length}
            </div>
            <div className="text-slate-200">Live Projects</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {projects.reduce((acc, p) => acc + p.techStack.length, 0)}
            </div>
            <div className="text-slate-200">Technologies Used</div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`glass-beautiful rounded-2xl overflow-hidden hover-lift card-hover transition-all ${
                index === 0 ? 'slide-in-left' : 
                index === 1 ? 'fade-in' : 
                index === 2 ? 'slide-in-right' : 
                index === 3 ? 'slide-in-left' : 
                index === 4 ? 'fade-in' : 'slide-in-right'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              {project.image && (
                <div className="aspect-video bg-gradient-to-br from-custom-500 to-custom-600 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Link
                      to={`/projects/${project.id}/edit`}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-red-500/80 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white line-clamp-1">{project.title}</h3>
                  <div className="flex items-center text-slate-300 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <p className="text-slate-200 text-sm mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                
                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Code className="w-4 h-4 text-slate-300 mr-2" />
                    <span className="text-slate-300 text-sm font-medium">Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getTechStackColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Project Link */}
                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-custom-500 to-custom-600 text-white rounded-xl hover:from-custom-600 hover:to-custom-700 transition-all font-medium"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-beautiful rounded-2xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="glass rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              <Code className="w-16 h-16 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
            <p className="text-slate-200 mb-8 text-lg">Start building your portfolio by adding your first project. Showcase your skills and creativity!</p>
            <Link
              to="/projects/create"
              className="btn-gradient inline-flex items-center px-8 py-4 text-white rounded-xl hover-lift transition-all text-lg font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Project
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;