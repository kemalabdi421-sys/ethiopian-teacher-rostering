import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Menu, X, Search, Plus } from 'lucide-react';

interface NavbarProps {
  onAddTeacher: () => void;
  onSearch: (term: string) => void;
}

export function Navbar({ onAddTeacher, onSearch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">ET</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">EthioTeacher</h1>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <Search className="w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search teachers..."
              onChange={(e) => onSearch(e.target.value)}
              className="border-0 bg-transparent placeholder:text-slate-400"
            />
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={onAddTeacher}
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Teacher
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center gap-2 px-0">
              <Search className="w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search teachers..."
                onChange={(e) => onSearch(e.target.value)}
                className="border-0 bg-transparent"
              />
            </div>
            <Button
              onClick={() => {
                onAddTeacher();
                setIsOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Teacher
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
