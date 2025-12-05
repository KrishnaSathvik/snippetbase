import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSnippets } from '../hooks/useSnippets';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import StatsBar from '../components/StatsBar';
import SnippetGrid from '../components/SnippetGrid';
import Pagination from '../components/Pagination';
import CollectionsList from '../components/CollectionsList';
import Footer from '../components/Footer';

const ITEMS_PER_PAGE = 8;

function Home() {
  const location = useLocation();
  const snippetHook = useSnippets();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCollection, setActiveCollection] = useState(null);

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [snippetHook.searchQuery, snippetHook.selectedLanguage, snippetHook.sortBy, activeCollection]);

  // Scroll to results when search or collection changes (debounced for search)
  useEffect(() => {
    if (activeCollection) {
      // Scroll immediately when collection is clicked
      setTimeout(() => {
        const mainElement = document.getElementById('main-content');
        if (mainElement) {
          mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (snippetHook.searchQuery && snippetHook.searchQuery.trim().length >= 3) {
      // Only scroll if search query is at least 3 characters (debounced)
      const scrollTimeout = setTimeout(() => {
        const mainElement = document.getElementById('main-content');
        if (mainElement) {
          mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500); // Wait 500ms after user stops typing
      
      return () => clearTimeout(scrollTimeout);
    }
  }, [snippetHook.searchQuery, activeCollection]);

  const handleCopy = (snippetId) => {
    snippetHook.incrementUseCount(snippetId);
    toast.success('Copied!');
  };

  const handleCollectionClick = (collection) => {
    // Set active collection
    setActiveCollection(collection);
    
    // Clear search query so collection filtering works properly
    snippetHook.setSearchQuery('');
    snippetHook.setSelectedLanguage('all'); // Show all languages
    // Scroll is handled by useEffect when activeCollection changes
  };

  const clearCollection = () => {
    setActiveCollection(null);
    snippetHook.setSearchQuery('');
    snippetHook.setSelectedLanguage('all');
  };

  // Filter snippets by collection tags
  const getCollectionSnippets = () => {
    if (!activeCollection) return snippetHook.filteredSnippets;
    
    // Start with all snippets (not pre-filtered by search)
    let filtered = snippetHook.snippets;
    
    // Apply language filter first
    if (snippetHook.selectedLanguage !== 'all') {
      filtered = filtered.filter(s => s.language === snippetHook.selectedLanguage);
    }
    
    // Then filter by collection tags
    filtered = filtered.filter(snippet => {
      const snippetTags = snippet.tags?.map(t => t.toLowerCase()) || [];
      return activeCollection.tags.some(tag => 
        snippetTags.includes(tag.toLowerCase()) ||
        snippet.title?.toLowerCase().includes(tag.toLowerCase()) ||
        snippet.description?.toLowerCase().includes(tag.toLowerCase())
      );
    });
    
    // Apply search query if any (for additional filtering within collection)
    if (snippetHook.searchQuery) {
      const query = snippetHook.searchQuery.toLowerCase().trim();
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
    switch (snippetHook.sortBy) {
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

  const displaySnippets = getCollectionSnippets();

  // Calculate pagination
  const totalSnippets = displaySnippets.length;
  const totalPages = Math.ceil(totalSnippets / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSnippets = displaySnippets.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <Header />
      
      <Hero 
        searchQuery={snippetHook.searchQuery}
        setSearchQuery={(query) => {
          // Clear collection when user manually changes search
          if (activeCollection && query !== snippetHook.searchQuery) {
            setActiveCollection(null);
          }
          snippetHook.setSearchQuery(query);
        }}
      />
      
      <FilterBar
        selectedLanguage={snippetHook.selectedLanguage}
        setSelectedLanguage={snippetHook.setSelectedLanguage}
        languageCounts={snippetHook.languageCounts}
      />
      
      <StatsBar stats={snippetHook.stats} />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 py-6 md:py-12 overflow-visible">
        <div className="flex items-center justify-between mb-6 md:mb-8 flex-wrap gap-3 md:gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-4xl font-black break-words">
              {activeCollection 
                ? `${activeCollection.emoji} ${activeCollection.title.toUpperCase()}`
                : snippetHook.selectedLanguage === 'all' 
                  ? 'ALL SNIPPETS' 
                  : snippetHook.selectedLanguage.toUpperCase() + ' SNIPPETS'
              }
            </h2>
            {activeCollection && (
              <p className="text-sm md:text-lg font-bold text-gray-600 mt-1 md:mt-2">
                {activeCollection.description} • {totalSnippets} snippets
              </p>
            )}
            {!activeCollection && snippetHook.searchQuery && (
              <p className="text-sm md:text-lg font-bold text-gray-600 mt-1 md:mt-2">
                Searching for: <span className="text-black">"{snippetHook.searchQuery}"</span> • {totalSnippets} snippets found
              </p>
            )}
          </div>
          <div className="flex gap-2 md:gap-4 flex-shrink-0">
            {activeCollection && (
              <button
                onClick={clearCollection}
                className="neo-button bg-red-500 text-white px-3 py-1.5 md:px-6 md:py-2 font-bold text-xs md:text-base hover:scale-105 transition-transform whitespace-nowrap"
              >
                CLEAR
              </button>
            )}
            <select
              value={snippetHook.sortBy}
              onChange={(e) => snippetHook.setSortBy(e.target.value)}
              className="neo-box bg-white px-2 py-1.5 md:px-4 md:py-2 font-bold text-xs md:text-base"
            >
              <option value="mostUsed">MOST USED</option>
              <option value="newest">NEWEST</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>

        <SnippetGrid
          snippets={paginatedSnippets}
          onCopy={handleCopy}
          onToggleFavorite={snippetHook.toggleFavorite}
        />

        {totalSnippets > 0 && (
          <>
            <div className="text-center text-sm font-bold text-gray-600 mt-4">
              Showing {startIndex + 1}-{Math.min(endIndex, totalSnippets)} of {totalSnippets} snippets
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

        {displaySnippets.length === 0 && (
          <div className="text-center py-10 md:py-20">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">🔍</div>
            <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4">NO SNIPPETS FOUND</h3>
            <p className="text-base md:text-xl font-bold text-gray-600 mb-4 md:mb-6 px-4">
              {activeCollection 
                ? `No snippets found in "${activeCollection.title}" collection`
                : 'Try a different search or filter'
              }
            </p>
            <button
              onClick={() => {
                snippetHook.setSearchQuery('');
                snippetHook.setSelectedLanguage('all');
                setActiveCollection(null);
              }}
              className="neo-button bg-black text-white px-6 py-2 md:px-8 md:py-3 font-bold text-sm md:text-base"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        )}
      </main>

      <CollectionsList onCollectionClick={handleCollectionClick} />
      
      <Footer />
    </div>
  );
}

export default Home;

