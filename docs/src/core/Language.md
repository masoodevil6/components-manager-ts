# Language - راهنمای جامع

## مقدمه

`Language` یک کلاس برای مدیریت چندزبانی (i18n) در پروژه است. این کلاس امکان تغییر زبان، ترجمه کلیدها و پشتیبانی از RTL/LTR را فراهم می‌کند.

---

## Type Definitions

### LangMeta

```typescript
type LangMeta = {
    code: string;    // کد زبان (مثلاً "fa", "en")
    name: string;    // نام زبان (مثلاً "فارسی", "English")
    rtl: boolean;    // آیا زبان راست‌چین است؟
}
```

متادیتای زبان.

---

### LangDict

```typescript
type LangDict = Record<string, any>
```

دیکشنری زبان که کلیدها و مقادیر ترجمه را نگه می‌دارد.

---

## ویژگی‌های استاتیک

### languages

```typescript
static languages: LangMeta[] = [
    { code: "fa", name: "فارسی", rtl: true },
    { code: "en", name: "English", rtl: false }
]
```

لیست زبان‌های پشتیبانی شده.

---

### _fallbackLanguage

```typescript
static _fallbackLanguage: string = "en"
```

زبان پیش‌فرض وقتی ترجمه پیدا نشود.

---

### _dict

```typescript
static _dict: LangDict = {
    fa, en
}
```

دیکشنری ترجمه‌ها برای هر زبان.

---

## متدهای اصلی

### setLanguage

```typescript
static async setLanguage(lang: string): Promise<void>
```

تغییر زبان فعلی برنامه:
- زبان را در AppConfig ذخیره می‌کند
- direction RTL/LTR را تنظیم می‌کند
- اگر زبان پیدا نشود، کاری نمی‌کند

**پارامترها:**
- `lang`: کد زبان (مثلاً "fa", "en")

**مثال:**
```typescript
await Language.setLanguage("fa");
await Language.setLanguage("en");
```

---

### translate

```typescript
static translate(key: string, params: Record<string, any> = {}): Observable<string>
```

ترجمه یک کلید به زبان فعلی:
- یک Observable برمی‌گرداند که با تغییر زبان به‌روزرسانی می‌شود
- از template syntax `{{key}}` برای پارامترها پشتیبانی می‌کند
- اگر ترجمه پیدا نشود، از fallbackLanguage استفاده می‌کند
- اگر در fallback هم نباشد، خود کلید را برمی‌گرداند

**پارامترها:**
- `key`: کلید ترجمه (با نقطه برای nested keys)
- `params`: (اختیاری) پارامترها برای template

**مثال:**
```typescript
// ساده
const title = Language.translate("app.title");

// با پارامتر
const greeting = Language.translate("app.greeting", { name: "John" });

// nested key
const message = Language.translate("components.button.submit");
```

---

## متدهای خصوصی

### _resolve

```typescript
private static _resolve(obj: any, path: string): any
```

استخراج مقدار از object با path:
- path با نقطه جدا می‌شود (مثلاً "app.title")
- مقدار را از object استخراج می‌کند

**مثال:**
```typescript
const obj = { app: { title: "Hello" } };
const value = Language._resolve(obj, "app.title"); // "Hello"
```

---

### _template

```typescript
private static _template(text: string, params: Record<string, any>): string
```

جایگزینی پارامترها در template:
- از syntax `{{key}}` استفاده می‌کند
- پارامترها را با مقادیر جایگزین می‌کند

**مثال:**
```typescript
const text = "Hello {{name}}!";
const result = Language._template(text, { name: "John" }); // "Hello John!"
```

---

## مثال‌های کاربردی

### مثال 1: تغییر زبان

```typescript
// تغییر به فارسی
await Language.setLanguage("fa");

// تغییر به انگلیسی
await Language.setLanguage("en");
```

---

### مثال 2: ترجمه ساده

```typescript
const title = Language.translate("app.title");
title.subscribe(value => {
    console.log("Title:", value);
});
```

---

### مثال 3: ترجمه با پارامتر

```typescript
// در فایل ترجمه:
// greeting: "Hello {{name}}!"

const greeting = Language.translate("app.greeting", { name: "John" });
console.log(greeting.get()); // "Hello John!"
```

---

### مثال 4: ترجمه واکنشی

```typescript
const title = Language.translate("app.title");

// با تغییر زبان، ترجمه هم تغییر می‌کند
await Language.setLanguage("fa");
console.log(title.get()); // "عنوان"

await Language.setLanguage("en");
console.log(title.get()); // "Title"
```

---

