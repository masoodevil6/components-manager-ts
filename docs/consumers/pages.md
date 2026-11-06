# ساخت صفحه و مسیر برای مصرف‌کنندگان

`Framework.Consumer` یک facade برای ثبت ترجمه‌ها، دسته‌بندی‌ها، کنترلرها، layoutها و صفحه‌های یک برنامه است. شناسه‌هایی که از این facade ثبت می‌شوند زیر namespace برنامه قرار می‌گیرند؛ بنابراین برنامه می‌تواند تمام منابع خودش را با `dispose()` آزاد کند.

## شروع یک برنامه

```ts
import * as Framework from "component-manager";

const app = Framework.Consumer.create({id: "acme.store"});

const text = app.language.defineKeys("pages", {
  category: "categories.store",
  homeTitle: "home.title",
  accountTitle: "account.title",
  sharedHeader: "workflow.sharedHeader",
  accountContent: "workflow.accountContent",
  accountSidebar: "workflow.accountSidebar",
  alternateHeader: "workflow.alternateHeader"
});

app.language.registerLocale(app.language.Locale.EN_US);
app.language.registerPack({
  id: "store.en",
  locale: app.language.Locale.EN_US,
  entries: [
    [text.category, "Store pages"],
    [text.homeTitle, "Home"],
    [text.accountTitle, "Account"]
  ]
});

const categories = app.controllers.registerCategories({
  namespace: "store",
  categories: [{id: "pages", titleKey: text.category}]
});
const pageCategory = categories.get("pages")!;
```

کلیدهای ترجمه با `defineKeys` ساخته می‌شوند و مقدار متنی هر زبان در pack ثبت می‌شود. نام‌های `id` در API برنامه محلی هستند؛ facade آن‌ها را با شناسهٔ برنامه scope می‌کند.

## کنترلرهای slot

هر slot به یک controller وصل می‌شود. پاسخ کنترلر باید کامپوننت قابل‌رندر را در `RequestState.data.content` بگذارد.

```ts
const partTitle = app.language.defineKeys("controllers", {
  pagePart: "pagePart.title"
});

app.controllers.registerMany([
  {
    id: "shared-header",
    titleKey: partTitle.pagePart,
    category: pageCategory,
    factory: () => createRequestState(renderStoreHeader())
  },
  {
    id: "account-header",
    titleKey: partTitle.pagePart,
    category: pageCategory,
    factory: () => createRequestState(renderAccountHeader())
  },
  {
    id: "account-content",
    titleKey: partTitle.pagePart,
    category: pageCategory,
    factory: ({params}) => createRequestState(renderAccount(params))
  },
  {
    id: "account-sidebar",
    titleKey: partTitle.pagePart,
    category: pageCategory,
    factory: ({params}) => createRequestState(renderAccountMenu(params))
  }
]);
```

در این مثال `createRequestState` نمای کوتاهی از ساخت `RequestManager` است:

```ts
const createRequestState = (content: unknown) => new Framework.Controller.Requests.RequestManager({
  status: true,
  messages: [],
  data: {content},
  reference: {source: "acme.store"}
}).get();
```

## Layoutهای مشترک، slotهای ثابت و تغییرهای موردی

یک layout می‌تواند مقدار پیش‌فرض slotها را مشخص کند. همهٔ صفحه‌های متصل به آن از همان header و footer استفاده می‌کنند؛ هر صفحه می‌تواند فقط slotهای لازم خودش را جایگزین کند. مقدار `null` یک slot ارث‌رسیده را عمداً خالی می‌کند.

```ts
app.pages.registerLayout({
  id: "store-shell",
  slots: {
    header: "shared-header"
  }
});

app.pages.registerMany([
  {
    id: "home",
    path: "/home",
    titleKey: text.homeTitle,
    layout: "store-shell",
    slots: {content: "account-content", sidebar: null}
  },
  {
    id: "account",
    path: "/accounts/:accountId",
    titleKey: text.accountTitle,
    layout: "store-shell",
    slots: {
      content: {
        id: "account-content",
        params: ({pathParams, query}) => ({
          accountId: pathParams.accountId,
          tab: query.tab ?? "overview"
        })
      },
      sidebar: {
        id: "account-sidebar",
        params: ({pathParams}) => ({accountId: pathParams.accountId})
      }
    }
  },
  {
    id: "account-special-header",
    path: "/accounts/:accountId/security",
    titleKey: text.accountTitle,
    layout: "store-shell",
    slots: {
      header: "account-header",
      content: "account-content",
      sidebar: "account-sidebar"
    }
  }
]);
```

در این طرح، header مشترک روی تعداد زیادی صفحه ثابت می‌ماند. مسیر امنیت حساب فقط `header` را جایگزین می‌کند و مسیرهای دیگر همچنان همان header مشترک را می‌بینند. resolver هم می‌تواند براساس پارامترهای مسیر یا query منبع slot را انتخاب کند:

```ts
slots: {
  header: ({pathParams}) => pathParams.accountId === "admin"
    ? "account-header"
    : "shared-header"
}
```

