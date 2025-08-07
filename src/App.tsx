import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ItemCard from './components/ItemCard';
import AddItemModal from './components/AddItemModal';
import MatchesModal from './components/MatchesModal';
import ContactModal from './components/ContactModal';
import StatsModal from './components/StatsModal';
import { Item, FilterOptions } from './types';
import { saveItems, loadItems } from './utils/storage';
import { findMatches } from './utils/matching';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    location: '',
    dateRange: 'all',
    type: 'all',
    searchTerm: ''
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMatchesModal, setShowMatchesModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Load items on mount
  useEffect(() => {
    const savedItems = loadItems();
    setItems(savedItems);
  }, []);

  // Save items whenever items change
  useEffect(() => {
    saveItems(items);
  }, [items]);

  const handleAddItem = (item: Item) => {
    setItems(prev => [item, ...prev]);
  };

  const handleContact = (item: Item) => {
    setSelectedItem(item);
    setShowContactModal(true);
  };

  // Calculate matches
  const matches = useMemo(() => findMatches(items), [items]);

  // Filter items based on current filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      // Type filter
      if (filters.type !== 'all' && item.type !== filters.type) {
        return false;
      }

      // Location filter
      if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        const searchableText = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange !== 'all') {
        const itemDate = new Date(item.dateOccurred);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 3600 * 24));

        switch (filters.dateRange) {
          case 'today':
            if (daysDiff > 0) return false;
            break;
          case 'week':
            if (daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff > 30) return false;
            break;
        }
      }

      return true;
    });
  }, [items, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header
        onAddItem={() => setShowAddModal(true)}
        onShowMatches={() => setShowMatchesModal(true)}
        onShowStats={() => setShowStatsModal(true)}
        matchCount={matches.length}
      />
      
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lost Something? Found Something?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent matching system helps reunite people with their belongings. 
            Report lost or found items and let our AI find potential matches in real-time.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{items.length}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-red-600">
              {items.filter(item => item.type === 'lost').length}
            </div>
            <div className="text-sm text-gray-600">Lost Items</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">
              {items.filter(item => item.type === 'found').length}
            </div>
            <div className="text-sm text-gray-600">Found Items</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">{matches.length}</div>
            <div className="text-sm text-gray-600">Active Matches</div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500 mb-6">
              {items.length === 0 
                ? "Be the first to report a lost or found item!" 
                : "Try adjusting your filters or search terms."}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Report an Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onContact={handleContact}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <AddItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddItem={handleAddItem}
      />
      
      <MatchesModal
        isOpen={showMatchesModal}
        onClose={() => setShowMatchesModal(false)}
        matches={matches}
        onContact={(itemId) => {
          const item = items.find(i => i.id === itemId);
          if (item) handleContact(item);
        }}
      />
      
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        item={selectedItem}
      />
      
      <StatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        items={items}
      />
    </div>
  );
}

export default App;