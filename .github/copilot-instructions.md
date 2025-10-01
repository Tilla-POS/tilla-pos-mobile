# Copilot Instructions for TillaPos Mobile

## Project Overview
This is a React Native 0.79.2 TypeScript project for a Point of Sale (POS) system mobile application. The project uses the latest React Native architecture with New Architecture (Fabric/Turbo Modules) support enabled by default.

## Key Architecture Patterns

### React Native Setup
- **TypeScript**: Fully configured with `@react-native/typescript-config`
- **New Architecture**: Fabric and Hermes enabled by default in both platforms
- **Bundle ID**: `com.tillapos` for Android, `TillaPos` for iOS
- **Entry Point**: `App.tsx` is the main component, registered as "TillaPos"

### Native Platform Structure
- **Android**: Kotlin-based with `MainActivity.kt` and `MainApplication.kt` in `com.tillapos` package
- **iOS**: Swift-based with modern `AppDelegate.swift` using `ReactNativeDelegate` pattern
- **CocoaPods**: Managed via Bundler with specific version constraints for stability

## Development Workflows

### Essential Commands
```bash
# Install iOS dependencies (required after cloning or updating native deps)
bundle install && bundle exec pod install

# Start Metro bundler
npm start

# Run on platforms
npm run android  # Android
npm run ios      # iOS

# Development utilities
npm run lint     # ESLint with @react-native config
npm test         # Jest with react-native preset
```

### Platform-Specific Setup
- **iOS**: Always run `bundle exec pod install` after native dependency changes
- **Android**: Uses Gradle with standard React Native build configuration
- **Ruby Dependencies**: Specific version constraints in `Gemfile` to avoid build issues

## Code Conventions

### Styling & Formatting
- **Prettier Config**: Arrow parens avoided, bracket same line, no bracket spacing, single quotes, trailing commas
- **ESLint**: Uses `@react-native` configuration for React Native best practices
- **TypeScript**: Strict mode with React Native optimized settings

### Component Patterns
- Functional components with TypeScript interfaces for props
- `useColorScheme` hook for dark/light mode theming
- React Native's built-in `Colors` from `react-native/Libraries/NewAppScreen`

## Testing Strategy
- **Jest**: Configured with `react-native` preset
- **React Test Renderer**: Used for component snapshot testing
- Test files in `__tests__/` directory following React Native conventions

## Build & Deployment Notes
- **Metro**: Default configuration with React Native 0.79.2
- **Babel**: Uses `@react-native/babel-preset` for optimal bundling
- **Node Version**: Requires Node.js >= 18
- **New Architecture**: Ready for Fabric and TurboModules when needed

## File Organization
- Root-level `App.tsx` serves as main entry point
- Platform-specific code in `android/` and `ios/` directories
- Native modules auto-linked via `PackageList` (Android) and React Native pods (iOS)
- No custom source directory structure yet - follows standard React Native bootstrap

When working on this codebase, prioritize React Native best practices, maintain TypeScript strict typing, and ensure both iOS and Android compatibility. The project is set up for modern React Native development with all current tooling standards.