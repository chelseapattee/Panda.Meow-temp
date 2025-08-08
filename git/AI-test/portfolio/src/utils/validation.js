// Basic validation utilities for forms

// Checks if a value is not empty
export function isRequired(value) {
  return value !== undefined && value !== null && value.toString().trim() !== '';
}

// Checks if a value is a valid email
export function isValidEmail(email) {
  if (!isRequired(email)) return false;
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Checks if a value is a valid URL
export function isValidURL(url) {
  if (!isRequired(url)) return false;
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
} 