---
description: Code formatting and style guidelines
globs: "**/*.ts"
---

# Code Style Guidelines

## Formatting
- Indentation: 4 spaces
- Semicolons: required
- Quotes: double quotes
- Trailing commas: avoid

## Imports
- Imports در بالای فایل
- Grouping imports: external → internal
- استفاده از absolute paths با `@/` alias

```typescript
// ✅ Good
import { Observable, Scope } from "./Observable";
import { ReactiveElement } from "./ReactiveElement";
import { AppConfig } from "./AppConfig";

// ❌ Bad
import {Observable,Scope} from './Observable'
import {ReactiveElement} from './ReactiveElement'
```

## Spacing
- Space بعد از کاما
- Space قبل و بعد از operators
- No space قبل semicolon

```typescript
// ✅ Good
const result = a + b;
const obj = { key: value, other: value2 };

// ❌ Bad
const result=a+b;
const obj={key:value,other:value2};
```

## Braces
- Opening brace در همان line
- Closing brace در line جدید
- استفاده از braces حتی برای single-line blocks

```typescript
// ✅ Good
if (condition) {
    doSomething();
}

// ❌ Bad
if (condition)
    doSomething();

if (condition) doSomething();
```

## Line Length
- حداکثر 120 کاراکتر در هر line
- Break کردن long lines در operators

## Comments
- `//` برای single-line comments
- `/* */` برای multi-line comments
- `///` برای section separators

```typescript
/// ----------------------------------------------------
/// COMPONENT PATTERN
/// ----------------------------------------------------
```

## Template Literals
- استفاده از backticks برای string interpolation
- استفاده از regular strings برای static text

```typescript
// ✅ Good
const id = `__component-${name}__${part}__${randomId}`;
const staticText = "Hello World";

// ❌ Bad
const id = "__component-" + name + "__" + part + "__" + randomId;
```

## Null Checking
- استفاده از `===` و `!==` برای comparisons
- استفاده از optional chaining (`?.`) برای safe property access

```typescript
// ✅ Good
if (value === null || value === undefined) { }
const prop = obj?.property?.nested;

// ❌ Bad
if (value == null) { }
const prop = obj && obj.property && obj.property.nested;
```

## Type Assertions
- استفاده از `as` برای type assertions
- پرهیز از angle-bracket syntax

```typescript
// ✅ Good
return value as T;

// ❌ Bad
return <T>value;
```
