import React from 'react';
import { BookOpen, Search, Menu, UserCircle } from 'lucide-react';
import { Button } from './ui/button';

interface NavbarProps {
  onAddTeacher: () => void;
  onSearch: (term: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddTeacher, onSearch }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent hidden sm:block">
              EthioTeacher Roster
            </span>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-emerald-200 rounded-full bg-emerald-50/30 text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Search teachers by name or subject..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              onClick={onAddTeacher}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-lg shadow-emerald-200"
            >
              Add Teacher
            </Button>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200 cursor-pointer hover:bg-amber-200 transition-colors">
              <UserCircle className="h-6 w-6 text-amber-700" />
            </div>
            <button className="md:hidden p-2 text-emerald-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};