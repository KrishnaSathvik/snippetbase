// Utility functions for search operations

export const searchSnippets = (snippets, query) => {
  if (!query || query.trim() === '') return snippets;
  
  const searchTerm = query.toLowerCase().trim();
  
  return snippets.filter(snippet => {
    // Search in title
    if (snippet.title.toLowerCase().includes(searchTerm)) return true;
    
    // Search in tags
    if (snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return true;
    
    // Search in code
    if (snippet.code.toLowerCase().includes(searchTerm)) return true;
    
    // Search in description
    if (snippet.description && snippet.description.toLowerCase().includes(searchTerm)) return true;
    
    // Search in language
    if (snippet.language.toLowerCase().includes(searchTerm)) return true;
    
    return false;
  });
};

export const highlightSearchTerm = (text, query) => {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

export const fuzzyMatch = (str, pattern) => {
  // Simple fuzzy matching algorithm
  pattern = pattern.toLowerCase();
  str = str.toLowerCase();
  
  let patternIdx = 0;
  let strIdx = 0;
  
  while (patternIdx < pattern.length && strIdx < str.length) {
    if (pattern[patternIdx] === str[strIdx]) {
      patternIdx++;
    }
    strIdx++;
  }
  
  return patternIdx === pattern.length;
};
