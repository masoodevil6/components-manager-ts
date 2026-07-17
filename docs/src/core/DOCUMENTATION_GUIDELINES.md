# راهنمای همگام‌سازی مستندات با کد

## رول اصلی: هر متد جدید = مستند جدید

وقتی متدی در کد اضافه یا تغییر می‌شود، مستند آن باید به‌روزرسانی شود.

---

## رول حیاتی: ساختار متناظر (MIRROR STRUCTURE)

**قانون مهم**: ساختار پوشه‌های مستندات باید دقیقاً مشابه کد باشد.

```
src/core/ReactiveElement.ts  →  docs/src/core/ReactiveElement.md
src/core/Observable.ts       →  docs/src/core/Observable.md
src/core/ComponentBase.ts    →  docs/src/core/ComponentBase.md

src/tools/components/ComponentButton.ts  →  docs/src/tools/components/ComponentButton.md
src/tools/components/ComponentInput.ts   →  docs/src/tools/components/ComponentInput.md

src/utils/ToolsConsts.ts     →  docs/src/utils/ToolsConsts.md
```

**نکته**: مسیر مستند = مسیر کد با جایگزینی `src/` با `docs/src/`

---

## فرآیند استاندارد

### 1. اضافه کردن متد جدید

```typescript
// @docs: docs/src/core/ReactiveElement.md
// see ReactiveElement.newMethod
private newMethod(param: string): void {
    // implementation
}
```

### 2. به‌روزرسانی مستند

در فایل `docs/src/core/ReactiveElement.md`:

```markdown
### newMethod

```typescript
private newMethod(param: string): void
```

توضیحات متد...
```

---

## رول‌های اجباری

### Rule 1: کامنت @docs

هر فایل TypeScript باید در خط اول داشته باشد:

```typescript
// @docs: docs/src/core/ReactiveElement.md
```

**مسیر باید دقیقاً متناظر با ساختار فایل باشد.**

### Rule 2: کامنت see برای متدها

هر متد باید قبل از تعریفش داشته باشد:

```typescript
// see ClassName.methodName
private methodName(): void {
```

### Rule 3: ساختار پوشه‌ها (MIRROR)

ساختار مستندات باید دقیقاً مشابه کد باشد:

```
src/
├── core/
│   ├── ReactiveElement.ts  →  docs/src/core/ReactiveElement.md
│   ├── Observable.ts       →  docs/src/core/Observable.md
│   └── ComponentBase.ts    →  docs/src/core/ComponentBase.md
├── tools/
│   └── components/
│       ├── ComponentButton.ts  →  docs/src/tools/components/ComponentButton.md
│       └── ComponentInput.ts   →  docs/src/tools/components/ComponentInput.md
└── utils/
    └── ToolsConsts.ts     →  docs/src/utils/ToolsConsts.md
```

---

## چک‌لیست قبل از Commit

قبل از commit کردن کد، چک کنید:

- [ ] آیا متد جدیدی اضافه شده؟ → مستندش را بسازید
- [ ] آیا متدی تغییر کرده؟ → مستندش را به‌روزرسانی کنید
- [ ] آیا متدی حذف شده؟ → مستندش را حذف کنید
- [ ] آیا کامنت `// @docs:` در خط اول فایل هست؟
- [ ] آیا مسیر در `// @docs:` متناظر با ساختار فایل است؟
- [ ] آیا کامنت `// see` بالای هر متد هست؟
- [ ] آیا مسیر مستند دقیقاً مشابه مسیر کد است؟ (src → docs/src)

---

## اسکریپت چک (اختیاری)

می‌توانید این اسکریپت را در pre-commit hook استفاده کنید:

```bash
#!/bin/bash
# check-docs.sh

# پیدا کردن فایل‌های TypeScript بدون @docs
files_without_docs=$(grep -L "// @docs:" src/**/*.ts)

if [ ! -z "$files_without_docs" ]; then
    echo "❌ فایل‌های بدون @docs پیدا شد:"
    echo "$files_without_docs"
    exit 1
fi

# چک کردن متناظر بودن مسیرها
echo "✅ همه فایل‌ها کامنت @docs دارند"
```

---

## مثال کامل

### کد (src/core/Observable.ts)

```typescript
// @docs: docs/src/core/Observable.md
export class Observable<T> {
    
    // see Observable.constructor
    constructor(value: T) {
        this._value = value;
    }
    
    // see Observable.get
    get(): T {
        return this._value;
    }
    
    // see Observable.set
    set(value: T): void {
        this._value = value;
        this._notify();
    }
    
    // see Observable.subscribe
    subscribe(fn: (value: T) => void): () => void {
        this._subscribers.add(fn);
        return () => this._subscribers.delete(fn);
    }
}
```

### مستند (docs/src/core/Observable.md)

```markdown
# Observable - راهنمای جامع

## Constructor

```typescript
constructor(value: T)
```

ایجاد Observable با مقدار اولیه.

---

## متدهای اصلی

### get

```typescript
get(): T
```

بازگشت مقدار فعلی.

---

### set

```typescript
set(value: T): void
```

تغییر مقدار و اطلاع‌رسانی به subscribers.

---

### subscribe

```typescript
subscribe(fn: (value: T) => void): () => void
```

اشتراک در تغییرات. تابع unsubscribe را برمی‌گرداند.
```

---

## ابزارهای پیشنهادی

### VS Code Extension

می‌توانید یک extension ساده بسازید که:
- وقتی متد جدید می‌نویسید، مستند خالی بسازد
- وقتی متد را rename می‌کنید، مستند را هم rename کند
- وقتی متد را حذف می‌کنید، هشدار دهد
- مسیر متناظر را به صورت خودکار ایجاد کند

### Pre-commit Hook

در `.husky/pre-commit`:

```bash
#!/bin/bash
npm run check-docs
```

در `package.json`:

```json
{
  "scripts": {
    "check-docs": "node scripts/check-docs.js"
  }
}
```

---

## نکات مهم

1. **همگام‌سازی دستی**: فعلاً همگام‌سازی دستی است. در آینده می‌توانیم automation اضافه کنیم.

2. **Review Code**: در PR، چک کنید که مستندات هم به‌روز شده‌اند.

3. **Naming Convention**: نام متد در مستند باید دقیقاً مشابه کد باشد (case-sensitive).

4. **Type Safety**: در مستند، typeها را دقیقاً مثل کد بنویسید.

5. **Examples**: برای هر متد حداقل یک مثال عملی بنویسید.

6. **Mirror Structure**: همیشه ساختار پوشه‌ها را متناظر نگه دارید. این مهم‌ترین رول است.

---

## وضعیت فعلی

- ✅ src/core/ReactiveElement.ts → docs/src/core/ReactiveElement.md (complete)
- ✅ src/core/Observable.ts → docs/src/core/Observable.md (complete)
- ✅ src/core/Language.ts → docs/src/core/Language.md (complete)
- ✅ src/core/ComponentBase.ts → docs/src/core/ComponentBase.md (complete)
- ✅ src/core/AppConfig.ts → docs/src/core/AppConfig.md (complete)
- ⏳ سایر فایل‌ها...

---

## آینده

- [ ] اسکریپت خودکار برای چک کردن همگام‌سازی
- [ ] VS Code extension برای کمک به مستندسازی
- [ ] Pre-commit hook برای جلوگیری از commit بدون مستند
- [ ] CI check برای PRها
- [ ] اسکریپت برای ایجاد ساختار متناظر به صورت خودکار
