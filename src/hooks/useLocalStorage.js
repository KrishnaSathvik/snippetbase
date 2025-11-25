import { useState, useEffect } from 'react';

// Helper to conditionally log errors (only in development)
const logError = (message, error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
  }
  // In production, you could send to an error tracking service like Sentry
  // if (process.env.NODE_ENV === 'production') {
  //   // Sentry.captureException(error);
  // }
};

export const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logError(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      logError(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
