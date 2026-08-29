---
description: Project directory structure and organization
globs: "**/*"
---

# Directory Structure

## Project Root
```
master/
├── .windsurf/          # Windsurf configuration and rules
├── .idea/              # IDE configuration
├── src/                # Source code
├── node_modules/       # Dependencies
├── index.html          # Entry HTML
├── package.json        # Package configuration
└── tsconfig.json       # TypeScript configuration
```

## Source Directory (`src/`)
```
src/
├── core/               # Core framework classes
│   ├── component/      # Component-related classes
│   ├── language/       # Language/i18n utilities
│   ├── ComponentBase.ts
│   ├── ReactiveElement.ts
│   ├── Observable.ts
│   ├── Language.ts
│   └── AppConfig.ts
├── tools/              # Component implementations
│   ├── components/     # UI components
│   ├── icons/          # Icon components
│   └── tools.ts        # Tools utilities
├── router/             # Routing system
│   ├── core/
│   ├── interfaces/
│   └── pages/
├── utils/              # Utility functions
├── fonts/              # Font assets
├── langs/              # Language files
│   ├── lang_en/
│   ├── lang_fa/
│   ├── En.ts
│   └── Fa.ts
├── styles/             # CSS/SCSS styles
└── app.ts              # Application entry
```

## Core Directory Guidelines
- فقط framework-level classes
- بدون dependencies به tools یا router
- Generic و reusable

## Tools Directory Guidelines
- Implementation کامپوننت‌های concrete
- ارث‌بری از classes در `core/`
- هر کامپوننت در فایل جداگانه

## File Organization
- One class per file (در most cases)
- نام فایل = نام class
- Grouping related utilities در یک فایل

## Import Paths
- استفاده از relative paths برای imports در همان directory level
- استفاده از absolute paths برای cross-module imports

```typescript
// ✅ Good - same directory
import { Observable, Scope } from "./Observable";

// ✅ Good - parent directory
import { AppConfig } from "../AppConfig";
```