Layoutها می‌توانند از layout دیگر ارث ببرند. برای نمونه `store-shell-with-navigation` می‌تواند `extends: "store-shell"` داشته باشد و تنها slot `navigation` را اضافه یا جایگزین کند. override هر صفحه از مقدارهای layout ارث‌رسیده اولویت بیشتری دارد.

### نام‌های دلخواه برای layout

قالب پیش‌فرض framework از `componentPage` استفاده می‌کند و slotهای `header`، `navigation`، `content`، `sidebar`، `footer` و `setting` را می‌شناسد. برای نام‌های دلخواه مانند `toolbar`، `main` یا `inspector`، یک renderer تعریف کنید:

```ts
app.pages.registerLayout({
  id: "workspace-shell",
  slots: {toolbar: "workspace-toolbar"},
  requiredSlots: ["toolbar", "main"],
  render: (context, slots) => {
    const workspace = createWorkspaceComponent({
      toolbar: slots.toolbar,
      main: slots.main,
      inspector: slots.inspector ?? null
    });
    return {component: workspace};
  }
});

app.pages.register({
  id: "workspace",
  path: "/workspace",
  layout: "workspace-shell",
  slots: {
    main: "workspace-content",
    inspector: "workspace-inspector"
  }
});
```

Renderer یک نمونهٔ layout و map نهایی slotها را دریافت می‌کند. اگر `reuse: true` باشد، renderer باید `update(context, slots)` برگرداند تا همان layout instance در routeهای هم‌خانواده به‌روز شود. برای layoutهای غیربازاستفاده‌شونده، `dispose()` اختیاری است و هنگام خروج از route اجرا می‌شود.

## Router، guard و چرخهٔ عمر

پس از ثبت controllerها و pageها، route map را بسازید و Router را mount کنید:

```ts
const router = app.mount({
  root: document.querySelector<HTMLElement>("#app")!,
  routes: Framework.Pages.ApplicationPageMap,
  controllerRenderer: (route) => Framework.UI.Fetch.Widget({
    ...(route.widgetProps ?? {}),
    prop_controller: route.controller
  }).getElement(),
  routerOptions: {
    notFound: (path) => {
      const page = document.createElement("main");
      page.textContent = `Page not found: ${path}`;
      return page;
    },
    onError: (error, context) => console.error("Route failed", context.path, error)
  }
});

app.navigate("/accounts/42?tab=security");
```

`controllerRenderer` می‌گوید پاسخ controller route با کدام host UI نمایش داده شود؛ در این نمونه `ComponentWidget` پاسخ را render می‌کند. route map پایه و routeهای ثبت‌شدهٔ برنامه در یک map ادغام می‌شوند؛ برخورد مسیرها خطای ثبت می‌دهد.

Guard سراسری یا `beforeEnter` هر صفحه می‌تواند ناوبری را قبول کند، با `false` متوقف کند یا مسیر دیگری برگرداند. context شامل `path`، `pathParams`، `query`، `fromPath` و جهت حرکت است:

```ts
app.pages.register({
  id: "private-account",
  path: "/private/:accountId",
  titleKey: text.accountTitle,
  slots: {content: "account-content"},
  beforeEnter: async ({pathParams}) => {
    const allowed = await canOpenAccount(pathParams.accountId);
    return allowed || "/sign-in";
  },
  onError: (error, context) => reportPageError(context.path, error)
});
```

Router guard را پیش از commit کردن URL اجرا می‌کند؛ اگر کاربر در زمان انتظار route دیگری را انتخاب کند، نتیجهٔ ناوبری قدیمی نادیده گرفته می‌شود. `onReuse` برای به‌روزرسانی یک layout نگه‌داشته‌شده اجرا می‌شود، `onUnload` هنگام ترک آن اجرا می‌شود و `app.dispose()` روتر و registryهای متعلق به برنامه را آزاد می‌کند.

## APIهای ثبت

- `app.language.defineKeys`, `registerCatalog`, `registerPack(s)`, `registerLocale`, `t` و `setLocale` برای متن برنامه هستند. pack فقط اجازه دارد کلیدهای namespace همان برنامه را ترجمه کند.
- `app.controllers.registerCategories` یک درخت چندسطحی اعتبارسنجی‌شده می‌سازد؛ `register` و `registerMany` کنترلرهای وابسته به آن را ثبت می‌کنند.
- `app.pages.registerLayout(s)` layout و مقدارهای پیش‌فرض slot را ثبت می‌کند؛ `register` و `registerMany` صفحه‌ها و overrideهای مسیر را ثبت می‌کنند.
- `app.pages.createRoutes(baseRoutes?)` route map برنامه را می‌سازد؛ `app.mount(...)` همان map را به Router وصل می‌کند.
- `app.dispose()` Router، صفحه‌ها، layoutها، کنترلرها، دسته‌بندی‌ها، کلیدها و packهای متعلق به برنامه را آزاد می‌کند.

`registerLocale` locale را در registry مشترک زبان قابل‌استفاده می‌کند؛ ترجمه‌ها و کلیدهای scopeشده با `dispose()` حذف می‌شوند. locale ثبت‌شده برای استفادهٔ دیگر بخش‌های برنامه باقی می‌ماند.
