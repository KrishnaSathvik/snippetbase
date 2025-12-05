import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Command } from 'cmdk';
import { useSnippets } from '../hooks/useSnippets';
import { useCheatSheets } from '../hooks/useCheatSheets';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const snippetHook = useSnippets();
  const cheatSheetsHook = useCheatSheets();

  // Toggle with Cmd/Ctrl + K
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (action) => {
    if (action.type === 'navigate') {
      navigate(action.path);
      setOpen(false);
    } else if (action.type === 'snippet') {
      navigate(`/snippet/${action.id}`);
      setOpen(false);
    } else if (action.type === 'cheatsheet') {
      navigate(`/cheat-sheet/${action.id}`);
      setOpen(false);
    }
  };

  // Get recent snippets (most used)
  const recentSnippets = [...snippetHook.snippets]
    .sort((a, b) => (b.timesUsed || 0) - (a.timesUsed || 0))
    .slice(0, 5);

  // Get favorite snippets
  const favoriteSnippets = snippetHook.snippets.filter(s => s.isFavorite);

  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-[20vh]"
          onClick={() => setOpen(false)}
        >
          <div 
            className="neo-box bg-white w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="p-2">
              <Command.Input 
                placeholder="Type a command or search..."
                className="w-full px-4 py-3 text-lg font-bold border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                autoFocus
              />
              <Command.List className="max-h-[400px] overflow-y-auto mt-2">
                <Command.Empty className="px-4 py-8 text-center text-gray-500 font-bold">
                  No results found.
                </Command.Empty>

                {/* Navigation */}
                <Command.Group heading="Navigation">
                  {location.pathname !== '/' && (
                    <Command.Item
                      onSelect={() => handleSelect({ type: 'navigate', path: '/' })}
                      className="px-4 py-2 cursor-pointer hover:bg-[#4ECDC4] font-bold"
                    >
                      🏠 Home
                    </Command.Item>
                  )}
                  {location.pathname !== '/snippets' && (
                    <Command.Item
                      onSelect={() => handleSelect({ type: 'navigate', path: '/snippets' })}
                      className="px-4 py-2 cursor-pointer hover:bg-[#4ECDC4] font-bold"
                    >
                      📝 Snippets
                    </Command.Item>
                  )}
                  {location.pathname !== '/cheat-sheets' && (
                    <Command.Item
                      onSelect={() => handleSelect({ type: 'navigate', path: '/cheat-sheets' })}
                      className="px-4 py-2 cursor-pointer hover:bg-[#4ECDC4] font-bold"
                    >
                      📚 Cheat Sheets
                    </Command.Item>
                  )}
                </Command.Group>

                {/* Favorite Snippets */}
                {favoriteSnippets.length > 0 && (
                  <Command.Group heading="Favorites">
                    {favoriteSnippets.slice(0, 5).map((snippet) => (
                      <Command.Item
                        key={snippet.id}
                        onSelect={() => handleSelect({ type: 'snippet', id: snippet.id })}
                        className="px-4 py-2 cursor-pointer hover:bg-[#4ECDC4] font-bold"
                      >
                        ⭐ {snippet.title}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Recent Snippets */}
                {recentSnippets.length > 0 && (
                  <Command.Group heading="Recent">
                    {recentSnippets.map((snippet) => (
                      <Command.Item
                        key={snippet.id}
                        onSelect={() => handleSelect({ type: 'snippet', id: snippet.id })}
                        className="px-4 py-2 cursor-pointer hover:bg-[#4ECDC4] font-bold"
                      >
                        🔥 {snippet.title}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* All Snippets (searchable) */}
                <Command.Group heading="All Snippets">
                  {snippetHook.filteredSnippets.slice(0, 10).map((snippet) => (
                    <Command.Item
                      key={snippet.id}
                      keywords={[snippet.title, ...(snippet.tags || []), snippet.language, snippet.description || '']}
                      onSelect={() => handleSelect({ type: 'snippet', id: snippet.id })}
                      className="px-4 py-2 cursor-pointer hover:bg-[#4ECDC4] font-bold"
                    >
                      {snippet.title}
                      <span className="ml-2 text-xs text-gray-500">
                        {snippet.language.toUpperCase()}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Cheat Sheets */}
                {cheatSheetsHook.cheatSheets.length > 0 && (
                  <Command.Group heading="Cheat Sheets">
                    {cheatSheetsHook.cheatSheets.slice(0, 5).map((sheet) => (
                      <Command.Item
                        key={sheet.id}
                        onSelect={() => handleSelect({ type: 'cheatsheet', id: sheet.id })}
                        className="px-4 py-2 cursor-pointer hover:bg-[#4ECDC4] font-bold"
                      >
                        📚 {sheet.title}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandPalette;

