import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useIndexedDB } from './useIndexedDB';
import { createSearchIndex, search } from '../utils/searchIndex';
import { nanoid } from 'nanoid';

export const useSnippets = () => {
  // Dynamically import seed data to reduce initial bundle size
  const [seedSnippets, setSeedSnippets] = useState([]);
  const [snippets, setSnippets, isLoading] = useIndexedDB('coderef_snippets', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('mostUsed'); // mostUsed, newest, alphabetical
  
  // Track if we've already synced to prevent overwriting user updates
  const hasSyncedRef = useRef(false);

  // Load seed data asynchronously
  useEffect(() => {
    import('../data/seedSnippets').then(module => {
      const seedData = module.seedSnippets;
      setSeedSnippets(seedData);
    });
  }, []);

  // Sync with seed data on mount - merge seed data with IndexedDB data
  // IMPORTANT: Only run once on initial load to prevent overwriting user updates
  useEffect(() => {
    // CRITICAL: Check ref FIRST - if already synced, NEVER run again
    if (hasSyncedRef.current) {
      return; // Already synced, don't run again
    }
    
    // Wait for both seed data and IndexedDB to load
    if (seedSnippets.length === 0 || isLoading) {
      return; // Not ready yet, wait
    }
    
    // If IndexedDB is empty (empty array), initialize with seed data
    if (!snippets || snippets.length === 0) {
      console.log('📦 Initializing IndexedDB with seed data - snippets.length:', snippets?.length, 'seedSnippets.length:', seedSnippets.length);
      // Mark as synced BEFORE setting snippets to prevent re-running
      hasSyncedRef.current = true;
      setSnippets(seedSnippets);
      return;
    }
    
    // Mark as synced IMMEDIATELY before doing anything to prevent re-running
    // This must happen BEFORE any setState calls
    hasSyncedRef.current = true;
    
    // If seed data has been updated (different length), merge them
    // Preserve user data (favorites, timesUsed, viewCount) from IndexedDB
    if (seedSnippets.length !== snippets.length) {
      console.log('🔄 Merging seed data with IndexedDB data');
      // Create a map of existing snippets by ID to preserve user data
      const existingSnippetsMap = new Map(snippets.map(s => [s.id, s]));
      
      // Merge: use seed data but preserve user modifications from IndexedDB
      const mergedSnippets = seedSnippets.map(seedSnippet => {
        const existing = existingSnippetsMap.get(seedSnippet.id);
        if (existing) {
          // Preserve ALL user data (favorites, timesUsed, viewCount) but update other fields from seed
          return {
            ...seedSnippet,
            isFavorite: existing.isFavorite,
            timesUsed: existing.timesUsed || 0, // Preserve user's copy count
            viewCount: existing.viewCount || 0  // Preserve user's view count
          };
        }
        return seedSnippet;
      });
      
      // Also add any user-created snippets that aren't in seed data
      const seedIds = new Set(seedSnippets.map(s => s.id));
      const userSnippets = snippets.filter(s => !seedIds.has(s.id));
      const finalSnippets = [...mergedSnippets, ...userSnippets];
      
      setSnippets(finalSnippets);
    } else {
      // Lengths match, no sync needed
      console.log('✅ Lengths match, no sync needed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedSnippets.length, isLoading, snippets.length]); // Include snippets.length to detect when it changes from empty

  // Add new snippet (uses nanoid for short IDs)
  const addSnippet = (snippetData) => {
    const newSnippet = {
      ...snippetData,
      id: nanoid(), // Short ID instead of UUID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      timesUsed: 0,
      viewCount: 0,
    };
    setSnippets([...snippets, newSnippet]);
    return newSnippet;
  };

  // Update existing snippet
  const updateSnippet = (id, updates) => {
    setSnippets(snippets.map(snippet => 
      snippet.id === id 
        ? { ...snippet, ...updates, updatedAt: new Date().toISOString() }
        : snippet
    ));
  };

  // Delete snippet
  const deleteSnippet = (id) => {
    setSnippets(snippets.filter(snippet => snippet.id !== id));
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    setSnippets(snippets.map(snippet =>
      snippet.id === id
        ? { ...snippet, isFavorite: !snippet.isFavorite }
        : snippet
    ));
  };

  // Increment use count (when copying) - use useCallback to keep function stable
  const incrementUseCount = useCallback((id) => {
    console.log('🔄 incrementUseCount called with ID:', id);
    console.log('🔒 hasSyncedRef.current:', hasSyncedRef.current);
    
    // Mark that we've made user changes to prevent sync from overwriting
    hasSyncedRef.current = true;
    
    // Use functional update to ensure we have the latest state
    setSnippets(prevSnippets => {
      console.log('📦 setSnippets callback - prevSnippets.length:', prevSnippets.length);
      
      // Find the snippet
      const snippetIndex = prevSnippets.findIndex(s => s.id === id);
      console.log('🔍 Snippet found at index:', snippetIndex);
      
      if (snippetIndex >= 0) {
        // Get current value from the actual array
        const currentSnippet = prevSnippets[snippetIndex];
        const currentTimesUsed = currentSnippet.timesUsed || 0;
        const newTimesUsed = currentTimesUsed + 1;
        
        console.log(`🔄 Updating snippet ${currentSnippet.title}: ${currentTimesUsed} → ${newTimesUsed}`);
        
        // Create NEW array with updated snippet
        const updated = prevSnippets.map((snippet, index) => {
          if (index === snippetIndex) {
            return { ...snippet, timesUsed: newTimesUsed };
          }
          return snippet;
        });
        
        const updatedSnippet = updated[snippetIndex];
        console.log('✅ Updated snippet:', updatedSnippet.title, 'timesUsed:', updatedSnippet.timesUsed);
        console.log('💾 Returning new array reference, will save to IndexedDB...');
        console.log('🔍 Array reference changed?', updated !== prevSnippets);
        
        return updated; // Return the new array
      } else {
        // Snippet not found in array, try to find in seedSnippets and add it
        console.log('⚠️ Snippet not found in array, checking seedSnippets...');
        const seedSnippet = seedSnippets.find(s => s.id === id);
        if (seedSnippet) {
          console.log('✅ Found in seedSnippets, adding to array with timesUsed: 1');
          return [...prevSnippets, { ...seedSnippet, timesUsed: 1 }];
        }
        console.log('❌ Snippet not found anywhere!');
        return prevSnippets;
      }
    });
  }, [seedSnippets]); // Only recreate if seedSnippets changes

  // Increment view count (when viewing snippet detail) - use functional update
  const incrementViewCount = useCallback((id) => {
    // Mark that we've made user changes to prevent sync from overwriting
    hasSyncedRef.current = true;
    
    setSnippets(prevSnippets => {
      const snippetIndex = prevSnippets.findIndex(s => s.id === id);
      
      if (snippetIndex >= 0) {
        // Snippet exists, update it
        const currentSnippet = prevSnippets[snippetIndex];
        const newViewCount = (currentSnippet.viewCount || 0) + 1;
        
        return prevSnippets.map((snippet, index) => {
          if (index === snippetIndex) {
            return { ...snippet, viewCount: newViewCount };
          }
          return snippet;
        });
      } else {
        // Snippet not found in array, try to find in seedSnippets and add it
        const seedSnippet = seedSnippets.find(s => s.id === id);
        if (seedSnippet) {
          return [...prevSnippets, { ...seedSnippet, viewCount: 1 }];
        }
        return prevSnippets;
      }
    });
  }, [seedSnippets]);

  // Create search index when snippets change
  const searchIndex = useMemo(() => {
    if (snippets.length === 0) return null;
    return createSearchIndex(snippets);
  }, [snippets]);

  // Filter and search snippets using MiniSearch
  const getFilteredSnippets = () => {
    let filtered = snippets;

    // Apply search query using MiniSearch
    if (searchQuery && searchIndex) {
      const searchResults = search(searchIndex, searchQuery);
      const resultIds = new Set(searchResults.map(r => r.id));
      filtered = filtered.filter(s => resultIds.has(s.id));
      
      // Sort by relevance score if available
      const scoreMap = new Map(searchResults.map(r => [r.id, r.score]));
      filtered.sort((a, b) => (scoreMap.get(b.id) || 0) - (scoreMap.get(a.id) || 0));
    }

    // Apply language filter
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(s => s.language === selectedLanguage);
    }

    // Apply sorting (only if no search query, otherwise use relevance)
    if (!searchQuery) {
      switch (sortBy) {
        case 'mostUsed':
          filtered.sort((a, b) => (b.timesUsed || 0) - (a.timesUsed || 0));
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'alphabetical':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
    }

    return filtered;
  };

  const filteredSnippets = getFilteredSnippets();

  // Calculate language counts
  const languageCounts = snippets.reduce((acc, snippet) => {
    const lang = snippet.language || 'other';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  // Get stats
  const getStats = () => {
    const totalCopies = snippets.reduce((sum, s) => sum + (s.timesUsed || 0), 0);
    
    return {
      totalSnippets: snippets.length,
      totalCopies,
      favoriteCount: snippets.filter(s => s.isFavorite).length,
      languageCounts: languageCounts || {}, // Include languageCounts in stats
    };
  };

  // Memoize the return object to prevent unnecessary re-renders
  // But include snippets in dependencies so it updates when snippets change
  return useMemo(() => ({
    snippets,
    filteredSnippets,
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    sortBy,
    setSortBy,
    languageCounts,
    toggleFavorite,
    incrementUseCount,
    incrementViewCount,
    addSnippet, // Export for adding new snippets (uses nanoid)
    updateSnippet, // Export for updating snippets
    deleteSnippet, // Export for deleting snippets
    stats: getStats(),
    seedSnippets, // Export for detail pages that need fallback
    setSnippets, // Export for import/export functionality
  }), [snippets, filteredSnippets, searchQuery, selectedLanguage, sortBy, languageCounts, seedSnippets]);
};