### مثال 5: استفاده در ReactiveElement

```typescript
const title = Language.translate("app.title");

const element = new ReactiveElement("h1", {
    children: title
});
```

---

### مثال 6: nested keys

```typescript
// در فایل ترجمه:
// components:
//   button:
//     submit: "Submit"
//     cancel: "Cancel"

const submitText = Language.translate("components.button.submit");
const cancelText = Language.translate("components.button.cancel");
```

---

### مثال 7: چند پارامتر

```typescript
// در فایل ترجمه:
// message: "Hello {{name}}, you have {{count}} messages"

const message = Language.translate("app.message", {
    name: "John",
    count: 5
});
// "Hello John, you have 5 messages"
```

---

### مثال 8: بررسی زبان فعلی

```typescript
const currentLang = AppConfig.get("language");
const isRtl = AppConfig.get("directionRtl");
```

---

### مثال 9: لیست زبان‌ها

```typescript
Language.languages.forEach(lang => {
    console.log(`${lang.code}: ${lang.name} (RTL: ${lang.rtl})`);
});
```

---

### مثال 10: fallback behavior

```typescript
// اگر ترجمه در زبان فعلی نباشد
const missing = Language.translate("nonexistent.key");
// کلید خود را برمی‌گرداند: "nonexistent.key"
```

---

## نکات مهم

### 1. Observable بودن translate

- `translate` یک Observable برمی‌گرداند
- با تغییر زبان، مقدار به‌روزرسانی می‌شود
- برای استفاده در UI واکنشی مناسب است

---

### 2. Template Syntax

- از `{{key}}` برای پارامترها استفاده کنید
- پارامترها با مقادیر جایگزین می‌شوند
- اگر پارامتر نباشد، خالی می‌شود

---

### 3. Nested Keys

- از نقطه برای nested keys استفاده کنید
- مثال: "components.button.submit"

---

### 4. Fallback Language

- اگر ترجمه پیدا نشود، از fallbackLanguage استفاده می‌کند
- fallbackLanguage پیش‌فرض "en" است

---

### 5. RTL/LTR

- با تغییر زبان، direction هم تغییر می‌کند
- در AppConfig ذخیره می‌شود
- برای CSS direction استفاده می‌شود

---

### 6. Async setLanguage

- `setLanguage` async است (برای آینده)
- فعلاً sync کار می‌کند اما Promise برمی‌گرداند

---

### 7. Type Safety

- LangMeta و LangDict type-safe هستند
- TypeScript خطاها را قبل از runtime تشخیص می‌دهد

---

## بهترین شیوه‌ها

### 1. استفاده از translate در UI

```typescript
// ✅ خوب
const title = Language.translate("app.title");

// ❌ بد
const title = "Title"; // ثابت، چندزبانه نیست
```

---

### 2. نام‌گذاری کلیدها

```typescript
// ✅ خوب
"app.title"
"components.button.submit"
"errors.required"

// ❌ بد
"title"
"submit"
"required"
```

---

### 3. استفاده از پارامترها

```typescript
// ✅ خوب
Language.translate("greeting", { name: user.name });

// ❌ بد
Language.translate("greeting").replace("{{name}}", user.name);
```

---

### 4. ساختار فایل ترجمه

```typescript
// ✅ خوب
export default {
    app: {
        title: "Title",
        description: "Description"
    },
    components: {
        button: {
            submit: "Submit"
        }
    }
}

// ❌ بد
export default {
    appTitle: "Title",
    componentsButtonSubmit: "Submit"
}
```

---

### 5. استفاده در ComponentBase

```typescript
// در Pattern
title: Language.translate("components.my_component.prop.title")
```

---

## ساختار فایل‌های ترجمه

### Fa.ts (فارسی)

```typescript
export default {
    app: {
        title: "عنوان برنامه",
        description: "توضیحات"
    },
    components: {
        button: {
            submit: "ارسال",
            cancel: "لغو"
        }
    }
}
```

### En.ts (انگلیسی)

```typescript
export default {
    app: {
        title: "App Title",
        description: "Description"
    },
    components: {
        button: {
            submit: "Submit",
            cancel: "Cancel"
        }
    }
}
```

---

## خلاصه

Language یک کلاس قدرتمند برای:
- ✅ مدیریت چندزبانی
- ✅ ترجمه واکنشی با Observable
- ✅ پشتیبانی از template parameters
- ✅ پشتیبانی از RTL/LTR
- ✅ Fallback language
- ✅ Type Safety با TypeScript

این کلاس پایه اصلی سیستم چندزبانی در این معماری است.
