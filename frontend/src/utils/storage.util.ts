const PREFIX = 'app:';

const prefixed = (key: string) => `${PREFIX}${key}`;

export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(prefixed(key));
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(prefixed(key), JSON.stringify(value));
    } catch { /* ignore */ }
  },
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(prefixed(key));
  },
  // Only removes keys belonging to this app (prefix-scoped)
  clear: (): void => {
    if (typeof window === 'undefined') return;
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};
