import { useState, useEffect } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'snippetbase-db';
const DB_VERSION = 1;
const STORE_NAME = 'snippets';

// Initialize IndexedDB
const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
  return db;
};

// Helper to conditionally log errors (only in development)
const logError = (message, error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
  }
};

export const useIndexedDB = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial value from IndexedDB, with migration from localStorage
  useEffect(() => {
    let isMounted = true;

    const loadValue = async () => {
      try {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        let item = await store.get(key);
        await tx.done; // Wait for read transaction to complete
        
        // If IndexedDB is empty, try to migrate from localStorage
        if (item === undefined) {
          try {
            const localStorageItem = window.localStorage.getItem(key);
            if (localStorageItem) {
              item = JSON.parse(localStorageItem);
              // Migrate to IndexedDB (new transaction)
              const writeTx = db.transaction(STORE_NAME, 'readwrite');
              const writeStore = writeTx.objectStore(STORE_NAME);
              await writeStore.put(item, key);
              await writeTx.done;
              console.log(`Migrated ${key} from localStorage to IndexedDB`);
            }
          } catch (localStorageError) {
            // localStorage migration failed, continue with initialValue
            logError(`Error migrating from localStorage:`, localStorageError);
          }
        }
        
        if (isMounted) {
          setStoredValue(item !== undefined ? item : initialValue);
          setIsLoading(false);
        }
      } catch (error) {
        logError(`Error loading ${key} from IndexedDB:`, error);
        if (isMounted) {
          setStoredValue(initialValue);
          setIsLoading(false);
        }
      }
    };

    loadValue();

    return () => {
      isMounted = false;
    };
  }, [key, initialValue]);

  // Update IndexedDB whenever the value changes
  useEffect(() => {
    if (isLoading) return; // Don't save during initial load

    const saveValue = async () => {
      try {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        await store.put(storedValue, key);
        await tx.done;
        // Removed console.log to reduce noise - data is still being saved
      } catch (error) {
        logError(`Error saving ${key} to IndexedDB:`, error);
      }
    };

    saveValue();
  }, [key, storedValue, isLoading]);

  return [storedValue, setStoredValue, isLoading];
};

