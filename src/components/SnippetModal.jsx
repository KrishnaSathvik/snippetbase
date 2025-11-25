import { useState } from 'react';
import { X, Copy } from 'lucide-react';

const SnippetModal = ({ snippet, onClose, onSave, onCopy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(snippet);

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    onCopy();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="neo-box bg-white p-8 max-w-4xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black">{isEditing ? 'EDIT SNIPPET' : snippet.title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={32} />
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border-4 border-black px-4 py-3 font-bold text-xl"
            />
            
            <textarea
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full border-4 border-black px-4 py-3 font-mono text-sm min-h-[400px]"
            />

            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description..."
              className="w-full border-4 border-black px-4 py-3 font-bold"
            />

            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="neo-button bg-white text-black px-8 py-3 font-bold flex-1"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                className="neo-button bg-[#4ECDC4] text-black px-8 py-3 font-bold flex-1"
              >
                SAVE CHANGES
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <pre className="text-sm max-h-[500px] overflow-auto">
                <code>{snippet.code}</code>
              </pre>
            </div>

            {snippet.description && (
              <p className="font-bold text-gray-700 mb-4">
                {snippet.description}
              </p>
            )}

            <div className="flex gap-2 mb-6">
              <span className="tag bg-[#FF6B6B]">{snippet.language.toUpperCase()}</span>
              {snippet.tags.map((tag, i) => (
                <span key={i} className="tag bg-white">{tag}</span>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCopy}
                className="neo-button bg-[#4ECDC4] text-black px-8 py-3 font-bold flex-1 flex items-center justify-center gap-2"
              >
                <Copy size={20} />
                COPY CODE
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="neo-button bg-white text-black px-8 py-3 font-bold"
              >
                EDIT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SnippetModal;
