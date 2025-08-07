export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  location: string;
  dateReported: string;
  dateOccurred: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  imageUrl?: string;
  status: 'active' | 'resolved' | 'expired';
  tags: string[];
  reward?: number;
  matches?: string[];
}

export interface MatchResult {
  item1: Item;
  item2: Item;
  matchScore: number;
  matchReasons: string[];
}

export type CategoryType = 
  | 'electronics'
  | 'jewelry'
  | 'clothing'
  | 'bags'
  | 'keys'
  | 'documents'
  | 'pets'
  | 'books'
  | 'sports'
  | 'other';

export interface FilterOptions {
  category: CategoryType | 'all';
  location: string;
  dateRange: 'today' | 'week' | 'month' | 'all';
  type: 'all' | 'lost' | 'found';
  searchTerm: string;
}