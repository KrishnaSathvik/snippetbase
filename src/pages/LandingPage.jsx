import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSnippets } from '../hooks/useSnippets';
import { useCheatSheets } from '../hooks/useCheatSheets';
import { getCategories } from '../data/cheatSheets';

const LandingPage = () => {
  const snippetHook = useSnippets();
  const cheatSheetsHook = useCheatSheets();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 border-b-4 md:border-b-8 border-black bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 text-black">
              Stop Googling the same things over and over.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-black">
              Production-tested code snippets, cheat sheets, and guides for data engineers & developers.
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            <div className="neo-box bg-white p-6 md:p-8 text-center">
              <div className="text-4xl md:text-5xl font-black mb-2">{snippetHook.stats.totalSnippets}+</div>
              <div className="text-sm md:text-base font-black uppercase">CODE SNIPPETS</div>
            </div>
            <div className="neo-box bg-white p-6 md:p-8 text-center">
              <div className="text-4xl md:text-5xl font-black mb-2">{cheatSheetsHook.cheatSheets.length}+</div>
              <div className="text-sm md:text-base font-black uppercase">CHEAT SHEETS</div>
            </div>
            <div className="neo-box bg-white p-6 md:p-8 text-center">
              <div className="text-4xl md:text-5xl font-black mb-2">{categories.length}</div>
              <div className="text-sm md:text-base font-black uppercase">CATEGORIES</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 md:gap-6">
            <Link
              to="/snippets"
              className="neo-box bg-white p-6 md:p-8 flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer group"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <div className="text-3xl md:text-4xl">{"<>"}</div>
                <div className="text-xl md:text-2xl font-black uppercase">BROWSE SNIPPETS</div>
              </div>
              <div className="text-2xl md:text-3xl group-hover:translate-x-2 transition-transform">→</div>
            </Link>
            <Link
              to="/cheat-sheets"
              className="neo-box bg-white p-6 md:p-8 flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer group"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <div className="text-3xl md:text-4xl">📄</div>
                <div className="text-xl md:text-2xl font-black uppercase">BROWSE CHEAT SHEETS</div>
              </div>
              <div className="text-2xl md:text-3xl group-hover:translate-x-2 transition-transform">→</div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;

