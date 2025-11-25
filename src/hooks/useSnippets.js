import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useSnippets = () => {
  // Dynamically import seed data to reduce initial bundle size
  const [seedSnippets, setSeedSnippets] = useState([]);
  const [snippets, setSnippets] = useLocalStorage('coderef_snippets', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('mostUsed'); // mostUsed, newest, alphabetical

  // Load seed data asynchronously
  useEffect(() => {
    import('../data/seedSnippets').then(module => {
      const seedData = module.seedSnippets;
      setSeedSnippets(seedData);
    });
  }, []);

  // Sync with seed data on mount - merge seed data with localStorage data
  useEffect(() => {
    if (seedSnippets.length === 0) return; // Wait for seed data to load
    
    // If localStorage is empty or has wrong count, use seed data
    if (!snippets || snippets.length === 0) {
      setSnippets(seedSnippets);
      return;
    }
    
    // If seed data has been updated (different length or IDs), merge them
    // Preserve user data (favorites, timesUsed) from localStorage
    if (seedSnippets.length !== snippets.length) {
      // Create a map of existing snippets by ID to preserve user data
      const existingSnippetsMap = new Map(snippets.map(s => [s.id, s]));
      
      // Merge: use seed data but preserve user modifications from localStorage
      const mergedSnippets = seedSnippets.map(seedSnippet => {
        const existing = existingSnippetsMap.get(seedSnippet.id);
        if (existing) {
          // Preserve user data (favorites, timesUsed) but update other fields from seed
          return {
            ...seedSnippet,
            isFavorite: existing.isFavorite,
            timesUsed: existing.timesUsed || 0
          };
        }
        return seedSnippet;
      });
      
      setSnippets(mergedSnippets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seedSnippets]); // Run when seed data loads

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

  // Increment use count (when copying)
  const incrementUseCount = (id) => {
    setSnippets(snippets.map(snippet =>
      snippet.id === id
        ? { ...snippet, timesUsed: snippet.timesUsed + 1 }
        : snippet
    ));
  };

  // Filter and search snippets
  const getFilteredSnippets = () => {
    let filtered = snippets;

    // Apply language filter
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(s => s.language === selectedLanguage);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(s => {
        // Priority 1: Search in tags
        if (s.tags && Array.isArray(s.tags)) {
          if (s.tags.some(tag => {
            const tagLower = tag.toLowerCase();
            return tagLower === query || tagLower.includes(query);
          })) return true;
        }
        // Priority 2: Search in title
        if (s.title && s.title.toLowerCase().includes(query)) return true;
        // Priority 3: Search in description
        if (s.description && s.description.toLowerCase().includes(query)) return true;
        // Priority 4: Search in code (whole word match only)
        if (s.code) {
          const codeLower = s.code.toLowerCase();
          const wordBoundaryRegex = new RegExp(`\\b${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
          if (wordBoundaryRegex.test(codeLower)) return true;
        }
        return false;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'mostUsed':
        filtered.sort((a, b) => b.timesUsed - a.timesUsed);
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

  return {
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
    stats: getStats(),
    seedSnippets, // Export for detail pages that need fallback
  };
};
