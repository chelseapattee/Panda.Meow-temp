// Utility for keeping navbar and project lists synchronized
let projectChangeListeners = [];

// Subscribe to project changes
export function subscribeToProjectChanges(callback) {
  projectChangeListeners.push(callback);
  
  // Return unsubscribe function
  return () => {
    projectChangeListeners = projectChangeListeners.filter(listener => listener !== callback);
  };
}

// Notify all listeners when projects change
export function notifyProjectChange() {
  projectChangeListeners.forEach(callback => {
    try {
      callback();
    } catch (err) {
      console.warn('Error in project change listener:', err);
    }
  });
}

// Helper to trigger refresh across components
export function triggerProjectRefresh() {
  notifyProjectChange();
  
  // Also trigger a custom event for any other components listening
  window.dispatchEvent(new CustomEvent('projectsUpdated', { 
    detail: { timestamp: Date.now() }
  }));
}