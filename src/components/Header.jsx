import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Download, Upload } from 'lucide-react';
import { useSnippets } from '../hooks/useSnippets';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const snippetHook = useSnippets();
  const [isImporting, setIsImporting] = useState(false);
  
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

  const handleExport = () => {
    try {
      const exportData = {
        snippets: snippetHook.snippets,
        exportedAt: new Date().toISOString(),
        version: '1.0',
        totalSnippets: snippetHook.snippets.length
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `snippets_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Exported ${snippetHook.snippets.length} snippets!`);
    } catch (error) {
      toast.error('Failed to export snippets');
      console.error('Export error:', error);
    }
  };

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      setIsImporting(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importData = JSON.parse(event.target.result);
          
          // Validate structure
          if (!importData.snippets || !Array.isArray(importData.snippets)) {
            throw new Error('Invalid file format: missing snippets array');
          }
          
          // Validate each snippet has required fields
          const invalidSnippets = importData.snippets.filter(s => 
            !s.id || !s.title || !s.code || !s.language
          );
          
          if (invalidSnippets.length > 0) {
            throw new Error(`Invalid file format: ${invalidSnippets.length} snippets missing required fields`);
          }
          
          // Show merge/replace modal
          const shouldMerge = window.confirm(
            `Import ${importData.snippets.length} snippets?\n\n` +
            `Click OK to MERGE (keep existing + add new)\n` +
            `Click Cancel to REPLACE (delete all existing)`
          );
          
          if (shouldMerge) {
            // Merge: combine arrays, handle duplicates by ID
            const existingIds = new Set(snippetHook.snippets.map(s => s.id));
            const newSnippets = importData.snippets.filter(s => !existingIds.has(s.id));
            const updatedSnippets = [...snippetHook.snippets, ...newSnippets];
            snippetHook.setSnippets(updatedSnippets);
            toast.success(`Merged ${newSnippets.length} new snippets!`);
          } else {
            // Replace: clear and set new data
            snippetHook.setSnippets(importData.snippets);
            toast.success(`Replaced with ${importData.snippets.length} snippets!`);
          }
        } catch (error) {
          toast.error(`Import failed: ${error.message}`);
          console.error('Import error:', error);
        } finally {
          setIsImporting(false);
        }
      };
      reader.onerror = () => {
        toast.error('Failed to read file');
        setIsImporting(false);
      };
      reader.readAsText(file);
    };
    input.click();
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
          <nav className="flex items-center gap-2 md:gap-3">
            {location.pathname !== '/' && (
              <>
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
              </>
            )}
            <div className="flex items-center gap-2 md:gap-3 border-l-2 border-white/20 pl-2 md:pl-3 ml-2 md:ml-3">
              <button
                onClick={handleExport}
                className="px-2 py-1.5 md:px-3 md:py-2 font-bold text-xs md:text-sm hover:bg-white hover:text-black transition-colors flex items-center gap-1.5"
                title="Export snippets"
              >
                <Download size={16} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">EXPORT</span>
              </button>
              <button
                onClick={handleImportClick}
                disabled={isImporting}
                className="px-2 py-1.5 md:px-3 md:py-2 font-bold text-xs md:text-sm hover:bg-white hover:text-black transition-colors flex items-center gap-1.5 disabled:opacity-50"
                title="Import snippets"
              >
                <Upload size={16} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">IMPORT</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
