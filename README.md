# 🍽️ Smart Residence Frontend

A modern, responsive frontend application for Smart Residence management built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **🚀 Next.js 12.x** with Pages Router for optimal performance
- **📘 TypeScript** for type safety and better developer experience
- **🎨 Tailwind CSS v3** with custom design system
- **⚡ React Query** (TanStack Query) for efficient data fetching
- **🔧 Axios** HTTP client with interceptors and error handling
- **🧩 Atomic Design** component architecture
- **🛡️ ESLint & Prettier** for code quality and consistency
- **🔒 Authentication middleware** with route protection
- **📱 Responsive Design** optimized for all devices
- **🎭 Custom hooks** and utilities for reusable logic

## 🏗️ Project Structure

```
src/
├── components/          # UI Components (Atomic Design)
│   ├── atoms/          # Basic building blocks (Button, Input, Card)
│   ├── molecules/      # Simple component groups
│   ├── organisms/      # Complex component sections
│   ├── pages/          # Page-specific components
│   └── templates/      # Page layouts
├── hooks/              # Custom React hooks
│   └── api.ts         # API-related hooks
├── middleware/         # Next.js middleware
│   └── auth.ts        # Authentication & route protection
├── pages/              # Next.js pages (routing)
│   ├── _app.js        # App configuration
│   └── index.js       # Homepage
├── styles/             # Global styles
│   ├── globals.css    # Tailwind directives & global styles
│   └── variables.css  # CSS custom properties
├── types/              # TypeScript type definitions
│   └── index.ts       # Shared types
├── utils/              # Utility functions
│   ├── api.ts         # Axios client configuration
│   ├── browser-logger.ts # Browser-safe logging
│   ├── cn.ts          # Class name utility
│   ├── id.ts          # ID generation utilities
│   ├── query-client.ts # React Query configuration
│   └── react-query.tsx # React Query provider
└── constants/          # Application constants
    └── index.ts       # API endpoints, configurations
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or later
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd smart-res-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_APP_NAME=Smart Residence
   NEXT_PUBLIC_LOG_LEVEL=info
   ```

### Development

```bash
# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Colors

- **Primary**: Red palette (50-900) for brand elements
- **Secondary**: Gray/Slate palette for neutral elements
- **Semantic**: Success, Warning, Error, Info colors

### Typography

- **Font Family**: Inter (primary), Fira Code (monospace)
- **Responsive**: Base 16px with responsive scaling

### Components

- **Atomic Design**: Scalable component architecture
- **Reusable**: Consistent props and styling
- **Accessible**: ARIA labels and keyboard navigation

## 🔧 API Integration

### Axios Client

```typescript
import { apiClient } from '@/utils/api';

// GET request
const data = await apiClient.get('/users');

// POST request
const newUser = await apiClient.post('/users', userData);

// File upload
const result = await apiClient.upload('/upload', formData);
```

### React Query Hooks

```typescript
import { useUsers, useCreateUser } from '@/hooks/api';

// Fetch data
const { data: users, isLoading, error } = useUsers();

// Mutations
const createUser = useCreateUser();
await createUser.mutateAsync(userData);
```

## 🛡️ Authentication

Protected routes are automatically secured using Next.js middleware:

```typescript
// Protected pages
const protectedRoutes = ['/dashboard', '/profile', '/admin'];

// Public pages
const publicRoutes = ['/', '/login', '/register'];
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run type-check   # TypeScript type checking
npm run lint         # ESLint code linting
npm run format       # Prettier code formatting
```

## 🔄 Development Workflow

1. **Feature Branch**

   ```bash
   git checkout -b feature/new-feature
   ```

2. **Development**

   ```bash
   npm run dev
   npm run type-check
   npm run lint
   ```

3. **Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

## 📚 Documentation

- **[Tailwind Setup](./TAILWIND-SETUP.md)** - Tailwind CSS configuration guide
- **[Axios & React Query](./AXIOS-REACT-QUERY.md)** - API integration guide
- **[Project Setup](./SETUP.md)** - Detailed setup instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Ensure all checks pass
6. Submit a pull request

---

**Built with ❤️ for modern Smart Residence management**
