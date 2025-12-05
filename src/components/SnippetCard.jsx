import { useNavigate } from 'react-router-dom';
import { Copy, Star } from 'lucide-react';
import CodeBlock from './CodeBlock';

const SnippetCard = ({ snippet, onCopy, onToggleFavorite }) => {
  const navigate = useNavigate();

  const languageColors = {
    pyspark: '#FF6B6B',
    sql: '#4ECDC4',
    python: '#FFE66D',
    dbt: '#A8E6CF',
    kafka: '#95E1D3',
    databricks: '#F38181',
    airflow: '#FFEAA7',
    dockerfile: '#74B9FF',
    docker: '#74B9FF', // Keep for backward compatibility if any old data exists
  };

  const handleCopy = (e) => {
    e.stopPropagation(); // Prevent navigation when copying
    navigator.clipboard.writeText(snippet.code);
    onCopy(snippet.id);
  };

  const handleCardClick = () => {
    navigate(`/snippet/${snippet.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when toggling favorite
    onToggleFavorite(snippet.id);
  };


  return (
    <div className="neo-box bg-white snippet-card relative cursor-pointer hover:scale-105 transition-transform" onClick={handleCardClick}>
      <div className="p-4 md:p-6">
        {/* Title and Tags */}
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-2xl font-black mb-2 hover:text-[#FF6B6B] break-words">
              {snippet.title}
            </h3>
            <div className="flex gap-1.5 md:gap-2 flex-wrap">
              <span 
                className="tag text-xs md:text-sm" 
                style={{ 
                  background: languageColors[snippet.language] || '#999',
                  color: '#000'
                }}
              >
                {snippet.language.toUpperCase()}
              </span>
              {snippet.tags.map((tag, i) => (
                <span key={i} className="tag bg-white text-xs md:text-sm" style={{ color: '#000' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Favorite Star */}
          <button
            onClick={handleFavoriteClick}
            className={`ml-2 p-1 md:p-2 flex-shrink-0 ${snippet.isFavorite ? 'text-yellow-500' : 'text-gray-300'} hover:scale-110 transition-transform`}
          >
            <Star fill={snippet.isFavorite ? 'currentColor' : 'none'} size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Code Preview */}
        <div className="mb-3 md:mb-4">
          <CodeBlock 
            code={snippet.code} 
            language={snippet.language}
            showLineNumbers={false}
            showSectionCopy={false}
            isPreview={true}
          />
        </div>

        {/* Description */}
        {snippet.description && (
          <p className="text-xs md:text-sm font-medium text-gray-600 mb-3 md:mb-4 line-clamp-2">
            {snippet.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleCopy}
            className="neo-button bg-[#4ECDC4] text-black px-3 py-1.5 md:px-6 md:py-2 font-bold text-xs md:text-sm flex items-center gap-1 md:gap-2 whitespace-nowrap"
          >
            <Copy size={14} className="md:w-4 md:h-4" />
            <span className="hidden sm:inline">COPY CODE</span>
            <span className="sm:hidden">COPY</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
