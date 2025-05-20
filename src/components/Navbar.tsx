import React from 'react';
import { BrainCog, User } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BrainCog className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold text-gray-800">Human Stress Detector</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <a href="#dashboard" className="text-gray-600 hover:text-blue-500">
                  Dashboard
                </a>
                <a href="#assessment" className="text-gray-600 hover:text-blue-500">
                  Assessment
                </a>
                <a href="#profile" className="text-gray-600 hover:text-blue-500">
                  Profile
                </a>
                <button 
                  onClick={onLogout}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <a 
                href="#auth" 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;