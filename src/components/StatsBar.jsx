const StatsBar = ({ stats }) => {
  return (
    <section className="py-4 md:py-8 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-center">
          <div>
            <div className="text-2xl md:text-4xl font-black text-[#FF6B6B]">{stats.totalSnippets}</div>
            <div className="font-bold text-xs md:text-base">SNIPPETS</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-black text-[#4ECDC4]">{stats.favoriteCount}</div>
            <div className="font-bold text-xs md:text-base">FAVORITES</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-black text-[#A8E6CF]">
              {stats.languageCounts ? Object.keys(stats.languageCounts).length : 0}
            </div>
            <div className="font-bold text-xs md:text-base">LANGUAGES</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
