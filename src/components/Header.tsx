import React from 'react';
import { Search, Plus, Heart, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onAddItem: () => void;
  onShowMatches: () => void;
  onShowStats: () => void;
  matchCount: number;
}

const Header: React.FC<HeaderProps> = ({ onAddItem, onShowMatches, onShowStats, matchCount }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FindIt</h1>
              <p className="text-sm text-gray-500">Lost & Found System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onShowStats}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <TrendingUp className="w-5 h-5" />
              <span className="hidden sm:inline">Stats</span>
            </button>
            
            <button
              onClick={onShowMatches}
              className="relative flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Matches</span>
              {matchCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {matchCount}
                </span>
              )}
            </button>
            
            <button
              onClick={onAddItem}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Report Item</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;