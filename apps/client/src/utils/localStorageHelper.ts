
export const saveToStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = <T>(key: string): T | null => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) as T : null;
};

export const clearStorage = (key: string) => {
  localStorage.removeItem(key);
};