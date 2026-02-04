# React Portfolio

Personal portfolio site built with React, TypeScript, and GraphQL. I wanted to experiment with some technologies I've been learning, particularly around GraphQL and modern build tools.

## What I Built

This is a simple portfolio app where I'm showcasing some of my projects. The main things I focused on:

- Using GraphQL with Apollo Client instead of REST - wanted to see how it compares
- Added TypeScript gradually (some files still in JSX, working on converting them)
- Vite instead of Create React App - the build speed difference is pretty noticeable
- Mock Service Worker for API mocking - actually really useful for development
- Search/filter functionality for the projects list
- Keeping it accessible (keyboard navigation, ARIA labels, etc.)

## Tech Stack

**Frontend:**
- React 18 with hooks
- TypeScript (migrating from JavaScript)
- React Router for navigation
- CSS modules for styling

**Data Layer:**
- Apollo Client for GraphQL
- Mock Service Worker (MSW) for dev environment

**Build:**
- Vite - way faster than webpack
- ESLint for code quality

## Running Locally

## Running Locally

```bash
npm install
npm run dev
```

The app should open at `http://localhost:5173`. 

Note: The GraphQL queries are mocked using MSW, so there's no backend server needed. You can see the mock responses in `src/mocks/handlers.js`.

## Project Structure

```
src/
├── apollo/          # Apollo Client setup
├── mocks/           # MSW mock handlers
├── pages/           # Page components
│   ├── Home.tsx     # Main page (TypeScript)
│   └── Home.jsx     # Old version (will remove)
├── App.jsx          # Root component
└── main.jsx         # Entry point
```

## Why These Choices?

**GraphQL over REST:** I wanted to learn GraphQL properly. The nice thing is you only fetch what you need - no over-fetching. Apollo Client's caching is also pretty solid.

**Vite:** Tried it after hearing about the speed improvements. The HMR is instant compared to webpack, and the build times are way faster.

**MSW:** Found this while looking for better mocking solutions. It intercepts requests at the network level, so the code works the same whether you're using mocks or a real API. Makes testing easier too.

**TypeScript:** Adding it incrementally. Started with the new components (Home.tsx) and will gradually convert the rest. Helps catch bugs early.

## What's Next

See [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) for planned features. Main things on my list:
- Finish TypeScript migration
- Add proper testing (Jest + React Testing Library)
- Connect to a real GraphQL backend
- Better error handling
- CI/CD pipeline

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build

Built with React, GraphQL, and TypeScript.
