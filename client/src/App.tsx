import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePortfolio from './pages/CreatePortfolio';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import AdminPanel from './pages/AdminPanel';
import PublicPortfolios from './pages/PublicPortfolios';
import NotFound from './pages/NotFound';
import PortfolioPreview from './pages/PortfolioPreview';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portfolios" element={<PublicPortfolios />} />
            <Route path="/portfolio/me/:id" element={<PortfolioPreview />} />
            <Route path="/portfolio/me" element={<PortfolioPreview />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/portfolio/create"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CreatePortfolio />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/portfolio/edit"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CreatePortfolio />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Projects />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/create"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CreateProject />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:id/edit"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CreateProject />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <AdminPanel />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Redirect unknown routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;