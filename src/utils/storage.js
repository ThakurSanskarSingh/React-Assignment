// Local Storage utilities
export const storage = {
  save: (key, value) => {
    try {
      const data = { value, timestamp: Date.now() };
      // Note: localStorage not available in Claude.ai artifacts
      // This would work in a real browser environment
      console.log(`Would save to localStorage: ${key}`, data);
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  load: (key) => {
    try {
      // Note: localStorage not available in Claude.ai artifacts
      // This would work in a real browser environment
      console.log(`Would load from localStorage: ${key}`);
      return null;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }
};