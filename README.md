# Portfolio Application

A full-stack portfolio application built with React and Supabase, featuring an admin panel for content management and a responsive design showcasing projects and work.

## 🏗️ Architecture

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

## 📁 Repository Structure

```
.
├── portfolio/          # React frontend application
├── supabase/          # Backend configuration and schema
├── tasks/             # Product requirements and task documentation
└── README.md          # This file
```

### Key Frontend Structure
- `src/pages/`: Main route components (Landing, Projects, Admin, etc.)
- `src/components/`: Reusable UI components
- `src/api/`: API layer for Supabase operations
- `src/utils/`: Authentication and validation utilities
- `src/data/`: Static project data (fallback)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Docker Desktop (for Supabase local development)
- Supabase CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Panda.Meow-temp
   ```

2. **Install frontend dependencies**
   ```bash
   cd portfolio
   npm install
   ```

3. **Start Supabase locally**
   ```bash
   supabase start
   ```

4. **Set up environment variables**
   
   Create `portfolio/.env.local`:
   ```env
   REACT_APP_SUPABASE_URL=http://localhost:54321
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```
   
   Get the keys by running `supabase status` after starting the local environment.

5. **Start the development server**
   ```bash
   cd portfolio
   npm start
   ```

The application will be available at `http://localhost:3000`.

## 🔧 Development Commands

All commands should be run from the `portfolio/` directory unless specified otherwise:

### Frontend (React)
```bash
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

### Local Services
When running locally, Supabase provides:
- API: http://localhost:54321
- Studio: http://localhost:54323
- Database: localhost:54322

## 🎨 Features

- **Responsive Design**: Optimized for desktop and mobile devices
- **Admin Panel**: Password-protected content management system
- **Project Management**: CRUD operations for projects with image upload
- **Modern UI**: Clean, professional design with custom typography
- **Fast Performance**: Optimized React application with efficient data loading

### Admin Features
- Password-protected admin panel at `/admin`
- CRUD operations for projects
- Image upload and management
- Form validation and error handling

## 🧪 Testing

The application uses Jest and Testing Library for unit testing:

```bash
npm test                                    # Run all tests
npm test -- --testPathPattern=ComponentName # Run specific tests
npm test -- --coverage                     # Generate coverage report
```

Test files are located in `__tests__/` directories, and coverage reports are generated in the `coverage/` directory.

## 🏢 Development Workflow

This repository includes Cursor rules in `.cursor/rules/` that provide structured workflows:
- `create-prd.mdc`: Guidelines for creating Product Requirements Documents
- `generate-tasks.mdc`: Task list generation from PRDs
- `process-task-list.mdc`: Task management and completion protocols

## 📝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

[Add your license information here]
