import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Portfolio } from '../types';
import api from '../services/api';
import { Loader2, Mail } from 'lucide-react';
import ProfessionalTemplate from '../components/ProfessionalTemplate';

const PortfolioPreview: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        let response;
        // If the route is /portfolio/me (no id param), fetch the logged-in user's portfolio
        if (location.pathname === '/portfolio/me' || !id) {
          response = await api.get('/portfolio/me');
        } else {
          response = await api.get(`/portfolio/${id}`);
        }
        setPortfolio(response.data);
      } catch (err: any) {
        setError('Portfolio not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [id, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-heavy rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center">
          <h3 className="text-xl font-semibold text-white mb-2">{error || 'Portfolio not found'}</h3>
        </div>
      </div>
    );
  }

  if (portfolio.templateStyle === 'professional') {
    return <ProfessionalTemplate portfolio={portfolio} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="glass-heavy rounded-2xl shadow-2xl overflow-hidden card-hover transition-all">
          <div className="p-6">
            <div className="flex items-center mb-4">
              {portfolio.profileImage ? (
                <img
                  src={portfolio.profileImage}
                  alt={portfolio.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              {/* Fallback Avatar - always present but hidden if image exists */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl ${portfolio.profileImage ? 'hidden' : ''}`}>
                {portfolio.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">{portfolio.name}</h3>
                <p className="text-blue-300 font-medium">{portfolio.profession}</p>
              </div>
            </div>
            <p className="text-slate-200 mb-4 line-clamp-3">{portfolio.bio}</p>
            <div className="mb-4">
              <span className="font-semibold text-slate-300">Skills:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {portfolio.skills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-700 text-slate-200 px-2 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Mail className="w-4 h-4 text-slate-300" />
              <span className="text-slate-200">{portfolio.contactInfo}</span>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300`}>
                {portfolio.templateStyle} template
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview; 