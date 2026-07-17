---
description: Workflow for creating new components
globs: "**/*.ts"
---

# Component Creation Workflow

## 1. Create Component File
// turbo
فایل جدید در `src/tools/components/` با نام `ComponentName.ts`

## 2. Import Dependencies
```typescript
import { ComponentBase } from "../../core/ComponentBase";
import { defineComponentPatterns, defineComponentSchema, defineComponentMethods, defineComponentTemplate } from "../../core/ComponentBase";
import { Observable } from "../../core/Observable";
import { GOG_ComponentBasicConfigs_Component_parts, GOG_ComponentBasicProps_Component } from "../../core/component/SetupComponent";
```

## 3. Define Component Class
```typescript
export class ComponentName extends ComponentBase<
    TProp,
    TSchema,
    TTemplate,
    TMethods
> {
    constructor(elId: string | null = null) {
        super("ComponentName", elId);
        this.initializePatterns();
        this.initializeSchema();
        this.initializeMethods();
        this.initializeTemplates();
    }
    
    // ... implementations
}
```

## 4. Implement Patterns, Schema, Methods, Templates
- تعریف `_COMPONENT_PATTERN`
- تعریف `_COMPONENT_SCHEMA`
- تعریف `_COMPONENT_METHODS`
- تعریف `_COMPONENT_TEMPLATES`

## 5. Export Component
```typescript
export { ComponentName };
export default ComponentName;
```

## 6. Register in Tools
افزودن export به `src/tools/tools.ts`:
```typescript
export { ComponentName } from "./components/ComponentName";
```
