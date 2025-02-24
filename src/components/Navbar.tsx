import React from 'react';
import { Dumbbell } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Dumbbell className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">AI.thlete</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Scoring
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Community
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Trainer
              </a>
            </div>
          </div>

          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;