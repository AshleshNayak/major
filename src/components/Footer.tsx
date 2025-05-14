import React from 'react';
import { Heart, MessageCircle, Info } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} StressLens. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#about" 
              className="text-gray-500 hover:text-blue-500 transition-colors flex items-center"
            >
              <Info className="h-4 w-4 mr-1" />
              <span className="text-sm">About</span>
            </a>
            <a 
              href="#support" 
              className="text-gray-500 hover:text-blue-500 transition-colors flex items-center"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">Support</span>
            </a>
            <a 
              href="#privacy" 
              className="text-gray-500 hover:text-blue-500 transition-colors flex items-center"
            >
              <Heart className="h-4 w-4 mr-1" />
              <span className="text-sm">Privacy</span>
            </a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-xs">
              This application is for informational purposes only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;