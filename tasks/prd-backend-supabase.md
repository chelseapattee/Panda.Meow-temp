# PRD: Supabase Backend Integration for Portfolio Projects

## 1. Introduction/Overview
This feature will migrate the portfolio app's project data and file storage from localStorage/JSON to a Supabase backend. The goal is to enable true persistence across devices, allow project edits/additions/deletions from the admin interface, and store images/files securely. The backend will expose a REST API for CRUD operations, use Supabase Auth for admin authentication, and leverage Supabase Storage for images/files. Existing data will be migrated to the new backend.

## 2. Goals
- Persist all project data and images/files in a Supabase backend (Postgres + Storage).
- Allow the admin to add, edit, and delete projects from the admin interface, with changes reflected for all users and devices.
- Secure all write operations with authentication (single admin user).
- Expose a REST API for CRUD operations on projects and file uploads.
- Migrate existing localStorage/JSON data and images to Supabase.

## 3. User Stories
- As an admin, I want to log in securely and manage projects from any device.
- As an admin, I want to upload images/files for projects and have them persist across reloads and devices.
- As a user, I want to see the latest project data and images, regardless of which device the admin used to update them.
- As an admin, I want to migrate my existing projects and images to the new backend so nothing is lost.

## 4. Functional Requirements
1. The system must use Supabase (Postgres) to store all project data.
2. The system must use Supabase Storage to store all images/files, with URLs saved in the project records.
3. The system must expose a REST API for CRUD operations on projects (GET, POST, PUT, DELETE).
4. The system must expose an API endpoint for file/image uploads and deletions.
5. The system must require authentication (Supabase Auth) for all admin actions (add/edit/delete/upload).
6. The frontend must be updated to use the new API for all project and file operations.
7. The system must provide a script or process to migrate existing localStorage/JSON data and images to Supabase.
8. The system must handle errors gracefully (e.g., failed uploads, auth errors, API errors).
9. The system must support local development (Supabase local Docker setup) and be ready for production migration.

## 5. Non-Goals (Out of Scope)
- Multi-user admin or user management (single admin only).
- Advanced analytics, search, or filtering (basic CRUD only).
- Third-party image hosting (all files/images stored in Supabase Storage).
- Real-time updates (unless trivial to enable with Supabase).

## 6. Design Considerations
- Use Supabase's built-in Auth UI for admin login, or integrate with the existing login form.
- Use Supabase Storage buckets for images/files; store public URLs in project records.
- Update the admin interface to use async API calls for all project/file actions.
- Ensure the UI shows loading/error states for API and upload operations.
- Maintain the current responsive and accessible design.

## 7. Technical Considerations
- Use Supabase's local Docker setup for development; plan for easy migration to hosted Supabase.
- Use the Supabase JS client library for all API/auth/storage interactions.
- Store project data in a 'projects' table (define schema: id, title, description, technologies, imageUrls, etc.).
- Store images/files in a dedicated Supabase Storage bucket (e.g., 'project-images').
- Use environment variables for Supabase API keys and URLs.
- Provide a migration script (Node.js or Supabase SQL) to import existing JSON/localStorage data and upload images.
- Ensure all API endpoints are authenticated for write operations.

## 8. Success Metrics
- 100% of new/edited/deleted projects persist and sync across devices and reloads.
- 100% of uploaded images/files are accessible via Supabase Storage URLs.
- Admin can log in and manage projects from any device.
- No data loss during migration from localStorage/JSON.
- No unauthorized access to admin actions or file uploads.

## 9. Open Questions
- Should the REST API support batch operations (e.g., bulk upload/edit)?
- Should image uploads be limited in size or type (enforced by backend)?
- Should there be a fallback if Supabase is temporarily unavailable?
- Should the migration script handle duplicate or conflicting project IDs? 