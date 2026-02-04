# EventFinder - Event Discovery Platform

A modern event discovery platform built with React, TypeScript, and GraphQL. This project demonstrates proficiency in building production-ready applications with comprehensive testing, type safety, and CI/CD workflows.

## 🎯 Key Features

### User Experience
- **Smart Search**: Real-time search across events, venues, and artists
- **Advanced Filtering**: 
  - Category-based filtering (Concerts, Sports, Theatre, Comedy)
  - Dynamic price range slider
  - Sort by date, price, or name
- **Favorites System**: Persistent favorites using localStorage
- **Responsive Design**: Mobile-first approach with smooth animations
- **Accessibility**: Full keyboard navigation, ARIA labels, semantic HTML

### Technical Highlights
- **100% TypeScript**: Complete type safety across the codebase
- **Comprehensive Testing**: Unit and integration tests with Vitest + React Testing Library
- **GraphQL Integration**: Apollo Client with mock data via MSW
- **CI/CD Pipeline**: Automated testing and deployment via GitHub Actions
- **Modern Build**: Vite for lightning-fast HMR and optimized production builds

## 🏗️ Architecture

### Component Structure
```
src/
├── pages/
│   ├── Home.tsx              # Main event listing page
│   └── Home.test.tsx         # Comprehensive component tests
├── hooks/
│   └── useFavorites.ts       # Custom hook for localStorage management
├── apollo/
│   └── client.ts             # Apollo Client configuration
├── mocks/
│   ├── browser.ts            # MSW browser worker setup  
│   └── handlers.ts           # GraphQL mock handlers
├── test/
│   └── setup.ts              # Test environment configuration
├── App.tsx                   # Root component with routing
└── main.tsx                  # Application entry point
```

### Data Flow
1. **GraphQL Query** → Apollo Client requests events
2. **MSW Intercept** → Mock Service Worker returns mock data in dev
3. **State Management** → React hooks manage UI state
4. **localStorage** → Persists user favorites across sessions
5. **Filtering/Sorting** → Client-side data transformation

## 🚀 Tech Stack

**Core:**
- React 18.2 (with hooks, StrictMode)
- TypeScript 5.9 (strict mode)
- Vite 5.1 (build tool)

**Data Layer:**
- Apollo Client 3.8 (GraphQL)
- Mock Service Worker 1.2 (API mocking)

**Testing:**
- Vitest 4.0 (test runner)
- React Testing Library (component testing)
- @testing-library/user-event (interaction testing)

**CI/CD:**
- GitHub Actions (automated testing, TypeScript checking, deployment)
- Codecov integration (code coverage reporting)

**Routing & State:**
- React Router DOM 6.14
- Custom hooks for state management

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the app.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- Component rendering and state management
- User interactions (search, filter, sort, favorites)
- GraphQL query handling
- Error boundary behavior
- Accessibility features

## 🏗️ Development

### Available Scripts

```bash
npm run dev           # Start dev server (port 5173)
npm run build         # Production build
npm run preview       # Preview production build
npm test              # Run tests
npm run test:ui       # Launch Vitest UI
npm run test:coverage # Generate coverage report
```

### Key Files

- `vitest.config.ts` - Test configuration with coverage settings
- `tsconfig.json` - TypeScript compiler options (strict mode)
- `.github/workflows/ci.yml` - CI/CD pipeline configuration

## 🎨 Architecture Decisions

### Why GraphQL + Apollo Client?
- **Precise data fetching**: Only request the fields you need
- **Type safety**: Strong typing with TypeScript integration
- **Caching**: Built-in normalized cache reduces network requests
- **Developer experience**: Excellent devtools and error handling

### Why Mock Service Worker?
- **Network-level mocking**: Intercepts actual HTTP requests
- **Environment agnostic**: Same code works with mocks or real API
- **Testing friendly**: Reuse handlers in tests without duplication
- **Production-like**: Simulates real network behavior (latency, errors)

### Why Vite?
- **Speed**: Near-instant HMR and cold start (~100-300ms)
- **Native ESM**: Leverages browser-native module loading
- **Optimized builds**: Rollup-based production bundler
- **Modern defaults**: First-class TypeScript and JSX support

### Why localStorage for Favorites?
- **Simplicity**: No backend auth required for demo
- **Persistence**: Survives page refreshes
- **Privacy**: Data stays on user's device
- **Performance**: Instant read/write operations

### Why Vitest over Jest?
- **Vite integration**: Reuses Vite config and transforms
- **Speed**: 10x faster than Jest for our test suite
- **ESM native**: No configuration for ESM modules
- **Compatible**: Same API as Jest, easy migration

## 📊 Performance Considerations

- **Code splitting**: Routes loaded on-demand (ready for expansion)
- **Memoization**: Expensive computations cached (filtering/sorting)
- **Virtual scrolling ready**: Architecture supports pagination
- **Optimized re-renders**: Proper React key usage and memo patterns

## 🔒 Accessibility

- **Keyboard navigation**: All interactive elements accessible via keyboard
- **ARIA labels**: Proper labeling for screen readers
- **Semantic HTML**: Correct use of article, nav, section elements
- **Focus management**: Visual focus indicators on all controls
- **Color contrast**: WCAG AA compliant color choices

## 🚀 CI/CD Pipeline

### Automated Checks
1. **Testing**: Vitest runs all unit/integration tests
2. **Type Checking**: TypeScript compiler validates types
3. **Build Verification**: Ensures production build succeeds
4. **Multi-version**: Tests on Node 18.x and 20.x

### Deployment
- **Trigger**: Automatic on push to main branch
- **Target**: GitHub Pages
- **Process**: Build → Test → Deploy
- **Rollback**: Easy revert via Git tags

## 🎯 Project Highlights for Interviews

### Software Engineering Best Practices
✅ **Type Safety**: Full TypeScript with strict mode  
✅ **Testing**: Comprehensive test coverage with RTL  
✅ **CI/CD**: Automated testing and deployment  
✅ **Code Quality**: Clean, readable, well-documented code  
✅ **Git Workflow**: Meaningful commits, proper branching  

### Domain Relevance (Ticketmaster)
✅ **Event Discovery**: Core ticket/event platform features  
✅ **Search & Filter**: Essential for large event catalogs  
✅ **Favorites**: User personalization and engagement  
✅ **Responsive UI**: Mobile-optimized experience  
✅ **Scalable Architecture**: Ready for backend integration  

### Technical Skills
✅ React expertise (hooks, context, composition)  
✅ TypeScript proficiency (interfaces, generics, type guards)  
✅ GraphQL knowledge (queries, caching, optimization)  
✅ Testing skills (unit, integration, user interaction)  
✅ Modern tooling (Vite, Vitest, MSW, GitHub Actions)  

## 📈 Future Enhancements

See [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md) for the complete roadmap.

**Next Priority:**
- Real GraphQL backend integration
- User authentication (OAuth)
- Event detail pages with seat selection
- Purchase flow integration
- Advanced filtering (date range, location radius)
- Social sharing features
- Performance monitoring (Web Vitals)

## 📄 License

MIT License - feel free to use this project for learning or as a portfolio piece.

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome via issues or pull requests.

---

**Built by Ruidong Yang** | [GitHub](https://github.com/direktoronto)
