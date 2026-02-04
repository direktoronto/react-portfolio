# EventFinder 🎫

A React event discovery app I built to learn GraphQL, TypeScript, and modern testing practices. Think of it as a mini-Ticketmaster where you can browse concerts, sports games, and shows.

## What It Does

Search for events, filter by category (concerts, sports, theatre, comedy), adjust price range, and save your favorites. Everything updates in real-time as you interact with the filters.

Right now it uses mock data (no real backend), but the architecture is set up so I could swap in a real API without changing much code.

## Tech Stack

**Frontend:**
- React 18 with TypeScript (strict mode enabled)
- Apollo Client for GraphQL
- React Router for navigation
- Vite for dev server and builds

**Testing:**
- Vitest + React Testing Library
- 11 tests covering the main flows
- Mock Service Worker to simulate API calls

**Deployment:**
- GitHub Actions runs tests on every push
- Auto-deploys to GitHub Pages if tests pass

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` and you should see 6 mock events (Taylor Swift, Raptors game, Hamilton, etc.)

## Running Tests

```bash
npm test              # Run all tests
npm run test:ui       # Open test UI (pretty cool visualization)
npm run test:coverage # See what's covered
```

## Project Structure

```
src/
├── pages/Home.tsx           # Main page with all the event cards
├── hooks/useFavorites.ts    # Manages favorites in localStorage  
├── apollo/client.ts         # GraphQL setup
├── mocks/handlers.ts        # Mock API responses (6 fake events)
└── test/setup.ts            # Test configuration
```

## How It Works

The app makes a GraphQL query for events, which gets intercepted by Mock Service Worker (MSW) and returns fake data. Apollo Client caches the response so it doesn't re-fetch on every render.

Favorites are stored in your browser's localStorage, so they stick around when you refresh the page.

All the filtering (search, category, price, sort) happens client-side. In a real app with thousands of events, you'd do this on the server, but for a demo with 6 events it's overkill.

## Why I Built It This Way

**GraphQL + Apollo Client**: I wanted to learn GraphQL, and Apollo makes it really easy. The automatic caching is nice - you don't have to think about it.

**Mock Service Worker**: I didn't want to spin up a real backend, but I also didn't want to just fake the API calls with `fetch` mocks. MSW intercepts actual network requests, so the code is closer to production.

**TypeScript**: Honestly, after using it for a while, I can't go back. The autocomplete and compile-time error catching save so much debugging time.

**Vitest over Jest**: It's just faster and works better with Vite. The test UI is also really nice for seeing what's failing.

**localStorage for Favorites**: Easiest way to persist data without a backend. In a real app you'd store this server-side with user accounts, but for a demo this works fine.

## Things I Learned

- Setting up GraphQL queries with Apollo (the `useQuery` hook is great)
- Using Mock Service Worker to simulate APIs
- Writing tests with React Testing Library (testing user interactions vs implementation details)
- TypeScript strict mode (it forces you to handle null/undefined everywhere)
- GitHub Actions for CI/CD (auto-runs tests on every push)

## Known Limitations

- No real backend (all data is hardcoded in `mocks/handlers.ts`)
- Only 6 events (enough to demo the features)
- No user authentication (favorites are device-specific)
- Filtering happens client-side (fine for 6 events, wouldn't scale to thousands)

## What I'd Add Next

If I kept working on this:
- Connect to a real backend (maybe Supabase or Firebase)
- Add event detail pages
- User authentication
- Server-side filtering and pagination
- Date range filtering
- Map view showing event locations

## License

MIT - feel free to use this for learning or your own projects.

---

Built by [Ruidong Yang](https://github.com/direktoronto)
