import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, HdmiPort as Portfolio, Star, Users, Zap, Sparkles, Code, Palette, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";

const Home: React.FC = () => {
  const { user } = useAuth();

  // Remove the auto-redirect to dashboard
  // if (user) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Floating Particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 10 + 15}s`
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            <div className="text-center fade-in">
              <div className="float mb-8">
                <Portfolio className="w-20 h-20 mx-auto text-white drop-shadow-lg" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow">
                Welcome to
                <span className="block gradient-text-beautiful"> ProfileNest</span>
                <br />Portfolio Builder
              </h1>
              <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto text-shadow">
                Create stunning portfolios without coding. Showcase your projects, skills, and achievements with ProfileNest's beautiful templates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="btn-gradient inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white shadow-2xl hover-lift"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  {user ? "Dashboard" : "Get Started Free"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/portfolios"
                  className="glass inline-flex items-center px-8 py-4 text-base font-medium rounded-xl text-white hover-glow transition-all shadow-2xl"
                >
                  <Eye className="mr-2 w-5 h-5" />
                  View Examples
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-white/95 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose ProfileNest?</h2>
              <p className="text-lg text-slate-600">Everything you need to create a professional online presence</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl glass-heavy hover-lift card-hover slide-in-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-6 pulse-slow">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Easy to Use</h3>
                <p className="text-slate-600">No coding required. Build your portfolio with our intuitive drag-and-drop interface.</p>
              </div>
              
              <div className="text-center p-8 rounded-2xl glass-heavy hover-lift card-hover fade-in" style={{animationDelay: '0.2s'}}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mb-6 pulse-slow">
                  <Star className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Beautiful Templates</h3>
                <p className="text-slate-600">Choose from professionally designed templates that make you stand out.</p>
              </div>
              
              <div className="text-center p-8 rounded-2xl glass-beautiful hover-lift card-hover slide-in-right">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-custom-400 to-custom-600 rounded-full mb-6 pulse-glow neon-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Share & Connect</h3>
                <p className="text-slate-600">Share your portfolio with employers and connect with other professionals.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 glass-heavy relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="fade-in">
                <div className="text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/80">Portfolios Created</div>
              </div>
              <div className="fade-in" style={{animationDelay: '0.1s'}}>
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/80">Projects Showcased</div>
              </div>
              <div className="fade-in" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-white/80">User Satisfaction</div>
              </div>
              <div className="fade-in" style={{animationDelay: '0.3s'}}>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/80">Support Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Preview */}
        <div className="py-24 bg-white/95 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fade-in">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Beautiful Templates</h2>
              <p className="text-lg text-slate-600">Choose from ProfileNest's collection of professionally designed templates</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Modern', 
                  desc: 'Clean and contemporary design with bold typography',
                  color: 'from-blue-500 to-blue-600',
                  icon: '💼',
                  elements: [
                    { type: 'circle', pos: 'top-3 left-3', size: 'w-6 h-6' },
                    { type: 'square', pos: 'top-3 right-3', size: 'w-5 h-5' },
                    { type: 'line', pos: 'bottom-3 left-3', size: 'w-10 h-1' },
                    { type: 'line', pos: 'bottom-3 right-3', size: 'w-6 h-1' }
                  ]
                },
                { 
                  name: 'Minimal', 
                  desc: 'Simple and elegant with focus on content',
                  color: 'from-gray-500 to-gray-600',
                  icon: '✨',
                  elements: [
                    { type: 'line', pos: 'top-4 left-4', size: 'w-8 h-0.5' },
                    { type: 'line', pos: 'top-4 right-4', size: 'w-6 h-0.5' },
                    { type: 'circle', pos: 'bottom-4 left-4', size: 'w-3 h-3' },
                    { type: 'line', pos: 'bottom-4 right-4', size: 'w-12 h-0.5' }
                  ]
                },
                { 
                  name: 'Creative', 
                  desc: 'Artistic and expressive with unique layouts',
                  color: 'from-purple-500 to-purple-600',
                  icon: '🎨',
                  elements: [
                    { type: 'circle', pos: 'top-3 left-3', size: 'w-4 h-4' },
                    { type: 'square', pos: 'top-3 right-3', size: 'w-4 h-4' },
                    { type: 'triangle', pos: 'bottom-3 left-3', size: 'w-6 h-6' },
                    { type: 'circle', pos: 'bottom-3 right-3', size: 'w-3 h-3' }
                  ]
                },
                { 
                  name: 'Professional', 
                  desc: 'Corporate-ready with structured layout',
                  color: 'from-emerald-500 to-emerald-600',
                  icon: '🏢',
                  elements: [
                    { type: 'square', pos: 'top-3 left-3', size: 'w-6 h-6' },
                    { type: 'line', pos: 'top-3 right-3', size: 'w-8 h-1' },
                    { type: 'line', pos: 'bottom-3 left-3', size: 'w-10 h-1' },
                    { type: 'square', pos: 'bottom-3 right-3', size: 'w-4 h-4' }
                  ]
                },
                { 
                  name: 'Elegant', 
                  desc: 'Sophisticated design with refined aesthetics',
                  color: 'from-rose-500 to-rose-600',
                  icon: '👑',
                  elements: [
                    { type: 'circle', pos: 'top-4 left-4', size: 'w-5 h-5' },
                    { type: 'line', pos: 'top-4 right-4', size: 'w-6 h-0.5' },
                    { type: 'line', pos: 'bottom-4 left-4', size: 'w-8 h-0.5' },
                    { type: 'circle', pos: 'bottom-4 right-4', size: 'w-4 h-4' }
                  ]
                },
                { 
                  name: 'Bold', 
                  desc: 'Dynamic and impactful with strong visual elements',
                  color: 'from-orange-500 to-orange-600',
                  icon: '⚡',
                  elements: [
                    { type: 'square', pos: 'top-3 left-3', size: 'w-7 h-7' },
                    { type: 'circle', pos: 'top-3 right-3', size: 'w-5 h-5' },
                    { type: 'line', pos: 'bottom-3 left-3', size: 'w-12 h-1.5' },
                    { type: 'square', pos: 'bottom-3 right-3', size: 'w-5 h-5' }
                  ]
                }
              ].map((template, index) => (
                <div key={template.name} className={`glass-heavy p-8 rounded-2xl hover-lift card-hover ${index === 0 ? 'slide-in-left' : index === 1 ? 'fade-in' : index === 2 ? 'slide-in-right' : index === 3 ? 'slide-in-left' : index === 4 ? 'fade-in' : 'slide-in-right'}`}>
                  <div className={`aspect-video bg-gradient-to-br ${template.color} rounded-lg mb-6 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Template Layout Preview */}
                    <div className="relative z-10 w-full h-full p-4">
                      {/* Header Section */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-white/30 rounded"></div>
                          <div className="w-3 h-3 bg-white/30 rounded"></div>
                          <div className="w-3 h-3 bg-white/30 rounded"></div>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="space-y-2">
                        <div className="w-3/4 h-2 bg-white/30 rounded"></div>
                        <div className="w-1/2 h-2 bg-white/20 rounded"></div>
                        <div className="w-2/3 h-2 bg-white/25 rounded"></div>
                      </div>
                      
                      {/* Bottom Elements */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        <div className="w-12 h-1 bg-white/30 rounded"></div>
                        <div className="w-8 h-1 bg-white/20 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Template Icon */}
                    <div className="absolute top-2 right-2">
                      <span className="text-2xl">{template.icon}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{template.name} Template</h3>
                  <p className="text-slate-600">{template.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 animated-gradient relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
            <h2 className="text-4xl font-bold text-white mb-4 text-shadow">Ready to Build Your Portfolio?</h2>
            <p className="text-xl text-slate-100 mb-8 text-shadow">Join thousands of professionals who trust ProfileNest</p>
            <Link
              to="/register"
              className="glass inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white hover-glow transition-all transform hover:scale-105 shadow-2xl"
            >
              <Code className="mr-2 w-5 h-5" />
              Start Building Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;