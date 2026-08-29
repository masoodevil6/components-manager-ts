---
description: Build and test workflow
globs: "**/*"
---

# Build and Test Workflow

## Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

## Build
// turbo
1. Build for production:
   ```bash
   npm run build
   ```

## Testing
// turbo
1. Run tests:
   ```bash
   npx vitest
   ```

## Code Quality
// turbo
1. Run ESLint:
   ```bash
   npx eslint src/
   ```

2. Run Prettier:
   ```bash
   npx prettier --write src/
   ```
