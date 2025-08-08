## Relevant Files

- `src/pages/Admin.jsx` – Main admin interface page (route: /admin), now updates data source on add/edit/delete.
- `src/pages/Admin.scss` – Styles for responsive and accessible admin layout.
- `src/pages/Admin.test.js` – Unit tests for admin route protection and login visibility.
- `src/components/AdminLogin.jsx` – Authentication/login form for admin access.
- `src/components/__tests__/AdminLogin.test.jsx` – Unit tests for admin login.
- `src/components/AdminProjectForm.jsx` – Form for adding/editing projects (now with logical sections, dynamic arrays, file upload with preview, validation, and pre-fill for editing).
- `src/components/__tests__/AdminProjectForm.test.jsx` – Unit tests for project form logic and validation.
- `src/components/AdminProjectList.jsx` – List of projects with edit/delete actions (created).
- `src/components/AdminDeleteModal.jsx` – Modal for confirming project deletion (created).
- `src/components/__tests__/AdminProjectList.test.jsx` – Unit tests for project list and deletion (created).
- `src/data/projects.json` – Local JSON file for storing project data (created).
- `src/data/projects.js` – Logic to read/write project data to/from JSON file or localStorage (implemented).
- `src/utils/validation.js` – Validation logic for admin forms (created and used, all fields covered).
- `src/utils/auth.js` – Authentication logic for admin access (to be created).

### Notes

- Unit tests should be placed alongside the code files they are testing (e.g., `AdminLogin.jsx` and `AdminLogin.test.jsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Set Up Admin Route and Authentication
  - [x] 1.1 Create `Admin.jsx` page and add `/admin` route to router.
  - [x] 1.2 Create `AdminLogin.jsx` component for password authentication.
  - [x] 1.3 Implement authentication logic in `auth.js` (simple password, stored securely).
  - [x] 1.4 Protect admin route so only authenticated users can access admin features.
  - [x] 1.5 Add unit tests for login and route protection.

- [x] 2.0 Build Admin Interface Layout and Navigation
  - [x] 2.1 Design and implement the main admin layout (header, navigation, sectioning).
  - [x] 2.2 Add navigation between project list and add/edit forms.
  - [x] 2.3 Ensure responsive and accessible design.

- [x] 3.0 Implement Project Management Form (Add/Edit)
  - [x] 3.1 Create `AdminProjectForm.jsx` for adding/editing projects.
  - [x] 3.2 Organize form into logical sections (General Info, Technologies, Images, Collaborators, etc.).
  - [x] 3.3 Implement dynamic arrays for technologies, images, collaborators.
  - [x] 3.4 Add file upload with image preview (support .jpg, .png, .svg, .gif).
  - [x] 3.5 Add form validation (required fields, max length, file type/size, etc.) using `validation.js`.
  - [x] 3.6 Pre-fill form with existing data for editing.
  - [x] 3.7 Add unit tests for form logic and validation.

- [x] 4.0 Enable Project Deletion with Confirmation
  - [x] 4.1 Create `AdminProjectList.jsx` to display all projects with edit/delete actions.
  - [x] 4.2 Implement delete action with strong confirmation modal (`AdminDeleteModal.jsx`).
  - [x] 4.3 Add unit tests for project deletion and confirmation logic.

- [x] 5.0 Integrate Data Persistence and Validation
  - [x] 5.1 Create `projects.json` in `src/data` for storing project data.
  - [x] 5.2 Implement logic to read/write project data to/from JSON file (or localStorage as fallback).
  - [x] 5.3 Ensure all add/edit/delete actions update the data source correctly.
  - [x] 5.4 Add validation logic for all fields in `validation.js`.
  - [ ] 5.5 Add unit tests for data persistence and validation. 