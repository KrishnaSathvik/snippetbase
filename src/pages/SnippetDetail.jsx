import { useParams, useNavigate } from 'react-router-dom';
import { useSnippets } from '../hooks/useSnippets';
import { Star, ArrowLeft } from 'lucide-react';
import { useEffect, useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import CodeBlock from '../components/CodeBlock';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SnippetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const snippetHook = useSnippets();
  
  // Find the snippet by ID - use useMemo to ensure it updates when snippets array changes
  const snippet = useMemo(() => {
    return snippetHook.snippets.find(s => s.id === id) || 
           (snippetHook.seedSnippets || []).find(s => s.id === id);
  }, [snippetHook.snippets, snippetHook.seedSnippets, id]);
  
  // Track current counts to force re-render when they change
  const currentTimesUsed = snippet?.timesUsed || 0;
  const currentViewCount = snippet?.viewCount || 0;
  
  // Force re-render when counts change by updating a state variable
  const [, setUpdateTrigger] = useState(0);
  useEffect(() => {
    setUpdateTrigger(prev => prev + 1);
  }, [currentTimesUsed, currentViewCount]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Track view count when snippet is viewed (after snippet is found)
  useEffect(() => {
    if (snippet && id) {
      snippetHook.incrementViewCount(snippet.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Track view when snippet ID changes

  // Define handleCopy BEFORE early return (Rules of Hooks)
  const handleCopy = useCallback(() => {
    if (snippet) {
      snippetHook.incrementUseCount(snippet.id);
      toast.success('Copied!');
    }
  }, [snippet, snippetHook]);

  // Early return AFTER all hooks
  if (!snippet) {
    return (
      <div className="min-h-screen bg-[#FAFAF5]">
        <Header />
        <div className="flex items-center justify-center px-4 min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-black mb-4">SNIPPET NOT FOUND</h1>
            <button
              onClick={() => navigate('/')}
              className="neo-button bg-black text-white px-6 py-2 md:px-8 md:py-3 font-bold text-sm md:text-base"
            >
              GO BACK HOME
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Constants can be defined after early return (not hooks)
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

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 md:mb-6 neo-button bg-white text-black px-4 py-1.5 md:px-6 md:py-2 font-bold text-sm md:text-base flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <ArrowLeft size={18} className="md:w-5 md:h-5" />
          BACK
        </button>

        {/* Main Content */}
        <div className="neo-box bg-white p-4 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 md:mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-4xl font-black mb-3 md:mb-4 break-words">{snippet.title}</h1>
              <div className="flex gap-1.5 md:gap-2 flex-wrap mb-3 md:mb-4">
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
              onClick={() => snippetHook.toggleFavorite(snippet.id)}
              className={`ml-2 md:ml-4 p-1.5 md:p-2 flex-shrink-0 ${snippet.isFavorite ? 'text-yellow-500' : 'text-gray-300'} hover:scale-110 transition-transform`}
            >
              <Star fill={snippet.isFavorite ? 'currentColor' : 'none'} size={24} className="md:w-8 md:h-8" />
            </button>
          </div>

          {/* Description */}
          {snippet.description && (
            <p className="text-base md:text-lg font-bold text-gray-700 mb-4 md:mb-6">
              {snippet.description}
            </p>
          )}

          {/* Code Block */}
          <div className="mb-4 md:mb-6">
            <CodeBlock 
              code={snippet.code} 
              language={snippet.language}
              showLineNumbers={true}
              isPreview={false}
              onCopy={handleCopy}
            />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SnippetDetail;

