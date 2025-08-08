# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Portfolio App

## Local Development Requirements (Supabase Backend)

### Prerequisites
- **Node.js** and **npm** (for React app and Supabase CLI)
- **Supabase CLI** (for local backend)
- **Docker Desktop** (required for running Supabase locally)

### Setup Steps

1. **Install Supabase CLI**
   - With npm:
     ```sh
     npm install -g supabase
     ```
   - Or with Homebrew (macOS):
     ```sh
     brew install supabase/tap/supabase
     ```

2. **Install Docker Desktop**
   - Download and install from: https://www.docker.com/products/docker-desktop/
   - Start Docker Desktop before running Supabase.

3. **Initialize Supabase (if not already done)**
   ```sh
   supabase init
   ```

4. **Start Supabase local development environment**
   ```sh
   supabase start
   ```
   - Supabase Studio will be available at http://localhost:54323
   - API URL will be http://localhost:54321

5. **Configure Environment Variables**
   - Create `supabase/.env` with:
     ```env
     SUPABASE_URL=http://localhost:54321
     SUPABASE_ANON_KEY=your-local-anon-key
     SUPABASE_SERVICE_ROLE_KEY=your-local-service-role-key
     ```
   - Create or update `portfolio/.env.local` with:
     ```env
     REACT_APP_SUPABASE_URL=http://localhost:54321
     REACT_APP_SUPABASE_ANON_KEY=your-local-anon-key
     ```
   - Get your keys by running `supabase status` and copying the values for API URL, anon key, and service role key.

6. **Run the React App**
   ```sh
   cd portfolio
   npm install
   npm start
   ```

---

## Existing Instructions

(Keep your previous instructions for running the React app, testing, etc. below this new section.)
