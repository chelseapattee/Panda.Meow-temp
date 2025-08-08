## Relevant Files

- `supabase/schema.sql` - SQL schema for the projects table and any other required tables.
- `supabase/migration-script.js` - Script to migrate existing JSON/localStorage data and images to Supabase.
- `src/utils/supabaseClient.js` - Supabase JS client initialization and helper functions.
- `src/api/projects.js` - API functions for CRUD operations on projects.
- `src/api/files.js` - API functions for file/image uploads and deletions.
- `src/pages/Admin.jsx` - Admin interface, updated to use Supabase API for all project/file actions.
- `src/components/AdminProjectForm.jsx` - Project form, updated for async API and file uploads.
- `src/components/ProjectCard.jsx` - Project card, updated to load images from Supabase Storage URLs.
- `src/pages/ProjectDetail.jsx` - Project detail page, updated to load images from Supabase Storage URLs.
- `src/utils/auth.js` - Updated or replaced with Supabase Auth integration.
- `src/api/__tests__/projects.test.js` - Unit tests for project API functions.
- `src/api/__tests__/files.test.js` - Unit tests for file/image API functions.
- `src/utils/__tests__/supabaseClient.test.js` - Unit tests for Supabase client helpers.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.jsx` and `MyComponent.test.jsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Set Up Supabase Backend
  - [x] 1.1 Install Supabase CLI and initialize a new Supabase project locally.
  - [x] 1.2 Start Supabase local development environment using Docker.
  - [x] 1.3 Create a new Supabase project for production (when ready).
  - [x] 1.4 Configure environment variables for Supabase API keys and URLs.
  - [x] 1.5 Update portfolio/README.md with Supabase and Docker requirements for local development and deployment.

- [x] 2.0 Implement Project Data Model and Storage
  - [x] 2.1 Design the 'projects' table schema (id, title, description, technologies, imageUrls, etc.).
  - [x] 2.2 Write the SQL schema and apply it to the local Supabase instance (`supabase/schema.sql`).
  - [x] 2.3 Test table creation and data insertion using Supabase Studio or SQL queries.
  - [x] 2.4 Implement API functions in `src/api/projects.js` for CRUD operations (GET, POST, PUT, DELETE).
  - [x] 2.5 Write unit tests for project API functions (`src/api/__tests__/projects.test.js`).

- [x] 3.0 Implement File/Image Storage
  - [x] 3.1 Create a Supabase Storage bucket (e.g., 'project-images').
  - [x] 3.2 Set appropriate access policies for the bucket (public read, authenticated write/delete).
  - [x] 3.3 Implement API functions in `src/api/files.js` for uploading and deleting images/files.
  - [x] 3.4 Update project records to store image URLs from Supabase Storage.
  - [x] 3.5 Write unit tests for file/image API functions (`src/api/__tests__/files.test.js`).

- [x] 4.0 Integrate Supabase Auth for Admin Actions
  - [x] 4.1 Set up Supabase Auth with a single admin user (email/password).
  - [x] 4.2 Update or replace `src/utils/auth.js` to use Supabase Auth for login/logout and session management.
  - [x] 4.3 Protect all write operations (add/edit/delete/upload) with authentication checks.
  - [x] 4.4 Update the admin login UI to use Supabase Auth (or integrate with existing form).

- [ ] 5.0 Update Frontend to Use Supabase API
  - [ ] 5.1 Refactor `src/pages/Admin.jsx` to use Supabase API for all project CRUD actions.
  - [x] 5.2 Refactor `src/components/AdminProjectForm.jsx` for async API calls and file uploads.
  - [ ] 5.3 Update `src/components/ProjectCard.jsx` and `src/pages/ProjectDetail.jsx` to load images from Supabase Storage URLs.
  - [x] 5.4 Ensure all UI states (loading, error, success) are handled for API and upload operations.

- [ ] 6.0 Migrate Existing Data to Supabase
  - [ ] 6.1 Write a migration script (`supabase/migration-script.js`) to read existing JSON/localStorage data.
  - [ ] 6.2 Upload all existing images/files to Supabase Storage and update project records with new URLs.
  - [ ] 6.3 Insert all existing project data into the Supabase 'projects' table.
  - [ ] 6.4 Verify data integrity and completeness after migration.

- [ ] 7.0 Testing and Error Handling
  - [ ] 7.1 Write unit tests for Supabase client helpers (`src/utils/__tests__/supabaseClient.test.js`).
  - [ ] 7.2 Add/expand tests for all new/updated API functions and components.
  - [ ] 7.3 Test authentication, CRUD, and file upload flows end-to-end.
  - [ ] 7.4 Ensure all error cases (API errors, auth errors, upload failures) are handled gracefully in the UI.

---
I have generated the high-level tasks based on the PRD. Ready to generate the sub-tasks? Respond with 'Go' to proceed. 