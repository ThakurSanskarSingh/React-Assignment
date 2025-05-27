export const storage = {
  save: (key, value) => {
    try {
      const data = { value, timestamp: Date.now() };
     
      console.log(`Would save to localStorage: ${key}`, data);
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  load: (key) => {
    try {
      
      console.log(`Would load from localStorage: ${key}`);
      return null;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }
};