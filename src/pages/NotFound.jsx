import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Navigate to landing page
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate('/', { replace: true });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleRefresh = () => {
    // Refresh the current page (stay on 404)
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 min-h-[60vh]">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-black mb-4 md:mb-6 text-black">404</h1>
          <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 text-black">
            PAGE NOT FOUND
          </h2>
          <p className="text-base md:text-lg font-bold text-gray-700 mb-6 md:mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRefresh}
              className="neo-button bg-[#4ECDC4] text-black px-6 py-3 md:px-8 md:py-4 font-bold text-sm md:text-base hover:scale-105 transition-transform"
            >
              REFRESH PAGE
            </button>
            <button
              onClick={handleGoHome}
              className="neo-button bg-black text-white px-6 py-3 md:px-8 md:py-4 font-bold text-sm md:text-base hover:scale-105 transition-transform"
            >
              GO TO HOME
            </button>
            <Link
              to="/snippets"
              className="neo-button bg-[#FF6B6B] text-black px-6 py-3 md:px-8 md:py-4 font-bold text-sm md:text-base hover:scale-105 transition-transform"
            >
              BROWSE SNIPPETS
            </Link>
            <Link
              to="/cheat-sheets"
              className="neo-button bg-[#FFE66D] text-black px-6 py-3 md:px-8 md:py-4 font-bold text-sm md:text-base hover:scale-105 transition-transform"
            >
              BROWSE CHEAT SHEETS
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;

