// Project section type enum values (matches database enum)
export const PROJECT_SECTION_TYPES = {
  TEXT: 'text',
  IMAGES: 'images', 
  IMAGE_TEXT: 'image_text',
  GIF: 'gif',
  VIDEO: 'video'
};

// Array of all valid types for dropdowns/validation
export const PROJECT_SECTION_TYPE_OPTIONS = Object.values(PROJECT_SECTION_TYPES);

// Human-readable labels for each type
export const PROJECT_SECTION_TYPE_LABELS = {
  [PROJECT_SECTION_TYPES.TEXT]: 'Text Only',
  [PROJECT_SECTION_TYPES.IMAGES]: 'Images Only',
  [PROJECT_SECTION_TYPES.IMAGE_TEXT]: 'Images + Text',
  [PROJECT_SECTION_TYPES.GIF]: 'GIF',
  [PROJECT_SECTION_TYPES.VIDEO]: 'Video'
};

// Helper function to validate section type
export function isValidSectionType(type) {
  return PROJECT_SECTION_TYPE_OPTIONS.includes(type);
}

// Helper function to get label for a type
export function getSectionTypeLabel(type) {
  return PROJECT_SECTION_TYPE_LABELS[type] || type;
}