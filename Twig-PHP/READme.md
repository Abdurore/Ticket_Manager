# Ticket Management App - Twig Version

## Frameworks and Libraries Used
- PHP 8.1+
- Twig 3 for templating
- Pure JavaScript for client-side logic (auth, CRUD, toasts)
- UUID for ticket IDs (via JavaScript)
- Composer for Twig dependency

## Setup and Execution Steps
1. Install PHP 8.1+ and Composer.
2. Create project folder: `ticket-app-twig`.
3. Run `composer require "twig/twig:^3.0"` in the project folder.
4. Copy the provided files into the folder structure.
5. Run `php -S localhost:8000` from the project root.
6. Access `http://localhost:8000` in a browser.

## Instructions for Switching Versions
This is the Twig/PHP version. For React or Vue, implement separately.

## UI Components and State Structure
- Pages: Handled via `index.php` with `$_GET['page']` routing.
- Templates: `templates/` folder (`landing.twig`, `login.twig`, `signup.twig`, `dashboard.twig`, `tickets.twig`).
- State: Managed in `localStorage` via `public/js/app.js` for users and tickets.
- Protected routes: Checked in `app.js` with redirects to `/auth/login`.

## Accessibility and Known Issues
- Semantic HTML with `<header>`, `<main>`, `<section>`, `<nav>`, `<article>`.
- ARIA labels for forms, cards, and buttons.
- Visible focus states (yellow outline) in CSS.
- Contrast checked for green theme (`#22c55e` on white).
- Known issue: `localStorage` clears on cache clear; no real backend.
- Test user: Signup with any email/password, then login with same.

Example test user credentials:
- Email: test@example.com
- Password: pass123 (after signup)

