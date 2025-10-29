# Ticket Management App - React Version

## Frameworks and Libraries Used
- React 18 (with Vite for build tool)
- React Router v6 for routing
- React Toastify for notifications
- UUID for generating ticket IDs (uuid library)
- CSS for styling (no additional UI library to keep pure)

## Setup and Execution Steps
1. Create a new React app with Vite: `npm create vite@latest ticket-app-react -- --template react`
2. cd ticket-app-react
3. npm install react-router-dom react-toastify uuid
4. Replace src/ with the provided code files.
5. npm run dev to start the app at http://localhost:5173

## Instructions for Switching Versions
This is the React version. For Vue or Twig, see their respective folders/implementations.

## UI Components and State Structure
- Components: Landing, Login, Signup, Dashboard, Tickets (with modal for create/edit)
- State: Local state for forms, useEffect for localStorage sync.
- Global: No Redux, useContext not used; direct localStorage access.
- Protected routes using a wrapper component.

## Accessibility and Known Issues
- Semantic HTML used (main, section, article, nav).
- Alt text on images (placeholders).
- Focus states with outline.
- Contrast checked for colors.
- Known issue: No real backend, localStorage clears on clear cache.
- Test user: Signup with any email/pass, then login with same.

Example test user credentials:
- Email: admin@example.com
- Password: pass123 (after signup)
