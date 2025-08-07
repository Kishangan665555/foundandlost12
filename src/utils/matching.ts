import { Item, MatchResult } from '../types';

export const calculateMatchScore = (lostItem: Item, foundItem: Item): number => {
  let score = 0;
  
  // Category match (high weight)
  if (lostItem.category === foundItem.category) {
    score += 40;
  }
  
  // Location proximity (high weight)
  if (lostItem.location.toLowerCase().includes(foundItem.location.toLowerCase()) ||
      foundItem.location.toLowerCase().includes(lostItem.location.toLowerCase())) {
    score += 30;
  }
  
  // Date proximity (medium weight)
  const lostDate = new Date(lostItem.dateOccurred);
  const foundDate = new Date(foundItem.dateOccurred);
  const daysDiff = Math.abs((lostDate.getTime() - foundDate.getTime()) / (1000 * 3600 * 24));
  
  if (daysDiff <= 1) score += 20;
  else if (daysDiff <= 3) score += 15;
  else if (daysDiff <= 7) score += 10;
  else if (daysDiff <= 14) score += 5;
  
  // Description similarity (medium weight)
  const lostWords = lostItem.description.toLowerCase().split(/\s+/);
  const foundWords = foundItem.description.toLowerCase().split(/\s+/);
  const commonWords = lostWords.filter(word => 
    word.length > 3 && foundWords.includes(word)
  );
  score += Math.min(commonWords.length * 2, 10);
  
  return score;
};

export const findMatches = (items: Item[]): MatchResult[] => {
  const matches: MatchResult[] = [];
  const lostItems = items.filter(item => item.type === 'lost' && item.status === 'active');
  const foundItems = items.filter(item => item.type === 'found' && item.status === 'active');
  
  lostItems.forEach(lostItem => {
    foundItems.forEach(foundItem => {
      const score = calculateMatchScore(lostItem, foundItem);
      if (score >= 30) { // Minimum threshold for potential matches
        const matchReasons: string[] = [];
        
        if (lostItem.category === foundItem.category) {
          matchReasons.push(`Same category: ${lostItem.category}`);
        }
        
        if (lostItem.location.toLowerCase().includes(foundItem.location.toLowerCase()) ||
            foundItem.location.toLowerCase().includes(lostItem.location.toLowerCase())) {
          matchReasons.push('Similar locations');
        }
        
        const daysDiff = Math.abs((new Date(lostItem.dateOccurred).getTime() - 
                                 new Date(foundItem.dateOccurred).getTime()) / (1000 * 3600 * 24));
        if (daysDiff <= 7) {
          matchReasons.push(`Timeline match (${Math.round(daysDiff)} days apart)`);
        }
        
        matches.push({
          item1: lostItem,
          item2: foundItem,
          matchScore: score,
          matchReasons
        });
      }
    });
  });
  
  return matches.sort((a, b) => b.matchScore - a.matchScore);
};