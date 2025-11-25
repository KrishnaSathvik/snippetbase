import { useParams, useNavigate } from 'react-router-dom';
import { useCheatSheets } from '../hooks/useCheatSheets';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import CodeBlock from '../components/CodeBlock';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CopiedNotification from '../components/CopiedNotification';

const CheatSheetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cheatSheetsHook = useCheatSheets();
  const [showCopiedNotification, setShowCopiedNotification] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Find the cheat sheet by ID - check both localStorage cheat sheets and seed data as fallback
  const sheet = cheatSheetsHook.cheatSheets.find(s => s.id === id) || 
                (cheatSheetsHook.seedCheatSheets || []).find(s => s.id === id);

  if (!sheet) {
    return (
      <div className="min-h-screen bg-[#FAFAF5]">
        <Header />
        <div className="flex items-center justify-center px-4 min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-black mb-4">CHEAT SHEET NOT FOUND</h1>
            <button
              onClick={() => navigate('/cheat-sheets')}
              className="neo-button bg-black text-white px-6 py-2 md:px-8 md:py-3 font-bold text-sm md:text-base"
            >
              GO BACK TO CHEAT SHEETS
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Parse content to extract code blocks and text
  const parseContent = (content) => {
    const parts = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const text = content.substring(lastIndex, match.index).trim();
        if (text) {
          parts.push({ type: 'text', content: text });
        }
      }

      // Add code block
      const language = match[1] || 'text';
      const code = match[2].trim();
      parts.push({ type: 'code', language, code });

      lastIndex = codeBlockRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const text = content.substring(lastIndex).trim();
      if (text) {
        parts.push({ type: 'text', content: text });
      }
    }

    // If no code blocks found, return entire content as text
    if (parts.length === 0) {
      return [{ type: 'text', content: content.trim() }];
    }

    return parts;
  };

  const categoryColors = {
    pyspark: '#FF6B6B',
    sql: '#4ECDC4',
    python: '#FFE66D',
    dbt: '#A8E6CF',
    kafka: '#95E1D3',
    databricks: '#F38181',
    airflow: '#FFEAA7',
    dockerfile: '#74B9FF',
    git: '#F38181',
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/cheat-sheets')}
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
              <h1 className="text-2xl md:text-4xl font-black mb-3 md:mb-4 break-words">{sheet.title}</h1>
              <div className="flex gap-1.5 md:gap-2 flex-wrap mb-3 md:mb-4">
                <span 
                  className="tag text-xs md:text-sm" 
                  style={{ 
                    background: categoryColors[sheet.category] || '#999',
                    color: '#000'
                  }}
                >
                  {sheet.category.toUpperCase()}
                </span>
                {sheet.tags.map((tag, i) => (
                  <span key={i} className="tag bg-white text-xs md:text-sm" style={{ color: '#000' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          {sheet.description && (
            <p className="text-base md:text-lg font-bold text-gray-700 mb-4 md:mb-6">
              {sheet.description}
            </p>
          )}

          {/* Content with Code Blocks */}
          <div className="space-y-6">
            {parseContent(sheet.content).map((part, index) => {
              if (part.type === 'code') {
                return (
                  <div key={index} className="mb-6">
                    <CodeBlock
                      code={part.code}
                      language={part.language}
                      showLineNumbers={true}
                      isPreview={false}
                      onCopy={() => {
                        cheatSheetsHook.incrementUseCount(sheet.id);
                        setShowCopiedNotification(true);
                        setTimeout(() => setShowCopiedNotification(false), 1000);
                      }}
                    />
                  </div>
                );
              } else {
                // Render markdown text (simple formatting)
                const lines = part.content.split('\n');
                let isFirstPart = index === 0;
                
                // Filter out the first H1 header in the first text part
                let filteredLines = lines;
                if (isFirstPart) {
                  let firstH1Found = false;
                  filteredLines = lines.filter((line) => {
                    if (!firstH1Found && line.startsWith('# ')) {
                      firstH1Found = true;
                      return false; // Skip the first H1
                    }
                    return true;
                  });
                }
                
                return (
                  <div key={index} className="prose prose-lg max-w-none">
                    {filteredLines.map((line, lineIndex) => {
                      // Skip description if it appears in the first text block
                      if (isFirstPart && !line.startsWith('#') && !line.startsWith('```') && line.trim()) {
                        const trimmedLine = line.trim();
                        const descriptionLower = sheet.description.toLowerCase();
                        const lineLower = trimmedLine.toLowerCase();
                        
                        // Check if the line matches or contains the description
                        if (trimmedLine === sheet.description || 
                            lineLower === descriptionLower ||
                            (lineLower.length > 10 && (lineLower.includes(descriptionLower) || descriptionLower.includes(lineLower)))) {
                          return null; // Skip description line
                        }
                      }
                      
                      // Handle headers
                      if (line.startsWith('# ')) {
                        return <h1 key={lineIndex} className="text-3xl font-black mb-4 mt-6">{line.substring(2)}</h1>;
                      }
                      if (line.startsWith('## ')) {
                        return <h2 key={lineIndex} className="text-2xl font-black mb-3 mt-5">{line.substring(3)}</h2>;
                      }
                      if (line.startsWith('### ')) {
                        return <h3 key={lineIndex} className="text-xl font-black mb-2 mt-4">{line.substring(4)}</h3>;
                      }
                      // Handle list items
                      if (line.startsWith('- ')) {
                        return <div key={lineIndex} className="font-bold mb-1 ml-4">• {line.substring(2)}</div>;
                      }
                      // Regular text
                      if (line.trim()) {
                        return <p key={lineIndex} className="font-bold text-gray-800 mb-2">{line}</p>;
                      }
                      return <br key={lineIndex} />;
                    })}
                  </div>
                );
              }
            })}
          </div>

        </div>
      </div>

      {/* Copied Notification */}
      {showCopiedNotification && <CopiedNotification />}
      <Footer />
    </div>
  );
};

export default CheatSheetDetail;

