const FilterBar = ({ selectedLanguage, setSelectedLanguage, languageCounts }) => {
  const languages = [
    { id: 'pyspark', name: 'PYSPARK', color: '#FF6B6B' },
    { id: 'sql', name: 'SQL', color: '#4ECDC4' },
    { id: 'python', name: 'PYTHON', color: '#FFE66D' },
    { id: 'dbt', name: 'DBT', color: '#A8E6CF' },
    { id: 'kafka', name: 'KAFKA', color: '#95E1D3' },
    { id: 'databricks', name: 'DATABRICKS', color: '#F38181' },
    { id: 'airflow', name: 'AIRFLOW', color: '#FFEAA7' },
    { id: 'dockerfile', name: 'DOCKER', color: '#74B9FF' },
  ];

  return (
    <section className="py-3 md:py-6 px-2 md:px-4 bg-white border-b-2 md:border-b-4 border-black sticky top-[60px] md:top-[88px] z-40 overflow-x-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center min-w-max md:min-w-0">
          <button
            onClick={() => setSelectedLanguage('all')}
            className="tag hover:scale-110 transition-transform text-xs md:text-sm whitespace-nowrap"
            style={{
              backgroundColor: selectedLanguage === 'all' ? '#000' : 'white',
              color: selectedLanguage === 'all' ? '#fff' : '#000',
            }}
          >
            ALL ({Object.values(languageCounts).reduce((sum, count) => sum + count, 0)})
          </button>
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className="tag hover:scale-110 transition-transform text-xs md:text-sm whitespace-nowrap"
              style={{
                backgroundColor: selectedLanguage === lang.id ? lang.color : 'white',
                color: selectedLanguage === lang.id ? '#000' : '#000',
              }}
            >
              {lang.name} ({languageCounts[lang.id] || 0})
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
