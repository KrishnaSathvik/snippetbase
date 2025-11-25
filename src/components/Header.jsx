import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNavClick = (path, e) => {
    e.preventDefault();
    // Scroll to top immediately (before navigation)
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Navigate if not already on that path
    if (location.pathname !== path) {
      navigate(path);
      // Also scroll after a short delay to ensure it happens after page loads
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 150);
    } else {
      // If already on that path, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <header className="bg-black text-white border-b-4 md:border-b-8 border-black py-3 md:py-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-2 md:gap-4">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 md:gap-4"
          >
            <div className="text-2xl md:text-4xl font-black hover:text-[#4ECDC4] transition-colors">
              ⚡ SnippetBase
            </div>
          </Link>
          {location.pathname !== '/' && (
            <nav className="flex items-center gap-3 md:gap-4">
              <button
                onClick={(e) => handleNavClick('/snippets', e)}
                className={`px-3 py-1.5 md:px-4 md:py-2 font-bold text-sm md:text-base transition-colors ${
                  location.pathname === '/snippets' 
                    ? 'bg-[#FF6B6B] text-black' 
                    : 'hover:bg-white hover:text-black'
                }`}
              >
                SNIPPETS
              </button>
              <button
                onClick={(e) => handleNavClick('/cheat-sheets', e)}
                className={`px-3 py-1.5 md:px-4 md:py-2 font-bold text-sm md:text-base transition-colors ${
                  location.pathname === '/cheat-sheets' 
                    ? 'bg-[#FFE66D] text-black' 
                    : 'hover:bg-white hover:text-black'
                }`}
              >
                CHEAT SHEETS
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
