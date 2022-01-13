export const setStorage = (key: string, val: string) => {
  window.localStorage.setItem(key, val);
};

export const getStorage = (key: string) => {
  return window.localStorage.getItem(key);
};
export const removeStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
export const clearStorage = () => {
  window.localStorage.clear();
};
