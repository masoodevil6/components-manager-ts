# AI Guide — Basic Framework

> **مخاطب:** همه AIهایی (چت، کدنویس، تحلیل‌گر) که با Framework کار می‌کنند.
>
> **Purpose:** نقشه راه رسمی برای درک، توسعه و تغییر Framework.
>
> **Status:** Official

---

## 1. مسیر رسمی

تمام Guideهای این پروژه فقط در این مسیر قرار دارند:

```
D:\projects\components\master\documents\guides\Basic
```

---

## 2. Hierarchy

```
Basic/
├── 00-framework/          # لایه ۱: Guideهای سطح Framework
│   ├── AI_GUIDE_OVERVIEW.md
│   ├── AI_GUIDE_ARCHITECTURE.md
│   ├── AI_GUIDE_TERMINOLOGY.md
│   └── AI_GUIDE_RULES.md
│
├── 01-systems/            # لایه ۲: Guideهای سیستم‌های داخلی
│   ├── AI_GUIDE_OBSERVABLE.md
│   ├── AI_GUIDE_SCOPE.md
│   ├── AI_GUIDE_REACTIVE.md
│   ├── AI_GUIDE_EVENT.md
│   └── AI_GUIDE_WORKFLOW.md
│
├── 02-component/          # لایه ۳: Guideهای ساختار Component
│   ├── AI_GUIDE_COMPONENT_STRUCTURE.md
│   ├── AI_GUIDE_COMPONENT_PROPS.md
│   ├── AI_GUIDE_COMPONENT_SCHEMA.md
│   ├── AI_GUIDE_COMPONENT_METHODS.md
│   └── AI_GUIDE_COMPONENT_TEMPLATES.md
│
└── 03-implementation/     # لایه ۴: Guideهای کامپوننت‌های واقعی
    ├── button/
    │   └── GUIDE.md
    ├── input/
    │   └── GUIDE.md
    └── select/
        └── GUIDE.md
```

---

## 3. مسیر سریع بر اساس نیاز

### «می‌خواهم Framework را درک کنم»

```
00-framework/AI_GUIDE_OVERVIEW.md
    → 00-framework/AI_GUIDE_TERMINOLOGY.md
    → 00-framework/AI_GUIDE_RULES.md
    → 00-framework/AI_GUIDE_ARCHITECTURE.md
```

### «می‌خواهم سیستم داخلی را درک کنم»

```
01-systems/AI_GUIDE_OBSERVABLE.md
    → 01-systems/AI_GUIDE_SCOPE.md
    → 01-systems/AI_GUIDE_REACTIVE.md
    → 01-systems/AI_GUIDE_EVENT.md
    → 01-systems/AI_GUIDE_WORKFLOW.md
```

### «می‌خواهم کامپوننت جدید بسازم»

```
00-framework/AI_GUIDE_RULES.md
    → 02-component/AI_GUIDE_COMPONENT_STRUCTURE.md
    → 02-component/AI_GUIDE_COMPONENT_PROPS.md
    → 02-component/AI_GUIDE_COMPONENT_SCHEMA.md
    → 02-component/AI_GUIDE_COMPONENT_METHODS.md
    → 02-component/AI_GUIDE_COMPONENT_TEMPLATES.md
```

### «می‌خواهم کامپوننت موجود را درک/تغییر کنم»

```
02-component/AI_GUIDE_COMPONENT_STRUCTURE.md
    → 03-implementation/<component>/GUIDE.md
```

### «می‌خواهم فقط overview بگیرم»

```
00-framework/AI_GUIDE_OVERVIEW.md
```

---

## 4. قوانین طلایی (Quick Reference)

| قانون | سطح | مرجع |
|:---|:---|:---|
| هر Component از `ClComponentBase` ارث‌بری کند | MUST | [R-ARCH-01](./00-framework/AI_GUIDE_RULES.md) |
| چهار بخش `_COMPONENT_*` تعریف شوند | MUST | [R-ARCH-02](./00-framework/AI_GUIDE_RULES.md) |
| Core به Implementation وابسته نشود | MUST NOT | [R-ARCH-03](./00-framework/AI_GUIDE_RULES.md) |
| در context واکنشی از `get()` استفاده نشود | MUST NOT | [R-OBS-01](./00-framework/AI_GUIDE_RULES.md) |
| Scope قبل از re-render dispose شود | MUST | [R-SCOPE-01](./00-framework/AI_GUIDE_RULES.md) |
| رندر از طریق Schema انجام شود | MUST | [R-RENDER-01](./00-framework/AI_GUIDE_RULES.md) |
| برای attribute واکنشی از `attrsBind` استفاده شود | MUST | [R-RENDER-02](./00-framework/AI_GUIDE_RULES.md) |

> برای لیست کامل به [00-framework/AI_GUIDE_RULES.md](./00-framework/AI_GUIDE_RULES.md) مراجعه کنید.

---

## 5. استانداردها

### ۵.۱. سطوح قوانین

| سطح | معنی |
|:---|:---|
| **MUST** | الزام قطعی |
| **MUST NOT** | رفتار ممنوع |
| **SHOULD** | توصیه‌شده |
| **SHOULD NOT** | معمولاً نباید |
| **MAY** | مجاز ولی اختیاری |

### ۵.۲. ساختار Guide

هر Guide از قالب استاندارد پیروی می‌کند:
`Definition → Responsibilities → Concepts → Architecture → Rules → Lifecycle → API → Examples → Anti-Patterns → Dependencies → AI Instructions → Related Guides → Source References`

---

## 6. Definition of Done

- [x] تمام Guideها در مسیر Basic قرار دارند
- [x] هیچ Guide جدیدی خارج از این مسیر ایجاد نشده است
- [x] Hierarchy چهار سطحی مشخص شده است
- [x] Framework Overview مشخص است
- [x] Terminology ایجاد شده است
- [x] Rules ایجاد شده است
- [x] Component Structure Guide ایجاد شده است
- [x] MUST / MUST NOT / SHOULD / SHOULD NOT / MAY استاندارد شده‌اند
- [x] Source References وجود دارند
- [x] Exampleها بر اساس Source واقعی هستند
- [x] Anti-patternهای اصلی ثبت شده‌اند
- [x] Cross-reference بین Guideها وجود دارد
- [x] تضادهای Documentation و Source مشخص شده‌اند (CONFLICT-01, CONFLICT-02)
- [x] هیچ Source Code تغییر نکرده است
- [x] هیچ Documentation Root جدیدی خارج از Basic ساخته نشده است

---

*آخرین به‌روزرسانی: ۲۰۲۶-۰۸-۳۱*
