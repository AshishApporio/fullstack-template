// Date formatter
export const formatDate = (date: string | Date, locale = 'en-IN'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'short', day: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date: string | Date, locale = 'en-IN'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(date));
};

// Currency formatter
export const formatCurrency = (amount: number, currency = 'INR', locale = 'en-IN'): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
};

// Number formatter
export const formatNumber = (num: number, locale = 'en-IN'): string => {
  return new Intl.NumberFormat(locale).format(num);
};

// Truncate text
export const truncate = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// Capitalize first letter
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
