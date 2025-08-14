import React from 'react';
import { Portfolio } from '../types';
import { Mail, MapPin, Calendar, Star, Code, Briefcase, Camera } from 'lucide-react';

interface ProfessionalTemplateProps {
  portfolio: Portfolio;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ portfolio }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
    {/* Animated background particles */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-32 left-32 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30"></div>
    </div>

    {/* Main Profile Card */}
    <div className="glass-beautiful max-w-4xl w-full mx-auto relative z-10">
      {/* Header Section */}
      <div className="relative p-8 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <div className="relative group">
            {portfolio.profileImage ? (
              <img
                src={(portfolio.profileImage.startsWith('http') ? portfolio.profileImage : 'http://localhost:5000' + portfolio.profileImage) + '?t=' + Date.now()}
                alt={portfolio.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl group-hover:border-blue-400/50 transition-all duration-300"
              />
            ) : (
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white/20 shadow-2xl group-hover:border-blue-400/50 transition-all duration-300">
                  <span className="text-3xl font-bold text-white">
                    {portfolio.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Upload Photo Hint */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Upload your photo
                </div>
              </div>
            )}
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Name and Title */}
          <div className="text-center md:text-left flex-1">
            <h1 className="gradient-text-beautiful text-4xl md:text-5xl font-bold mb-2">
              {portfolio.name}
            </h1>
            <p className="text-xl text-blue-200 mb-3 flex items-center justify-center md:justify-start gap-2">
              <Briefcase className="w-5 h-5" />
              {portfolio.profession}
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm border border-blue-400/30">
                <Star className="w-4 h-4" />
                Professional
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm border border-purple-400/30">
                <Code className="w-4 h-4" />
                Developer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {/* Bio */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            About Me
          </h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            {portfolio.bio}
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Skills & Expertise
          </h3>
          <div className="flex flex-wrap gap-3">
            {portfolio.skills.map((skill, idx) => (
              <span 
                key={idx} 
                className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 rounded-full text-sm font-medium border border-blue-400/30 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            Contact Information
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/30 transition-all duration-300">
              <Mail className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">{portfolio.contactInfo}</span>
            </div>
          </div>
        </div>

        {/* Template Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white rounded-full border border-blue-400/30 hover:border-blue-400/60 hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300 cursor-pointer group">
            <span className="text-sm font-medium">
              {portfolio.templateStyle} Template
            </span>
            <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-300 transition-colors duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfessionalTemplate; 