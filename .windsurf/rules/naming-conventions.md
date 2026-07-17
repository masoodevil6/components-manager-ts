---
description: Naming conventions and code style guidelines
globs: "**/*.ts"
---

# Naming Conventions

## Files and Directories
- PascalCase برای نام فایل‌های class-based (مثل `ComponentBase.ts`)
- camelCase برای utility files (مثل `tools.ts`)
- kebab-case برای asset files

## Classes
- PascalCase برای نام کلاس‌ها
- Abstract classes با prefix مشخص

```typescript
// ✅ Good
export class ComponentBase { }
export class ReactiveElement { }

// ❌ Bad
export class componentBase { }
export class reactive_element { }
```

## Properties and Variables
- camelCase برای public properties
- `_` prefix برای private properties
- `GOG_` prefix برای framework-level constants و types

```typescript
// ✅ Good
_COMPONENT_NAME: string;
_COMPONENT_ID: string | null;
_renderScope: Scope;

// ❌ Bad
component_name: string;
componentId: string;
```

## Constants
- UPPER_SNAKE_CASE برای constants
- `GOG_` prefix برای framework constants

```typescript
// ✅ Good
GOG_ComponentBasicConfigs_Component_parts
MAX_RETRY_COUNT

// ❌ Bad
componentBasicConfigs
gogComponentBasicConfigs
```

## Methods
- camelCase برای public methods
- `_` prefix یا `#` برای private methods

```typescript
// ✅ Good
renderComponent(config: TProp, methods: TMethods) { }
#getReadyComponentMethods(methods: Record<string, any>) { }

// ❌ Bad
RenderComponent(config: any) { }
get_ready_component_methods() { }
```

## Types and Interfaces
- PascalCase برای type names
- توصیفی و معنادار

```typescript
// ✅ Good
type ComponentPropKeys<TPropTypes> = keyof TPropTypes;
type ComponentCallBackType<TComponentArgs, TDataArgs> = ...;

// ❌ Bad
type propKeys = ...;
type callback = ...;
```

## Generic Parameters
- Naming convention مشخص:
  - `T` برای generic type اول
  - `TProp`, `TSchema`, `TTemplate`, `TMethods` برای component generics
  - `K` برای key types
  - `U` برای utility types

```typescript
// ✅ Good
<TProp, TSchema, TTemplate, TMethods>
<K in keyof T>

// ❌ Bad
<A, B, C, D>
```

## Comments
- استفاده از Persian برای comments راهنما
- استفاده از English برای technical documentation

```typescript
//--------------------------------------------------
// GET Ready ==> _COMPONENT_METHODS
//--------------------------------------------------
```
