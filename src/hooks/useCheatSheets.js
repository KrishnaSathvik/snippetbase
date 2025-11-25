import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useCheatSheets = () => {
  // Dynamically import seed data to reduce initial bundle size
  const [seedCheatSheets, setSeedCheatSheets] = useState([]);
  const [cheatSheets, setCheatSheets] = useLocalStorage('coderef_cheat_sheets', []);

  // Load seed data asynchronously
  useEffect(() => {
    import('../data/cheatSheets').then(module => {
      const seedData = module.cheatSheets;
      setSeedCheatSheets(seedData);
    });
  }, []);

  // Sync with seed data on mount - merge seed data with localStorage data
  useEffect(() => {
    if (seedCheatSheets.length === 0) return; // Wait for seed data to load
    
    // If localStorage is empty or has wrong count, use seed data
    if (!cheatSheets || cheatSheets.length === 0) {
      setCheatSheets(seedCheatSheets);
      return;
    }
    
    // If seed data has been updated (different length), merge them
    // Preserve user data (favorites, timesUsed) from localStorage
    if (seedCheatSheets.length !== cheatSheets.length) {
      // Create a map of existing cheat sheets by ID to preserve user data
      const existingSheetsMap = new Map(cheatSheets.map(s => [s.id, s]));
      
      // Merge: use seed data but preserve user modifications from localStorage
      const mergedSheets = seedCheatSheets.map(seedSheet => {
        const existing = existingSheetsMap.get(seedSheet.id);
        if (existing) {
          // Preserve user data (favorites, timesUsed) but update other fields from seed
          return {
            ...seedSheet,
            isFavorite: existing.isFavorite,
            timesUsed: existing.timesUsed || 0
          };
        }
        return seedSheet;
      });
      
      setCheatSheets(mergedSheets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedCheatSheets]); // Run when seed data loads

  // Increment use count (when copying)
  const incrementUseCount = (id) => {
    setCheatSheets(cheatSheets.map(sheet =>
      sheet.id === id
        ? { ...sheet, timesUsed: (sheet.timesUsed || 0) + 1 }
        : sheet
    ));
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    setCheatSheets(cheatSheets.map(sheet =>
      sheet.id === id
        ? { ...sheet, isFavorite: !sheet.isFavorite }
        : sheet
    ));
  };

  // Get stats
  const getStats = () => {
    const totalCopies = cheatSheets.reduce((sum, s) => sum + (s.timesUsed || 0), 0);
    
    return {
      totalSheets: cheatSheets.length,
      totalCopies,
      favoriteCount: cheatSheets.filter(s => s.isFavorite).length,
    };
  };

  return {
    cheatSheets,
    incrementUseCount,
    toggleFavorite,
    stats: getStats(),
    seedCheatSheets, // Export for detail pages that need fallback
  };
};

