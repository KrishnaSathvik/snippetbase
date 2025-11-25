import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCategories } from '../data/cheatSheets';
import { useCheatSheets } from '../hooks/useCheatSheets';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';

const ITEMS_PER_PAGE = 8;

const CheatSheetsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cheatSheetsHook = useCheatSheets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = getCategories();

  // Track previous values to detect actual changes
  const prevSearchQuery = useRef(searchQuery);
  const prevSelectedCategory = useRef(selectedCategory);
  const isInitialMount = useRef(true);

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    // On initial mount/refresh, scroll instantly to top
    // Use multiple attempts to ensure it works
    window.scrollTo({ top: 0, behavior: 'auto' });
    const timeout1 = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);
    const timeout2 = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 10);
    const timeout3 = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 50);
    
    isInitialMount.current = true;
    prevSearchQuery.current = searchQuery;
    prevSelectedCategory.current = selectedCategory;
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Scroll to results when filters or search change (but not on initial mount or route change)
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevSearchQuery.current = searchQuery;
      prevSelectedCategory.current = selectedCategory;
      return;
    }

    // Only scroll if values actually changed
    const searchChanged = prevSearchQuery.current !== searchQuery;
    const categoryChanged = prevSelectedCategory.current !== selectedCategory;
    
    if (searchChanged || categoryChanged) {
      prevSearchQuery.current = searchQuery;
      prevSelectedCategory.current = selectedCategory;
      
      const scrollTimeout = setTimeout(() => {
        const mainElement = document.getElementById('cheat-sheets-content');
        if (mainElement) {
          mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      
      return () => clearTimeout(scrollTimeout);
    }
  }, [searchQuery, selectedCategory]);

  // Filter cheat sheets
  const filteredSheets = cheatSheetsHook.cheatSheets.filter(sheet => {
    const matchesSearch = sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sheet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sheet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || sheet.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalSheets = filteredSheets.length;
  const totalPages = Math.ceil(totalSheets / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSheets = filteredSheets.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <Header />
      {/* Hero Section */}
      <section className="py-6 md:py-12 px-4 border-b-4 md:border-b-8 border-black bg-gradient-to-br from-[#FFE66D] to-[#FFB6B6]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 md:mb-4">
            <span className="bg-black text-white px-2 py-1 md:px-4 md:py-2 inline-block text-2xl sm:text-3xl md:text-5xl lg:text-7xl">CHEAT SHEETS</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-8">
            Quick reference guides for data engineering, ML, and AI
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cheat sheets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full neo-box px-3 py-2.5 md:px-6 md:py-4 text-sm md:text-xl font-bold bg-white pr-12 md:pr-16"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black font-bold text-xl md:text-2xl"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b-2 md:border-b-4 border-black py-3 md:py-6 px-2 md:px-4 sticky top-[60px] md:top-[88px] z-40 overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center min-w-max md:min-w-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className="tag hover:scale-110 transition-transform text-xs md:text-sm whitespace-nowrap"
              style={{
                backgroundColor: selectedCategory === 'all' ? '#000' : 'white',
                color: selectedCategory === 'all' ? '#fff' : '#000',
              }}
            >
              ALL ({cheatSheetsHook.cheatSheets.length})
            </button>
            {categories.map(category => {
              const count = cheatSheetsHook.cheatSheets.filter(s => s.category === category).length;
              // Get category color (you might want to define this in a mapping)
              const categoryColors = {
                'pyspark': '#FF6B6B',
                'sql': '#4ECDC4',
                'python': '#FFE66D',
                'dbt': '#A8E6CF',
                'kafka': '#95E1D3',
                'databricks': '#F38181',
                'airflow': '#FFEAA7',
                'dockerfile': '#74B9FF',
                'git': '#F38181',
                'docker': '#74B9FF',
                'pandas': '#FFE66D',
                'regex': '#FF6B6B',
                'linux': '#4ECDC4',
                'numpy': '#FFE66D',
                'vscode': '#95E1D3',
                'http': '#A8E6CF',
                'yaml': '#FFEAA7',
                'bash': '#4ECDC4',
                'mongodb': '#95E1D3',
                'api': '#FF6B6B',
                'css': '#A8E6CF',
                'markdown': '#F38181',
              };
              const categoryColor = categoryColors[category.toLowerCase()] || '#000';
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="tag hover:scale-110 transition-transform text-xs md:text-sm whitespace-nowrap"
                  style={{
                    backgroundColor: selectedCategory === category ? categoryColor : 'white',
                    color: selectedCategory === category ? '#000' : '#000',
                  }}
                >
                  {category.toUpperCase()} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#FFE66D] border-b-8 border-black py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 flex-wrap text-center">
          <div>
            <div className="text-3xl font-black">{filteredSheets.length}</div>
            <div className="text-sm font-bold">CHEAT SHEETS</div>
          </div>
          <div>
            <div className="text-3xl font-black">{categories.length}</div>
            <div className="text-sm font-bold">CATEGORIES</div>
          </div>
        </div>
      </section>

      {/* Cheat Sheets Grid */}
      <main id="cheat-sheets-content" className="max-w-7xl mx-auto px-4 py-12">
        {filteredSheets.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-3xl font-black mb-4">NO CHEAT SHEETS FOUND</h3>
            <p className="text-xl font-bold text-gray-600">
              Try a different search or category
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedSheets.map(sheet => (
              <div
                key={sheet.id}
                className="neo-box bg-white p-6 cursor-pointer hover:-rotate-1 transition-transform"
                style={{ borderColor: sheet.color }}
                onClick={() => navigate(`/cheat-sheet/${sheet.id}`)}
              >
                <div className="flex items-start justify-end mb-4">
                  <div className="text-sm font-bold px-3 py-1 bg-black text-white">
                    {sheet.category.toUpperCase()}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black mb-2">{sheet.title}</h3>
                <p className="font-bold text-gray-700 mb-4">{sheet.description}</p>
                
                <div className="flex gap-2 flex-wrap mb-4">
                  {sheet.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs font-bold px-2 py-1 bg-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cheat-sheet/${sheet.id}`);
                  }}
                  className="neo-button bg-black text-white px-6 py-2 font-bold w-full mt-4"
                  style={{ backgroundColor: sheet.color, color: 'black' }}
                >
                  VIEW CHEAT SHEET
                </button>
              </div>
              ))}
            </div>

            {totalSheets > 0 && (
              <>
                <div className="text-center text-sm font-bold text-gray-600 mt-4">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalSheets)} of {totalSheets} cheat sheets
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheatSheetsPage;

