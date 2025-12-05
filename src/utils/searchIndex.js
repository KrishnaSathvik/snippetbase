import MiniSearch from 'minisearch';

// Synonym map for search expansion
const SYNONYMS = {
  'py': 'python',
  'pyth': 'python',
  'k8s': 'kubernetes',
  'js': 'javascript',
  'ts': 'typescript',
  'sql': 'sql',
  'db': 'database',
  'df': 'dataframe',
  'spark': 'pyspark',
};

// Expand search query with synonyms
export const expandQuery = (query) => {
  const lowerQuery = query.toLowerCase().trim();
  const words = lowerQuery.split(/\s+/);
  
  const expandedWords = words.map(word => {
    // Check if word is a synonym
    if (SYNONYMS[word]) {
      return `${word} ${SYNONYMS[word]}`;
    }
    // Check if any synonym maps to this word
    const reverseMatch = Object.entries(SYNONYMS).find(([key, value]) => value === word);
    if (reverseMatch) {
      return `${word} ${reverseMatch[0]}`;
    }
    return word;
  });
  
  return expandedWords.join(' ');
};

// Create and configure MiniSearch instance
export const createSearchIndex = (snippets) => {
  const miniSearch = new MiniSearch({
    fields: ['title', 'tags', 'description', 'code', 'language'],
    storeFields: ['id', 'title', 'tags', 'description', 'code', 'language', 'isFavorite', 'timesUsed', 'viewCount', 'createdAt'],
    searchOptions: {
      boost: { title: 3, tags: 2, description: 1.5, code: 1, language: 1 },
      fuzzy: 0.2, // 20% typo tolerance
      prefix: true, // Enable prefix matching
    },
  });

  // Index all snippets
  miniSearch.addAll(snippets);
  
  return miniSearch;
};

// Search with expanded query
export const search = (searchIndex, query) => {
  if (!query || !query.trim()) {
    return [];
  }
  
  const expandedQuery = expandQuery(query);
  const results = searchIndex.search(expandedQuery);
  
  // Return results with relevance scores
  return results.map(result => ({
    ...result,
    score: result.score,
  }));
};

