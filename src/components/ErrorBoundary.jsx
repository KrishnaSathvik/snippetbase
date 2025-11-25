import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAF5]">
          <Header />
          <div className="flex flex-col items-center justify-center px-4 min-h-[60vh]">
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 text-black">
                OOPS! SOMETHING WENT WRONG
              </h1>
              <p className="text-base md:text-lg font-bold text-gray-700 mb-6 md:mb-8">
                We're sorry, but something unexpected happened. Please try refreshing the page or go back to the home page.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 md:mb-8">
                <button
                  onClick={() => window.location.reload()}
                  className="neo-button bg-[#4ECDC4] text-black px-6 py-3 md:px-8 md:py-4 font-bold text-sm md:text-base hover:scale-105 transition-transform"
                >
                  REFRESH PAGE
                </button>
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    window.location.href = '/';
                  }}
                  className="neo-button bg-black text-white px-6 py-3 md:px-8 md:py-4 font-bold text-sm md:text-base hover:scale-105 transition-transform"
                >
                  GO TO HOME
                </Link>
              </div>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left bg-white p-4 neo-box">
                  <summary className="font-bold cursor-pointer mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

