import React from 'react';
import { X, Heart, Star, MapPin, Calendar, Phone, Mail } from 'lucide-react';
import { MatchResult } from '../types';

interface MatchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  matches: MatchResult[];
  onContact: (itemId: string) => void;
}

const MatchesModal: React.FC<MatchesModalProps> = ({ isOpen, onClose, matches, onContact }) => {
  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    return 'Possible Match';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Potential Matches</h3>
                  <p className="text-green-100 text-sm">{matches.length} matches found</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {matches.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No matches yet</h3>
                <p className="text-gray-500">Check back later as new items are reported!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {matches.map((match, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(match.matchScore)}`}>
                          <Star className="w-4 h-4 inline mr-1" />
                          {match.matchScore}% - {getScoreLabel(match.matchScore)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Match Confidence: {match.matchScore}%
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Lost Item */}
                      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                        <div className="flex items-center mb-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            LOST
                          </span>
                          <span className="ml-2 font-semibold text-gray-900">{match.item1.title}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{match.item1.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            {match.item1.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Lost on {new Date(match.item1.dateOccurred).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-red-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Contact: {match.item1.contactName}</span>
                            <button
                              onClick={() => onContact(match.item1.id)}
                              className="px-4 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                            >
                              Contact Owner
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Found Item */}
                      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                        <div className="flex items-center mb-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            FOUND
                          </span>
                          <span className="ml-2 font-semibold text-gray-900">{match.item2.title}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{match.item2.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            {match.item2.location}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Found on {new Date(match.item2.dateOccurred).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-green-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Contact: {match.item2.contactName}</span>
                            <button
                              onClick={() => onContact(match.item2.id)}
                              className="px-4 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                            >
                              Contact Finder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Match Reasons */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-semibold text-blue-900 mb-2">Why this might be a match:</h4>
                      <ul className="space-y-1">
                        {match.matchReasons.map((reason, reasonIndex) => (
                          <li key={reasonIndex} className="text-sm text-blue-700 flex items-center">
                            <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesModal;