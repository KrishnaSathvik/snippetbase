import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SnippetCard from './SnippetCard';

const SnippetGrid = ({ snippets, onCopy, onToggleFavorite }) => {
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const cardRefs = useRef([]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (snippets.length === 0) return;

      // Arrow keys: navigate between snippets
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 1, snippets.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
      }
      // Enter: open snippet detail
      else if (e.key === 'Enter' && focusedIndex >= 0 && focusedIndex < snippets.length) {
        e.preventDefault();
        navigate(`/snippet/${snippets[focusedIndex].id}`);
      }
      // C key: copy focused snippet
      else if (e.key === 'c' || e.key === 'C') {
        // Only if not typing in an input/textarea
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          if (focusedIndex >= 0 && focusedIndex < snippets.length) {
            e.preventDefault();
            onCopy(snippets[focusedIndex].id);
          }
        }
      }
      // Esc: clear focus (or close modals - handled by CommandPalette)
      else if (e.key === 'Escape') {
        setFocusedIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [snippets, focusedIndex, navigate, onCopy]);

  // Scroll focused card into view
  useEffect(() => {
    if (cardRefs.current[focusedIndex]) {
      cardRefs.current[focusedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [focusedIndex]);

  // Reset focus when snippets change
  useEffect(() => {
    setFocusedIndex(0);
  }, [snippets.length]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 pb-4 md:pb-8 overflow-visible">
      {snippets.map((snippet, index) => (
        <div
          key={snippet.id}
          ref={(el) => (cardRefs.current[index] = el)}
          className={`overflow-visible transition-transform ${
            index === focusedIndex ? 'ring-4 ring-[#4ECDC4] ring-offset-2' : ''
          }`}
        >
          <SnippetCard
            snippet={snippet}
            onCopy={onCopy}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </div>
  );
};

export default SnippetGrid;
