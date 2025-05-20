import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import ProfileCard from './components/ProfileCard'; // adjusted import path
import Auth from './pages/Auth';
import { AuthState, UserProfile } from './types';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'assessment' | 'profile' | 'auth'>('auth');
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  const [profile, setProfile] = useState<UserProfile>({
  id: 'user-1',               
  firstName: 'John',
  lastName: 'Doe',
  age: 25,                    
  gender: 'male',             
  email: 'johndoe@example.com',
  occupation: 'Engineer',
  stressHistory: [],          
  preferences: {
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    privacyLevel: 'public'
  }
});

  const [darkMode, setDarkMode] = useState<boolean>(profile.preferences.darkMode);

  useEffect(() => {
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

  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        darkMode
      }
    }));
  }, [darkMode]);

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
        return (
          <ProfileCard
            profile={profile}
            onUpdate={setProfile}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        );
      case 'auth':
        return <Auth onAuthSuccess={handleAuthSuccess} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Layout isAuthenticated={authState.isAuthenticated} onLogout={handleLogout}>
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;
