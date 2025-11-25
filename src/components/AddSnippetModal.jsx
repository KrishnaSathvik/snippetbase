import { useState } from 'react';
import { X } from 'lucide-react';

const AddSnippetModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    language: 'pyspark',
    code: '',
    description: '',
    tags: [],
    author: 'Chris M.',
  });
  const [tagInput, setTagInput] = useState('');

  const languages = [
    'pyspark', 'sql', 'python', 'dbt', 'kafka', 'databricks', 
    'airflow', 'javascript', 'bash', 'yaml', 'json', 'terraform'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.code) {
      alert('Title and code are required!');
      return;
    }
    onSave(formData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="neo-box bg-white p-8 max-w-3xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-black">ADD NEW SNIPPET</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black"
          >
            <X size={32} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xl font-bold mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., PySpark Window Function - Running Total"
              className="w-full border-4 border-black px-4 py-3 font-bold"
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-xl font-bold mb-2">
              Language *
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full border-4 border-black px-4 py-3 font-bold"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Code */}
          <div>
            <label className="block text-xl font-bold mb-2">
              Code *
            </label>
            <textarea
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Paste your code here..."
              className="w-full border-4 border-black px-4 py-3 font-mono text-sm min-h-[300px]"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xl font-bold mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag..."
                className="flex-1 border-4 border-black px-4 py-2 font-bold"
              />
              <button
                type="button"
                onClick={addTag}
                className="neo-button bg-black text-white px-6 py-2 font-bold"
              >
                + ADD
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, i) => (
                <span
                  key={i}
                  className="tag bg-[#FFE66D] cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ×
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xl font-bold mb-2">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of what this snippet does..."
              className="w-full border-4 border-black px-4 py-3 font-bold min-h-[100px]"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="neo-button bg-white text-black px-8 py-3 font-bold flex-1"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="neo-button bg-[#4ECDC4] text-black px-8 py-3 font-bold flex-1"
            >
              SAVE SNIPPET
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSnippetModal;
