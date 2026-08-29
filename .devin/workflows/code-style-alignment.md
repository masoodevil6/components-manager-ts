---
description: Code alignment style for object properties and variable lists
tags: [code-style, formatting, alignment]
---

# Code Alignment Style Rule

When defining a list of object properties, variables, or key-value pairs, **all values must be vertically aligned** using spaces.

## Rule

1. Find the longest key in the group
2. Add spaces after shorter keys so all colons `:` align
3. Values should start at the same column

## Examples

### ❌ Incorrect
```typescript
prop_borderBackgroundColor: "prop_borderBackgroundColor",
prop_borderColor: "prop_borderColor",
prop_borderClass: "prop_borderClass",
prop_borderStyles: "prop_borderStyles",
prop_borderWidth: "prop_borderWidth",
prop_borderRadius: "prop_borderRadius",
```

### ✅ Correct
```typescript
prop_borderBackgroundColor:     "prop_borderBackgroundColor",
prop_borderColor:               "prop_borderColor",
prop_borderClass:               "prop_borderClass",
prop_borderStyles:              "prop_borderStyles",
prop_borderWidth:               "prop_borderWidth",
prop_borderRadius:              "prop_borderRadius",
```

## Applies To

- Object property definitions
- Enum member definitions  
- Constant declarations
- Schema/property configurations
- Any grouped list of key-value pairs

## How to Apply

1. Identify the longest key in the group
2. Count characters: `longestKey.length`
3. For each shorter key: add `longestKey.length - currentKey.length + 1` spaces
4. Ensure all `:` align vertically

## IDE Auto-Formatting

In VS Code/Windsurf, you can use:
- Select lines → `Ctrl+Shift+P` → "Format Selection"
- Or use extension: **Align** by a1987 (marketplace)
- Shortcut: `Ctrl+Shift+A` to align selected code
