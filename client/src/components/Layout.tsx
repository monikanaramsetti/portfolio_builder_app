import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, LogOut, HdmiPort as Portfolio, FolderOpen, Users, Home } from 'lucide-react';
import { portfolioService } from '../services/portfolio';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [portfolioId, setPortfolioId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (user) {
        try {
          const portfolio = await portfolioService.getMyPortfolio();
          setPortfolioId(portfolio.id || portfolio._id || null); // Ensure never undefined
        } catch {
          setPortfolioId(null);
        }
      }
    };
    fetchPortfolio();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/portfolio/me', icon: Portfolio, label: 'My Portfolio' },
    { path: '/projects', icon: FolderOpen, label: 'Projects' },
    ...(user?.role === 'admin' ? [{ path: '/admin', icon: Users, label: 'Admin Panel' }] : []),
  ];

  return (
    <div className="min-h-screen animated-gradient">
      <nav className="glass backdrop-blur-strong border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Portfolio className="w-8 h-8 text-white drop-shadow-lg" />
                <span className="font-bold text-xl text-white text-shadow">ProfileNest</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-white/20 text-white backdrop-blur-md'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-white/80" />
                  <span className="text-sm font-medium text-white">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;