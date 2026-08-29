# Reactive Patterns - قوانین کدنویسی

## قانون ۱: یک ReactiveElement در هر متد Schema

هر متد schema فقط می‌تواند از یک `ReactiveElement` یا component استفاده کند.

**دلیل:** این قانون کد را قابل توسعه و نگهداری می‌کند. هر متد فقط یک مسئولیت رندرینگ دارد و در صورت نیاز به تغییر، فقط همان متد اصلاح می‌شود.

### ❌ نادرست

```typescript
private template_render_main(attrsDefault, data, extra): ReactiveElement {
    if (data != null) {
        return ReactiveElement.div({
            children: [
                ReactiveElement.span({ children: ["Title"] }),  // عنصر دوم - نقض قانون
                ReactiveElement.div({ children: ["Body"] }),     // عنصر سوم - نقض قانون
            ]
        });
    }
    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
}
```

### ✅ درست

```typescript
private template_render_main(attrsDefault, data, extra): ReactiveElement {
    if (data != null) {
        return ReactiveElement.div({
            attrs: { ...attrsDefault },
            children: [
                this.executeSchemaPart(C.schemas.Main_Table.name),  // یک عنصر schema
            ],
        });
    }
    return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
}

// عنصرهای فرعی در متدهای جداگانه
private template_render_table(attrsDefault, data, extra): ReactiveElement {
    return ReactiveElement.part("table", {
        children: [
            this.executeSchemaPart(C.schemas.Main_Table_Header.name),
            this.executeSchemaPart(C.schemas.Main_Table_Body.name),
        ],
    });
}
```

### استثناها

- استفاده از `Observable.computed` برای محاسبه مقادیر داخل یک `ReactiveElement` مجاز است.
- استفاده از `Observable.conditionWhen` یا `Observable.for` برای رندر شرطی/حلقه‌ای داخل یک `ReactiveElement` مجاز است.
- فراخوانی `this.executeSchemaPart()` برای رندر بخش‌های فرعی مجاز است، زیرا هر بخش در متد schema خودش رندر می‌شود.

---

## قانون ۲: عدم استفاده مستقیم از `observable.get()`

به هیچ عنوان از `observable.get()` به صورت مستقیم استفاده نشود. به جای آن از متدهای کمکی تعریف شده در `Observable.ts` استفاده شود.

**دلیل:** استفاده مستقیم از `get()` خاصیت واکنش‌پذیری (reactivity) Observable را از بین می‌برد و تغییرات به صورت خودکار اعمال نمی‌شود.

### متدهای کمکی مجاز

| متد | کاربرد |
|-----|--------|
| `Observable.computed(fn, [obs1, obs2, ...], scope)` | محاسبه مقدار از روی چند Observable |
| `Observable.map(fn, scope)` | تبدیل مقدار Observable |
| `Observable.for(source, mapper, context, scope)` | iterate روی آرایه Observable |
| `Observable.forObject(source, mapper, context, scope)` | iterate روی آبجکت Observable |
| `Observable.conditionWhen(obs, condition, onTrue, onFalse?, scope?)` | رندر شرطی بر اساس Observable |
| `Observable.conditionSwitch(obs, cases, defaultCase?, scope?)` | switch بر اساس Observable |

### ❌ نادرست

```typescript
const value = myObservable.get();  // نقض قانون
console.log(value);

const items = this.var_data.get();  // نقض قانون
for (const item of items) { ... }
```

### ✅ درست

```typescript
// استفاده از computed برای محاسبه
const computedValue = Observable.computed(
    (data) => data.length,
    [this.var_data],
    this.getScope()
);

// استفاده از for برای iterate
const rows = Observable.for(
    this.var_data,
    (item, index) => ReactiveElement.part("tr", { children: [item.name] }),
    {},
    this.getScope()
);

// استفاده از conditionWhen برای رندر شرطی
const content = Observable.conditionWhen(
    this.var_showPopup,
    (show) => show,
    () => ReactiveElement.div({ children: ["Popup content"] }),
    null,
    this.getScope()
);
```

### استثناها

- استفاده از `get()` داخل متدهای کمکی خود `Observable.ts` (مانند `computed`، `for`، `conditionWhen`) مجاز است، زیرا این متدها به صورت داخلی subscribe می‌شوند.
- استفاده از `set()` برای تغییر مقدار Observable مجاز است.
