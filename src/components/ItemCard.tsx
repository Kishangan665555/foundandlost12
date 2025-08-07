import React from 'react';
import { MapPin, Calendar, Tag, DollarSign, Phone, Mail } from 'lucide-react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onContact: (item: Item) => void;
  showMatchBadge?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onContact, showMatchBadge }) => {
  const isLost = item.type === 'lost';
  const categoryColors = {
    electronics: 'bg-blue-100 text-blue-800',
    jewelry: 'bg-purple-100 text-purple-800',
    clothing: 'bg-green-100 text-green-800',
    bags: 'bg-yellow-100 text-yellow-800',
    keys: 'bg-red-100 text-red-800',
    documents: 'bg-gray-100 text-gray-800',
    pets: 'bg-pink-100 text-pink-800',
    books: 'bg-indigo-100 text-indigo-800',
    sports: 'bg-orange-100 text-orange-800',
    other: 'bg-teal-100 text-teal-800'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:transform hover:scale-105">
      {showMatchBadge && (
        <div className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-t-lg">
          ✨ Potential Match
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              isLost ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {isLost ? 'LOST' : 'FOUND'}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              categoryColors[item.category as keyof typeof categoryColors]
            }`}>
              {item.category}
            </span>
          </div>
          
          {item.reward && item.type === 'lost' && (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <DollarSign className="w-4 h-4 mr-1" />
              {item.reward} reward
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {item.location}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {isLost ? 'Lost on' : 'Found on'} {formatDate(item.dateOccurred)}
          </div>
        </div>
        
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Reported by {item.contactName}
          </div>
          <button
            onClick={() => onContact(item)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isLost
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;