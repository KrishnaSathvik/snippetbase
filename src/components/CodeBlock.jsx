import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
// Import languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-javascript';

const CodeBlock = ({ code, language, showLineNumbers = true, isPreview = false, onCopy }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const allButtonRef = useRef(null);

  // Map your language names to Prism language identifiers
  const languageMap = {
    pyspark: 'python',
    python: 'python',
    sql: 'sql',
    dbt: 'sql', // dbt uses SQL
    kafka: 'javascript', // Kafka configs are often JSON/JS-like
    databricks: 'python', // Databricks uses Python
    airflow: 'python', // Airflow uses Python
    dockerfile: 'docker',
    docker: 'docker',
    bash: 'bash',
    shell: 'bash',
    yaml: 'yaml',
    json: 'json',
    javascript: 'javascript',
    js: 'javascript',
  };

  const prismLanguage = languageMap[language?.toLowerCase()] || 'text';

  // Format code (basic beautification)
  const formatCode = (code) => {
    if (!code) return '';
    
    // Remove trailing whitespace from each line
    const lines = code.split('\n');
    const trimmed = lines.map(line => line.trimEnd());
    
    // Remove leading empty lines
    while (trimmed.length > 0 && trimmed[0].trim() === '') {
      trimmed.shift();
    }
    
    // Remove trailing empty lines
    while (trimmed.length > 0 && trimmed[trimmed.length - 1].trim() === '') {
      trimmed.pop();
    }
    
    return trimmed.join('\n');
  };

  const formattedCode = formatCode(code);
  
  // Split code into lines for better alignment control
  const codeLines = formattedCode.split('\n');


  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(formattedCode);
    setCopiedAll(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopiedAll(false), 2000);
  };


  return (
    <div className="relative">
      {/* Copy All Button - positioned at top right */}
      {!isPreview && (
        <button
          ref={allButtonRef}
          onClick={handleCopyAll}
          className="absolute top-2 right-2 z-10 neo-button bg-[#4ECDC4] text-black px-3 py-1.5 md:px-4 md:py-2 font-bold text-xs md:text-sm flex items-center gap-1.5 hover:scale-105 transition-transform"
          title="Copy all code"
        >
          {copiedAll ? (
            <>
              <Check size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">COPIED!</span>
            </>
          ) : (
            <>
              <Copy size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">COPY ALL</span>
            </>
          )}
        </button>
      )}

      {/* Code Block Container */}
      <div className="bg-[#1e1e1e] border-2 md:border-4 border-black rounded overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex items-start">
            {/* Line Numbers */}
            {showLineNumbers && !isPreview && (
              <div 
                className="flex-shrink-0 bg-[#252526] text-gray-500 text-xs md:text-sm font-mono select-none border-r-2 border-black"
                style={{ 
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem'
                }}
              >
                {codeLines.map((_, index) => (
                  <div 
                    key={index} 
                    className="text-right"
                    style={{ 
                      lineHeight: '1.75rem',
                      height: '1.75rem',
                      paddingRight: '0.5rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            )}

            {/* Code Content */}
            <div className="flex-1 relative">
              <div
                className={`text-xs md:text-sm ${isPreview ? 'max-h-32 md:max-h-48 overflow-hidden' : ''}`}
                style={{ 
                  padding: '0.75rem',
                  margin: 0,
                  fontFamily: "'Fira Code', 'Courier New', 'Consolas', 'Monaco', 'Menlo', monospace",
                  fontVariantLigatures: 'none',
                  fontFeatureSettings: 'normal',
                  WebkitFontFeatureSettings: 'normal',
                  MozFontFeatureSettings: 'normal',
                  color: '#e8e8e8'
                }}
              >
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    style={{
                      lineHeight: '1.75rem',
                      height: '1.75rem',
                      boxSizing: 'border-box',
                      whiteSpace: 'pre',
                      overflowX: 'auto'
                    }}
                  >
                    <code
                      className={`language-${prismLanguage}`}
                      style={{ 
                        lineHeight: '1.75rem',
                        display: 'inline',
                        margin: 0,
                        padding: 0,
                        fontFamily: "'Fira Code', 'Courier New', 'Consolas', 'Monaco', 'Menlo', monospace",
                        fontVariantLigatures: 'none',
                        fontFeatureSettings: 'normal',
                        WebkitFontFeatureSettings: 'normal',
                        MozFontFeatureSettings: 'normal',
                        color: '#e8e8e8'
                      }}
                      dangerouslySetInnerHTML={{
                        __html: Prism.highlight(line, Prism.languages[prismLanguage] || Prism.languages.text, prismLanguage)
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Gradient overlay for preview */}
              {isPreview && formattedCode.split('\n').length > 8 && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1e1e1e] to-transparent pointer-events-none"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;

