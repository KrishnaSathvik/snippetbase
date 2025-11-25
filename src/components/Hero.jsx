const Hero = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className="py-6 md:py-12 px-4 border-b-4 md:border-b-8 border-black bg-gradient-to-br from-[#FFE66D] to-[#FFB6B6]">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 md:mb-4">
          <span className="bg-black text-white px-2 py-1 md:px-4 md:py-2 inline-block text-2xl sm:text-3xl md:text-5xl lg:text-7xl">SNIPPETS</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-8">
          150+ code examples for data engineering, machine learning, GenAI, and MLOps
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder='Search snippets...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full neo-box px-3 py-2.5 md:px-6 md:py-4 text-sm md:text-xl font-bold bg-white pr-12 md:pr-16"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black font-bold text-xl md:text-2xl"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
