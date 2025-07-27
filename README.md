# 🍽️ Smart Residence Frontend

A modern, production-ready dashboard for residence management, built with Next.js, TypeScript, Tailwind CSS, MUI, React Query, and Atomic Design.

## ✨ Features

- **Next.js 14+** with Pages Router
- **TypeScript** for type safety
- **Tailwind CSS v3** and **MUI** for modern UI
- **Atomic Design**: Atoms, Molecules, Organisms, Templates
- **React Query** for data fetching, caching, and mutation
- **Axios** with interceptors, refresh token, and HTTP-only cookie authentication
- **Authentication**: Login, logout, protected routes, role-based redirect, Next.js middleware
- **User & Feedback Management**: CRUD, pagination, real-time table update
- **File Upload**: Multi-image upload with preview
- **Toast Notifications**: react-toastify for UX feedback
- **Error Handling**: Global and mutation-level
- **Storybook**: Full coverage for all atomic components, with mock data and Tailwind styling
- **Accessibility**: ARIA, keyboard navigation, a11y best practices
- **ESLint & Prettier**: Code quality and formatting
- **Responsive Design**: Mobile-first, adaptive layouts

## 🏗️ Project Structure

```
src/
├── components/          # UI Components (Atomic Design)
│   ├── atoms/          # Basic building blocks (Button, Input, Card, etc.)
│   ├── molecules/      # Simple component groups
│   ├── organisms/      # Complex component sections (Table, Sidebar, etc.)
│   ├── templates/      # Page layouts
├── hooks/              # Custom React hooks (login, feedback, user, etc.)
├── api/                # API hooks and axios logic
├── middleware/         # Next.js middleware for route protection
├── pages/              # Next.js pages (routing)
├── styles/             # Global styles (Tailwind, custom CSS)
├── constants/          # App constants, endpoints, messages
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (query-client, logger, etc.)
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
   NEXT_PUBLIC_APP_NAME=Smart Resident
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

- **Atomic Design**: Atoms, Molecules, Organisms, Templates
- **Tailwind CSS**: Utility-first, custom theme, responsive
- **MUI**: Material UI components, accessibility
- **Storybook**: All components have stories with mock data and Tailwind background

## 🔧 API Integration

- **Axios**: Centralized instance, interceptors, withCredentials, refresh token logic
- **React Query**: Query/mutation hooks, cache, optimistic update
- **File Upload**: Multi-image upload, preview, FormData

## 🛡️ Authentication & Security

- **Login/Logout**: Secure, HTTP-only cookies
- **Refresh Token**: Automatic retry on 401, interceptor logic
- **Protected Routes**: Next.js middleware, role-based redirect
- **No token in localStorage**: All auth via cookies

## � Storybook

- Run: `npm run storybook`
- All atomic components, molecules, organisms, templates have stories
- Mock data, Tailwind background, a11y best practices

## ♿ Accessibility (a11y)

- ARIA labels, keyboard navigation, focus management
- No `aria-hidden` on focused elements
- Use of MUI and Tailwind for accessible UI

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
