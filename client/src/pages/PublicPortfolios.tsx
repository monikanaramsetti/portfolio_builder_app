import React, { useState, useEffect } from 'react';
import { portfolioService } from '../services/portfolio';
import { Portfolio } from '../types';
import { Eye, Mail, ExternalLink, Loader2, Trash2, Camera, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PublicPortfolios: React.FC = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPhotoReminder, setShowPhotoReminder] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      const data = await portfolioService.getAllPortfolios();
      setPortfolios(data);
      
      // Check if current user has a portfolio without a profile image
      if (user) {
        const userPortfolio = data.find(p => p.user?.id === user.id);
        if (userPortfolio && !userPortfolio.profileImage) {
          setShowPhotoReminder(true);
        }
      }
    } catch (error) {
      console.error('Failed to load portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) return;
    try {
      await portfolioService.deletePortfolioById(id);
      setPortfolios(portfolios.filter(p => p.id !== id));
    } catch (error) {
      alert('Failed to delete portfolio');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 6}px`,
              height: `${Math.random() * 12 + 6}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Photo Upload Reminder */}
        {showPhotoReminder && (
          <div className="mb-8 glass-heavy rounded-2xl p-6 border border-blue-400/30">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Make Your Portfolio Stand Out!</h3>
                  <p className="text-slate-200 mb-3">
                    Upload your own profile photo to make your portfolio more personal and professional. 
                    A great photo helps you connect with potential employers and clients.
                  </p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.location.href = '/portfolio/edit'}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Create New Portfolio
                    </button>
                    <button 
                      onClick={() => window.location.href = '/dashboard'}
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
                    >
                      Go to Dashboard
                    </button>
                    <a 
                      href="/PHOTO_UPLOAD_GUIDE.md"
                      target="_blank"
                      className="px-4 py-2 bg-transparent border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors text-sm font-medium"
                    >
                      View Guide
                    </a>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowPhotoReminder(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold text-white mb-4 text-shadow">Discover Amazing Portfolios</h1>
          <p className="text-xl text-slate-100 text-shadow">Explore talented professionals and their work</p>
        </div>

        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className="glass-heavy rounded-2xl shadow-2xl overflow-hidden hover-lift card-hover transition-all">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {portfolio.profileImage ? (
                      <img
                        src={(portfolio.profileImage.startsWith('http') ? portfolio.profileImage : 'http://localhost:5000' + portfolio.profileImage) + '?t=' + Date.now()}
                        alt={portfolio.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-lg"
                        onError={(e) => {
                          // Remove the fallback to default image - show avatar instead
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    {/* Fallback Avatar - always present but hidden if image exists */}
                    <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl border-2 border-white/20 shadow-lg ${portfolio.profileImage ? 'hidden' : ''}`}>
                      {portfolio.name?.charAt(0).toUpperCase() || 'U'}
                      {/* Upload Photo Button */}
                      <button 
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border border-white shadow-md hover:bg-blue-700 transition-colors"
                        title="Upload your photo"
                        onClick={() => window.location.href = '/portfolio/edit'}
                      >
                        <Camera className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">{portfolio.name}</h3>
                      <p className="text-blue-300 font-medium">{portfolio.profession}</p>
                    </div>
                  </div>

                  <p className="text-slate-200 mb-4 line-clamp-3">{portfolio.bio}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-200 mb-2">Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {portfolio.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {portfolio.skills.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-white/10 text-white/70 rounded-full">
                          +{portfolio.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center text-slate-300 text-sm">
                      <Mail className="w-4 h-4 mr-1" />
                      <span className="truncate">{portfolio.contactInfo}</span>
                    </div>
                    <div className="flex space-x-2">
                      {portfolio.socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      portfolio.templateStyle === 'modern' ? 'bg-custom-500/20 text-custom-300' :
                      portfolio.templateStyle === 'minimal' ? 'bg-primary-500/20 text-primary-300' :
                      portfolio.templateStyle === 'creative' ? 'bg-accent-500/20 text-accent-300' :
                      portfolio.templateStyle === 'professional' ? 'bg-emerald-500/20 text-emerald-300' :
                      portfolio.templateStyle === 'elegant' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}>
                      {portfolio.templateStyle} template
                    </span>
                    {user?.role === 'admin' && (
                      <button
                        className="ml-2 p-1 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                        title="Delete Portfolio"
                        onClick={() => handleDelete(portfolio.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="glass-heavy rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
              <Eye className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Portfolios Yet</h3>
              <p className="text-slate-200">Be the first to create and share your portfolio!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPortfolios;