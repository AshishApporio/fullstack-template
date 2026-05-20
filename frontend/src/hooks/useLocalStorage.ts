import { useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  const removeValue = () => {
    setStoredValue(initialValue);
    if (typeof window !== 'undefined') localStorage.removeItem(key);
  };

  return [storedValue, setValue, removeValue] as const;
};
