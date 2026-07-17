---
description: TypeScript coding standards and type system guidelines
globs: "**/*.ts"
---

# TypeScript Standards

## Type Definitions
- استفاده از type aliases به جای interfaces برای تعریف types
- استفاده از generic types برای reusability
- استفاده از `GOG_` prefix برای type definitions مربوط به فریمورک

```typescript
// ✅ Good
export type GOG_TypeOf<T> = T;
export type GOG_ValueOf<T> = T[keyof T]

// ❌ Bad
export interface MyInterface {
  value: any;
}
```

## Generic Patterns
- استفاده از naming convention مشخص برای generic parameters:
  - `TProp` برای properties
  - `TSchema` برای schema definitions
  - `TTemplate` برای template definitions
  - `TMethods` برای method definitions

## Function Definitions
- استفاده از arrow functions برای inline callbacks
- استفاده از regular functions برای class methods
- type definitions برای callback functions

```typescript
// ✅ Good
export type ComponentCallBackType<TComponentArgs, TDataArgs> = (
    event: Event,
    dataArgs: TDataArgs | null,
    componentArgs: TComponentArgs | null,
) => void;
```

## Strict Type Checking
- استفاده از `any` فقط در موارد ضروری با comment توضیحی
- استفاده از `unknown` به جای `any` زمانی که type مشخص نیست
- استفاده از type guards برای runtime type checking

## Export Patterns
- استفاده از named exports به جای default exports
- export کردن type definitions همراه با implementation

```typescript
// ✅ Good
export type { IComponentProp, defineComponentPatterns };
export { ComponentBase };

// ❌ Bad
export default ComponentBase;
```
