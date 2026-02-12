# Platzi Fake Store E-Commerce

A modern React e-commerce web application built with Vite, showcasing a clean UI and strong developer best practices.

## Features

- ✅ Product browsing by category
- ✅ Search, filter, and sort functionality
- ✅ Pagination on product listings
- ✅ Full shopping cart with quantity management
- ✅ Responsive design (mobile + desktop)
- ✅ Loading, error, and empty states
- ✅ Cart persistence (localStorage)

## Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **State Management**: Zustand (lightweight, simple)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **API**: Platzi Fake Store REST API

## Setup & Installation

### Prerequisites
- Node.js 16+ and npm/yarn

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## Environment Variables

None required. The app uses the public Platzi Fake Store API.

## Architecture Decisions

### State Management (Zustand)
Chose Zustand over Redux/Context for:
- No boilerplate
- Fast performance
- Easy debugging
- Perfect for cart use case

### Data Fetching (Custom Hook)
Custom `useFetch` hook provides:
- Centralized loading/error handling
- Easy refetch capability
- Reusable across components

### Search Implementation
Client-side search for:
- Instant feedback
- No extra API calls
- Works offline (with cached data)

### Pagination vs Infinite Scroll
Pagination chosen for:
- Better UX on larger catalogs
- User control over data loading
- Traditional e-commerce pattern

## Known Limitations

- API occasionally returns inconsistent image URLs (handled with fallback)
- No user authentication (not required)
- No checkout flow (out of scope)

## Future Improvements

- Server-side search for larger datasets
- Product recommendations
- User reviews & ratings
- Wishlist feature