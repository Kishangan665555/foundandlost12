import React from 'react';
import { X, Phone, Mail, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Item } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  const isLost = item.type === 'lost';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className={`px-6 py-4 ${isLost ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-green-500 to-teal-500'}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Contact Information</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  isLost ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {isLost ? 'LOST' : 'FOUND'}
                </span>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>{isLost ? 'Lost' : 'Found'} on {new Date(item.dateOccurred).toLocaleDateString()}</span>
              </div>
              {item.reward && (
                <div className="flex items-center text-green-600">
                  <DollarSign className="w-5 h-5 mr-3" />
                  <span>${item.reward} reward offered</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h5 className="font-semibold text-gray-900 mb-3">Contact Details</h5>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{item.contactName}</p>
                    <a 
                      href={`mailto:${item.contactEmail}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {item.contactEmail}
                    </a>
                  </div>
                </div>
                
                {item.contactPhone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-gray-400" />
                    <a 
                      href={`tel:${item.contactPhone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {item.contactPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <a
                  href={`mailto:${item.contactEmail}?subject=${encodeURIComponent(`Re: ${item.type === 'lost' ? 'Lost' : 'Found'} - ${item.title}`)}&body=${encodeURIComponent(`Hi ${item.contactName},\n\nI saw your ${item.type} item report for "${item.title}" and I might have information that could help.\n\nBest regards`)}`}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                    isLost ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </a>
                
                {item.contactPhone && (
                  <a
                    href={`tel:${item.contactPhone}`}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> When contacting, please provide specific details about the item to verify it's truly theirs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;