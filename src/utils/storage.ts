import { Item } from '../types';

const STORAGE_KEY = 'lostFoundItems';

export const saveItems = (items: Item[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const loadItems = (): Item[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};