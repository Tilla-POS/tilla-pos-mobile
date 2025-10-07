# Copilot Instructions — TillaPos Mobile

This is a React Native 0.79.x TypeScript mobile POS application with New Architecture (Fabric/Hermes) enabled. Use these instructions to understand the project's architecture, patterns, and workflows for effective development.

## Architecture Overview

**Data Flow**: App.tsx → QueryClient + ThemeProvider → RootNavigator → Auth-gated navigation (AuthStack vs BottomTabNavigator)
**State Management**: TanStack Query for server state, AsyncStorage for persistence, React Context for theming/auth
**Styling**: Custom design system with theme tokens (`src/theme/`) supporting light/dark modes
**API Layer**: Axios with request/response interceptors for token management and consistent error handling

## Essential Development Commands

```bash
# Initial setup (after clone or native dep changes)
npm install
bundle install && bundle exec pod install  # iOS only

# Development workflow
npm start                 # Metro bundler
npm run android          # Build and run Android
npm run ios             # Build and run iOS (after pod install)

# Quality checks
npm run lint            # ESLint with @react-native config
npm test               # Jest with react-native preset
```

## Key Architectural Patterns

**Navigation Structure**:

- `RootNavigator.tsx` handles auth-gated routing using `useAuth()` hook
- Authenticated: `BottomTabNavigator` (Cashier/Inventory/Reports/Receipts/Profile)
- Unauthenticated: `AuthStack` (Login/Register)

**Theme System**:

- `ThemeContext` manages light/dark/system modes with AsyncStorage persistence
- `useTheme()` hook provides theme tokens + utilities (typography, spacing, shadows, etc.)
- All colors/spacing from `src/theme/` tokens, not hardcoded values

**API Architecture**:

- `src/services/api.ts`: Axios instance with automatic token injection via interceptors
- `src/services/authService.ts`: Authentication methods using typed responses
- `useAuth` hook: TanStack Query integration for auth state management with optimistic updates

**Environment Configuration**:

- `src/config/env.config.ts`: Typed config object from `@env` module
- `types/env.d.ts`: TypeScript declarations for environment variables
- Babel plugin `react-native-dotenv` for `.env` file support

## Project-Specific Conventions

1. **Component Structure**: All screens are functional components in `src/screens/` with StyleSheet.create
2. **Icon Usage**: Lucide React Native icons with consistent props pattern (`{color, size}: IconProps`)
3. **Styling Approach**: Use `useTheme()` hook, avoid hardcoded colors/spacing
4. **Network Calls**: Centralize in `src/services/`, use TanStack Query for caching/synchronization
5. **Type Safety**: Strict TypeScript with interfaces for all API responses and component props

## Critical Integration Points

**Theme Integration**: Components must use `const {theme, isDark, typography} = useTheme()` instead of direct theme imports
**Navigation Props**: Use navigation prop typing from React Navigation v7 patterns
**API Error Handling**: Response interceptor in `api.ts` handles token refresh and error standardization
**AsyncStorage Keys**: Follow existing patterns (e.g., `@app_theme_mode`, `accessToken`)

## Development Workflow

1. **Native Changes**: Always run `bundle exec pod install` before iOS development
2. **State Updates**: Use TanStack Query mutations with `onSuccess` callbacks for cache invalidation
3. **Styling**: Reference existing screen implementations for layout patterns
4. **Environment**: Set variables in `.env` file, type in `env.d.ts`, consume via `Config` object

## Key Files for Reference

- **App Structure**: `App.tsx`, `src/navigation/RootNavigator.tsx`
- **Authentication**: `src/hooks/useAuth.ts`, `src/services/authService.ts`
- **Theming**: `src/context/ThemeContext.tsx`, `src/hooks/useTheme.ts`
- **API Layer**: `src/services/api.ts`, `src/config/env.config.ts`
- **Screens**: `src/screens/CashierScreen.tsx` (simple example), `src/navigation/BottomTabNavigator.tsx` (icons/structure)
