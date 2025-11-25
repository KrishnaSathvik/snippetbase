// Utility functions for snippet operations

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const getLanguageColor = (language) => {
  const colors = {
    pyspark: '#FF6B6B',
    sql: '#4ECDC4',
    python: '#FFE66D',
    dbt: '#A8E6CF',
    kafka: '#95E1D3',
    databricks: '#F38181',
    airflow: '#FFEAA7',
  };
  return colors[language.toLowerCase()] || '#999';
};

export const truncateCode = (code, maxLength = 300) => {
  if (code.length <= maxLength) return code;
  return code.slice(0, maxLength) + '...';
};

export const sortSnippets = (snippets, sortBy) => {
  const sorted = [...snippets];
  
  switch (sortBy) {
    case 'mostUsed':
      return sorted.sort((a, b) => b.timesUsed - a.timesUsed);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

export const filterSnippetsByLanguage = (snippets, language) => {
  if (language === 'all') return snippets;
  return snippets.filter(s => s.language === language);
};

export const getLanguageCounts = (snippets) => {
  const counts = {};
  snippets.forEach(snippet => {
    counts[snippet.language] = (counts[snippet.language] || 0) + 1;
  });
  return counts;
};
