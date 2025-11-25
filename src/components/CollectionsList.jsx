const CollectionsList = ({ onCollectionClick }) => {
  const collections = [
    {
      id: 'performance',
      emoji: '⚡',
      title: 'Performance Tuning',
      description: 'Optimize your Spark jobs',
      color: '#FF6B6B',
      tags: ['performance', 'optimization', 'caching', 'partitioning', 'broadcast']
    },
    {
      id: 'architecture',
      emoji: '🏗️',
      title: 'Medallion Architecture',
      description: 'Bronze/Silver/Gold patterns',
      color: '#4ECDC4',
      tags: ['delta', 'incremental', 'pipeline', 'bronze', 'silver', 'gold', 'medallion']
    },
    {
      id: 'quality',
      emoji: '🎯',
      title: 'Data Quality',
      description: 'Validation & testing',
      color: '#FFE66D',
      tags: ['validation', 'testing', 'quality', 'great-expectations', 'pandera', 'profiling']
    },
    {
      id: 'genai',
      emoji: '✨',
      title: 'GenAI & RAG',
      description: 'LangChain, OpenAI, vectors',
      color: '#A8E6CF',
      tags: ['langchain', 'rag', 'openai', 'embeddings', 'vector', 'gpt', 'llm']
    },
    {
      id: 'mlops',
      emoji: '🚀',
      title: 'MLOps',
      description: 'Deploy & monitor models',
      color: '#95E1D3',
      tags: ['mlflow', 'deployment', 'monitoring', 'fastapi', 'docker']
    },
    {
      id: 'ml',
      emoji: '🤖',
      title: 'Machine Learning',
      description: 'sklearn, training, evaluation',
      color: '#F38181',
      tags: ['sklearn', 'ml', 'model', 'training', 'cross-validation', 'feature']
    }
  ];

  // Count actual snippets for each collection (will be passed from parent)
  const handleCollectionClick = (collection) => {
    onCollectionClick(collection);
  };

  return (
    <section className="py-6 md:py-12 px-4 bg-white border-y-4 md:border-y-8 border-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-8">🔥 FEATURED COLLECTIONS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="neo-box p-4 md:p-6 hover:rotate-1 transition-transform cursor-pointer"
              style={{ backgroundColor: collection.color }}
              onClick={() => handleCollectionClick(collection)}
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">{collection.emoji}</div>
              <h3 className="text-xl md:text-2xl font-black mb-2">{collection.title}</h3>
              <p className="font-bold text-sm md:text-base mb-3 md:mb-4">{collection.description}</p>
              <button className="neo-button bg-black text-white px-4 py-1.5 md:px-6 md:py-2 font-bold text-xs md:text-base w-full hover:scale-105 transition-transform">
                VIEW COLLECTION
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsList;