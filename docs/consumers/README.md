# راهنمای مصرف‌کنندگان

این بخش راهنمای APIهایی است که برنامه‌های ساخته‌شده با فریم‌ورک مصرف می‌کنند. برای ثبت منابع مستقل هر برنامه از `Framework.Consumer.create({id})` شروع کنید؛ این facade زبان، دسته‌بندی، کنترلر، layout، صفحه و چرخهٔ عمر آن‌ها را کنار هم می‌گذارد.

## راهنماها

- [زبان و کاتالوگ ترجمه](./language.md): تعریف locale، ثبت کاتالوگ چندزبانه، دسته‌بندی ترجمه‌ها و استفاده از کلیدهای تولیدشده.
- [کنترلرها](./controllers.md): ثبت درخت دسته‌بندی، ساخت کنترلر مصرف‌کننده، رندر چند کامپوننت و اتصال آن به workflow.
- [صفحه‌ها و مسیرها](./pages.md): ساخت layoutهای slotمحور، اشتراک و override بخش‌های ثابت، مسیرها، guardها و اتصال آن‌ها به Router.

```ts
const app = Framework.Consumer.create({id: "acme.store"});

// Register app.language keys and packs, then controller categories/controllers.
// Register shared layouts and route-specific slots through app.pages.

app.mount({
  root: document.querySelector<HTMLElement>("#app")!,
  controllerRenderer: (route) => Framework.UI.Fetch.Widget({
    ...(route.widgetProps ?? {}),
    prop_controller: route.controller
  }).getElement()
});

// When this application is removed:
app.dispose();
```

## ورودی متمرکز کامپوننت‌ها

- [ساخت ورودی‌های مستقل و اندازه‌گیری گراف مصرف‌کننده](./focused-component-imports.md)

شناسه‌های محلی facade را خودکار زیر `id` برنامه scope می‌کند. `dispose()` منابع ثبت‌شدهٔ همان برنامه را پاک می‌کند و ثبت‌های برنامه‌های دیگر را دست‌نخورده می‌گذارد.

