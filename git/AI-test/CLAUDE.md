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
  - `projects`: Main project metadata
  - `project_sections`: Detailed content sections for each project
- **Authentication** via email/password (admin only)
- **File storage** for project images

### Key Frontend Structure
- `src/pages/`: Main route components (Landing, Projects, Admin, etc.)
- `src/components/`: Reusable UI components
- `src/api/`: API layer for Supabase operations
- `src/utils/`: Authentication and validation utilities
- `src/data/`: Static project data (fallback)

### Admin Features
- Password-protected admin panel at `/admin`
- CRUD operations for projects
- Image upload and management
- Form validation and error handling

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
- Test files located in `__tests__/` directories
- Coverage reports generated in `coverage/` directory