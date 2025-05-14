import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import { AuthState } from './types';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'assessment' | 'profile' | 'auth'>('auth');
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!authState.isAuthenticated && hash !== 'auth') {
        setCurrentPage('auth');
        window.location.hash = 'auth';
        return;
      }
      
      if (hash === 'assessment') {
        setCurrentPage('assessment');
      } else if (hash === 'profile') {
        setCurrentPage('profile');
      } else if (hash === 'auth') {
        setCurrentPage('auth');
      } else {
        setCurrentPage('dashboard');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [authState.isAuthenticated]);

  const handleAuthSuccess = (user: any) => {
    setAuthState({
      isAuthenticated: true,
      user
    });
    window.location.hash = 'dashboard';
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
    window.location.hash = 'auth';
  };

  const renderPage = () => {
    if (!authState.isAuthenticated && currentPage !== 'auth') {
      return <Auth onAuthSuccess={handleAuthSuccess} />;
    }

    switch (currentPage) {
      case 'assessment':
        return <Assessment />;
      case 'profile':
        return <Profile />;
      case 'auth':
        return <Auth onAuthSuccess={handleAuthSuccess} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout isAuthenticated={authState.isAuthenticated} onLogout={handleLogout}>
      {renderPage()}
    </Layout>
  );
}

export default App;