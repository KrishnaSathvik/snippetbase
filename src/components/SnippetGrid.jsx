import SnippetCard from './SnippetCard';

const SnippetGrid = ({ snippets, onCopy, onToggleFavorite }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 pb-4 md:pb-8 overflow-visible">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="overflow-visible">
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
