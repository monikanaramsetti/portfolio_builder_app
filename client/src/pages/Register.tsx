import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, HdmiPort as Portfolio, Loader2 } from 'lucide-react';

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with a capital letter')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address')
    .test('no-numbers-only', 'Email cannot start with only numbers', (value) => {
      if (!value) return true;
      const localPart = value.split('@')[0];
      return !/^\d+$/.test(localPart);
    }),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password, 'user'); // Always register as user
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center fade-in">
          <div className="flex justify-center">
            <div className="float">
              <Portfolio className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-bold text-white text-shadow">Create Account</h2>
          <p className="mt-2 text-lg text-white/80 text-shadow">Start building your professional portfolio</p>
        </div>
        
        <div className="glass-heavy rounded-2xl shadow-2xl p-8 hover-glow slide-in-right">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="form-input w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all focus-ring"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="form-input w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all focus-ring"
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="form-input w-full px-4 py-3 pr-10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all focus-ring"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/60" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/60" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-gradient w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-2xl text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover-lift"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/80">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-white hover:text-white/80 transition-colors underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;