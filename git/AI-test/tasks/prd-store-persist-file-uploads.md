# PRD: Store and Persist File Uploads

## 1. Introduction/Overview
This feature enables admin users to upload, store, and persist project images in the portfolio app. The goal is to ensure that uploaded images are reliably available across page reloads and browser restarts, even when offline, using modern browser storage best practices. This will improve the robustness and user experience of the admin interface.

## 2. Goals
- Allow admin users to upload one or more images per project.
- Persist uploaded images locally using IndexedDB (via localForage) for offline access and reliability.
- Ensure images are available after page reloads and browser restarts.
- Display image previews during and after upload.
- Provide basic error handling for unsupported file types, size limits, and storage errors.

## 3. User Stories
- As an admin, I want to upload images for a project so that they are displayed as covers and in detail views.
- As an admin, I want my uploaded images to persist even if I reload the page or close and reopen the browser.
- As an admin, I want to see a preview of images before saving a project.
- As an admin, I want to be notified if an image is too large or of an unsupported type.

## 4. Functional Requirements
1. The system must allow admin users to upload one or more image files per project.
2. The system must store uploaded images in IndexedDB using localForage for persistence.
3. The system must support image files (JPEG, PNG, SVG, GIF) up to 2MB each.
4. The system must display image previews before saving the project.
5. The system must retrieve and display persisted images on the projects and project detail pages.
6. The system must show an error if a file is too large or of an unsupported type.
7. The system must handle storage errors gracefully (e.g., quota exceeded).
8. The system must allow admins to remove or replace images before saving.

## 5. Non-Goals (Out of Scope)
- Uploading files to a remote server or cloud storage (future enhancement).
- Support for non-image file types (e.g., PDFs, videos).
- Advanced image editing or compression.
- Multi-user or cross-device image sharing.

## 6. Design Considerations
- Use localForage to abstract IndexedDB for broad browser support and simple API.
- Show image previews using FileReader or stored data URLs.
- UI should clearly indicate upload status, errors, and allow image removal.
- Follow existing admin form and project card styles for consistency.

## 7. Technical Considerations
- Use localForage for storing/retrieving image blobs or data URLs.
- Store image metadata (name, type, size) alongside image data.
- Ensure compatibility with current project data structure (add image references to project objects).
- Handle browser storage limits and provide user feedback if exceeded.

## 8. Success Metrics
- 100% of uploaded images persist after reloads and browser restarts (manual QA).
- No critical errors or crashes during upload, preview, or retrieval.
- Admins can successfully add, preview, and remove images for projects.

## 9. Open Questions
- Should there be a maximum number of images per project?
- Should images be compressed or resized before storage to save space?
- Should there be a fallback for browsers that do not support IndexedDB/localForage? 