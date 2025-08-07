import React from 'react';
import { X, TrendingUp, Users, CheckCircle, Clock, Award, MapPin } from 'lucide-react';
import { Item } from '../types';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, items }) => {
  if (!isOpen) return null;

  const totalItems = items.length;
  const lostItems = items.filter(item => item.type === 'lost').length;
  const foundItems = items.filter(item => item.type === 'found').length;
  const resolvedItems = items.filter(item => item.status === 'resolved').length;
  const activeItems = items.filter(item => item.status === 'active').length;
  const itemsWithRewards = items.filter(item => item.reward && item.reward > 0).length;
  
  const successRate = totalItems > 0 ? Math.round((resolvedItems / totalItems) * 100) : 0;
  const totalRewardValue = items
    .filter(item => item.reward)
    .reduce((sum, item) => sum + (item.reward || 0), 0);

  // Category distribution
  const categoryStats = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Location stats
  const locationStats = items.reduce((acc, item) => {
    const location = item.location.toLowerCase();
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topLocations = Object.entries(locationStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const recentActivity = items
    .sort((a, b) => new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime())
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-lg font-semibold text-white">System Statistics</h3>
                  <p className="text-purple-100 text-sm">Lost & Found Analytics</p>
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
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">{totalItems}</div>
                <div className="text-sm text-blue-600">Total Items</div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-900">{lostItems}</div>
                <div className="text-sm text-red-600">Lost Items</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">{foundItems}</div>
                <div className="text-sm text-green-600">Found Items</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-900">{successRate}%</div>
                <div className="text-sm text-purple-600">Success Rate</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Status Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Item Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active</span>
                      <span className="font-medium">{activeItems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Resolved</span>
                      <span className="font-medium text-green-600">{resolvedItems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">With Rewards</span>
                      <span className="font-medium text-orange-600">{itemsWithRewards}</span>
                    </div>
                  </div>
                </div>

                {/* Top Categories */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Most Common Categories</h4>
                  <div className="space-y-2">
                    {topCategories.map(([category, count], index) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(count / totalItems) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Reward Statistics */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Reward Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Reward Value</span>
                      <span className="font-bold text-green-600">${totalRewardValue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Items with Rewards</span>
                      <span className="font-medium">{itemsWithRewards}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Reward</span>
                      <span className="font-medium">
                        ${itemsWithRewards > 0 ? Math.round(totalRewardValue / itemsWithRewards) : 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top Locations */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Hot Spots
                  </h4>
                  <div className="space-y-2">
                    {topLocations.map(([location, count], index) => (
                      <div key={location} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize truncate">{location}</span>
                        <span className="font-medium text-red-600">{count} items</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {recentActivity.slice(0, 3).map((item, index) => (
                      <div key={item.id} className="text-sm">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${
                            item.type === 'lost' ? 'bg-red-500' : 'bg-green-500'
                          }`}></span>
                          <span className="text-gray-600 truncate">{item.title}</span>
                        </div>
                        <div className="text-xs text-gray-500 ml-4">
                          {new Date(item.dateReported).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Community Impact:</strong> This system has helped {resolvedItems} people reunite with their lost items, 
                with a total reward pool of ${totalRewardValue} contributing to community engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;