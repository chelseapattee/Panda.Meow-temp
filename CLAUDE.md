# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a full-stack portfolio application with:
- `portfolio/`: React frontend application
- `supabase/`: Backend configuration and schema
- `tasks/`: Product requirements and task documentation

## Development Commands

All commands should be run from the `portfolio/` directory unless specified otherwise:

### Frontend (React)
```bash
cd portfolio
npm install          # Install dependencies
npm start            # Start development server (localhost:3000)
npm test             # Run Jest tests
npm run build        # Build production bundle
npm run lint:scss    # Lint SCSS files
```

### Backend (Supabase)
```bash
supabase start       # Start local Supabase (requires Docker Desktop)
supabase stop        # Stop local Supabase
supabase status      # Check local environment status
supabase reset       # Reset local database
```

Supabase local services:
- API: http://localhost:54321
- Studio: http://localhost:54323
- Database: localhost:54322

## Architecture Overview

### Frontend Stack
- **React 19** with React Router DOM for routing
- **SCSS** for styling with custom fonts (GT Haptik, Basis Grotesque)
- **Supabase JS client** for backend communication
- **Local storage** for client-side persistence
- **Jest/Testing Library** for unit tests

### Backend Stack
- **Supabase** for backend-as-a-service
- **PostgreSQL** database with two main tables:
  - `projects`: Main project metadata (title, description, technologies, outcomes, etc.)
  - `project_sections`: Detailed content sections with ordering and different content types (images, text, video, etc.)
- **Authentication** via email/password (admin only)
- **File storage** for project images with 50MiB size limit
- **Database schema** defined in `supabase/schema.sql`

### Key Frontend Structure
- `src/pages/`: Main route components (Landing, Projects, Admin, etc.)
- `src/components/`: Reusable UI components
- `src/api/`: API layer for Supabase operations
- `src/utils/`: Authentication and validation utilities
- `src/data/`: Static project data (fallback)

## User Interface Overview

### End-User Interface

#### Public Pages & Routes
- `/` - Landing page with personal branding and navigation
- `/projects` - Project gallery with card grid layout
- `/projects/:id` - Individual project detail pages
- `/contact` - Contact form and information
- `/about` - Personal/professional background

#### Navigation & Design
- **Responsive Navbar**: Custom logo (SVG "C"), "CHELSEA PATTEE" branding
- **Smart Navigation**: Projects dropdown when viewing project details
- **Mobile-First**: Hamburger menu with backdrop overlay
- **Design System**: 
  - Custom fonts: GT Haptik, Basis Grotesque
  - Brand colors: Purple/indigo (#4F46E5)
  - SCSS component architecture
  - Responsive grid layouts

### Admin Interface

#### Authentication & Access Control
- Protected `/admin` route with Supabase email/password auth
- Session management with persistent login
- All admin operations validate session before proceeding

#### Admin Dashboard Features
- **Navigation Tabs**: Projects, Add Project, Edit Mode, Logout
- **Project Management**: Full CRUD operations
- **Rich Form Interface**: 
  - Title, description, technologies fields
  - Multi-image upload with drag/drop
  - Real-time previews with remove functionality
  - File validation (types, 2MB size limit)
- **File Management**: Direct Supabase Storage integration
- **UX Features**: Loading states, error handling, accessibility, delete protection

#### User Flows
- **Public**: Landing → Projects → Project Details → Contact
- **Admin**: Login → Dashboard → Add/Edit/Delete Projects → Image Management → Logout

## Environment Setup

The application requires these environment files:

`portfolio/.env.local`:
```
REACT_APP_SUPABASE_URL=http://localhost:54321
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

Get the keys by running `supabase status` after starting the local environment.

## Testing Strategy
- Unit tests for components using Jest and Testing Library
- Test files located in `__tests__/` directories and alongside source files (`.test.js`)
- Coverage reports generated in `coverage/` directory
- Run specific tests: `npm test -- --testPathPattern=ComponentName`
- Run all tests: `npm test` (from `portfolio/` directory)

## Development Workflow Integration

### Cursor Rules
This repository includes Cursor rules in `.cursor/rules/` that provide structured workflows:
- `create-prd.mdc`: Guidelines for creating Product Requirements Documents with clarifying questions
- `generate-tasks.mdc`: Task list generation from PRDs with two-phase approach (parent tasks, then sub-tasks)
- `process-task-list.mdc`: Task management protocols requiring user approval between sub-tasks

### Task Management Process
1. **PRD Creation**: Use Cursor rule to create detailed requirements documents in `/tasks`
2. **Task Generation**: Convert PRDs to actionable task lists with file identification
3. **Implementation**: Work through tasks one sub-task at a time with user approval
4. **Progress Tracking**: Mark completed tasks and maintain "Relevant Files" section

## Additional Notes
- The repository contains a `portfolio-refactor/` directory (likely for experimental changes)
- Database seeding is configured via `supabase/seed.sql`
- Project uses localforage for client-side data persistence alongside Supabase
- Email testing available via Inbucket on port 54324 during local development
- always tell me how to use these scripts you create
- add this to instructions