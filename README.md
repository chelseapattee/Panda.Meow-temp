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

## 🎨 User Interface Overview

### **End-User Interface**

#### **Public Pages & Navigation**
- **Landing Page** (`/`): Clean introduction with personal branding, featuring Chelsea's name, role, and navigation to projects/contact
- **Projects Gallery** (`/projects`): Grid layout displaying project cards with cover images and titles
- **Project Detail** (`/projects/:id`): Individual project showcase pages
- **Contact Page** (`/contact`): Contact form and information
- **About Page** (`/about`): Personal/professional background

#### **Navigation Design**
- **Responsive Navbar**: Logo (letter "C" in branded SVG), company name "CHELSEA PATTEE"
- **Smart Project Navigation**: When viewing project details, "Projects" becomes a dropdown showing all available projects
- **Mobile-First**: Hamburger menu for mobile devices with backdrop overlay
- **Visual States**: Active page highlighting, hover states

#### **Visual Design System**
- **Typography**: Custom fonts (GT Haptik, Basis Grotesque) for professional aesthetic
- **Color Scheme**: Purple/indigo branding (#4F46E5) with clean white backgrounds
- **SCSS Architecture**: Component-specific styling with shared font imports
- **Responsive Grid**: Flexible project card layout adapting to screen sizes

### **Admin Interface**

#### **Authentication Flow**
- **Protected Route**: `/admin` requires email/password authentication via Supabase
- **Session Management**: Persistent login sessions with logout functionality
- **Access Control**: All admin operations validate session before proceeding

#### **Admin Dashboard Features**
- **Navigation Tabs**: Projects view, Add Project, Edit Mode, Logout
- **Project Management**: Full CRUD operations with rich form interface
- **File Management**: Multi-image upload with Supabase Storage integration
- **UX Features**: Loading states, error handling, accessibility, delete protection

#### **User Experience Features**
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages with ARIA live regions
- **Accessibility**: Proper form labels, focus management, keyboard navigation
- **Success Feedback**: Confirmation messages for completed actions
- **Delete Protection**: Confirmation modal for destructive actions

## 🔄 User Flows

**Public Users**: Landing → Projects → Individual Project Details → Contact  
**Admins**: Login → Dashboard → Add/Edit/Delete Projects → Manage Images → Logout

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
