## Relevant Files

- `src/components/AdminProjectForm.jsx` - Main form for adding/editing projects and uploading images.
- `src/data/projects.js` - Handles project data storage and retrieval.
- `src/utils/imageStorage.js` - Utility for storing/retrieving images with localForage (to be created).
- `src/components/ProjectCard.jsx` - Displays project cover images.
- `src/pages/ProjectDetail.jsx` - Displays project images in detail view.
- `src/utils/imageStorage.test.js` - Unit tests for image storage utility.
- `src/components/__tests__/AdminProjectForm.test.jsx` - Tests for image upload and preview logic.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.jsx` and `MyComponent.test.jsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Integrate localForage for image persistence
  - [x] 1.1 Add `localforage` as a project dependency.
  - [x] 1.2 Create `src/utils/imageStorage.js` to abstract image storage/retrieval using localForage.
  - [x] 1.3 Implement functions to save, retrieve, and delete images by project ID and image name.
  - [x] 1.4 Store image metadata (name, type, size) alongside image data (as blob or data URL).
  - [x] 1.5 Write unit tests for image storage utility (`imageStorage.test.js`).

- [x] 2.0 Update AdminProjectForm to support persistent image uploads and previews
  - [x] 2.1 Update form logic to use imageStorage utility for saving images on upload.
  - [x] 2.2 Display image previews using stored data URLs or blobs.
  - [x] 2.3 Allow admins to remove or replace images before saving a project.
  - [x] 2.4 Validate file type and size before upload (JPEG, PNG, SVG, GIF, ≤2MB).
  - [x] 2.5 Show error messages for invalid files or storage errors.
  - [x] 2.6 Update tests to cover new upload and preview logic.

- [x] 3.0 Update project data structure and storage logic to reference persisted images
  - [x] 3.1 Update `projects.js` to store image references (keys/IDs) instead of raw files.
  - [x] 3.2 Ensure new and edited projects save image references correctly.
  - [x] 3.3 Migrate any existing projects to use the new image reference format.

- [x] 4.0 Display persisted images on Projects and ProjectDetail pages
  - [x] 4.1 Update `ProjectCard.jsx` to load and display cover images from imageStorage.
  - [x] 4.2 Update `ProjectDetail.jsx` to load and display all project images from imageStorage.
  - [x] 4.3 Handle missing or corrupted images gracefully (show fallback image or message).

- [x] 5.0 Implement error handling and user feedback for uploads and storage
  - [x] 5.1 Show clear error messages for unsupported file types, size limits, and storage quota issues.
  - [x] 5.2 Provide user feedback for successful uploads, removals, and errors.
  - [x] 5.3 Ensure UI is accessible and responsive during upload and error states.

- [x] 6.0 Add unit tests for image storage and upload logic
  - [x] 6.1 Write tests for all new imageStorage utility functions.
  - [x] 6.2 Add/expand tests in `AdminProjectForm.test.jsx` for upload, preview, and error handling.
  - [x] 6.3 Add/expand tests for image display in `ProjectCard` and `ProjectDetail` components.

---
I have generated the high-level tasks based on the PRD. Ready to generate the sub-tasks? Respond with 'Go' to proceed. 