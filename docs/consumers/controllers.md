# راهنمای ساخت کنترلر برای مصرف‌کنندگان

کنترلر مصرف‌کننده یک factory ثبت‌شده است که ورودی می‌گیرد و یک `RequestState` برمی‌گرداند. `ComponentWidget` پاسخ کنترلر را می‌گیرد و `data.content` را مستقیم رندر می‌کند؛ بنابراین کنترلر می‌تواند یک کامپوننت یا چند کامپوننت چیده‌شده در `componentLayout` برگرداند.

API عمومی از ورودی اصلی بسته در دسترس است:

```ts
import {Framework} from "component-manager";

const {Controller, Core, Lang, Observable, UI} = Framework;
const {ControllerManager} = Controller;
const Ui = UI.Category.UI;
const LayoutColumn = UI.Component.Lists.ComponentLayout.LayoutColumn;
```

برای عنوان کنترلر، دسته‌ها، گره‌های workflow و متن‌های فرم از کلیدهای زبان فریم‌ورک استفاده می‌کنیم. ابتدا کلیدهای نمادین را با `defineKeys` بسازید، سپس ترجمه‌های همان namespace و مسیرها را طبق [راهنمای زبان](./language.md) ثبت کنید:

```ts
const labels = Lang.defineKeys("acme.account", {
  categoryAccount: "controllerCategories.account",
  categoryAdministration: "controllerCategories.administration",
  categoryProfiles: "controllerCategories.profiles",
  categoryCreate: "controllerCategories.create",
  controllerProfileCreate: "controllers.profileCreate",
  controllerProfileCreateDescription: "controllers.profileCreate.description",
  workflowProfileLayout: "workflow.profileLayout",
  workflowNameInput: "workflow.nameInput",
  workflowEmailInput: "workflow.emailInput",
  workflowRoleSelector: "workflow.roleSelector",
  workflowSubmitButton: "workflow.submitButton",
  workflowResultLabel: "workflow.resultLabel",
  fieldName: "fields.name",
  fieldNamePlaceholder: "fields.namePlaceholder",
  fieldEmail: "fields.email",
  fieldEmailPlaceholder: "fields.emailPlaceholder",
  fieldRole: "fields.role",
  chooseRole: "fields.chooseRole",
  roleMember: "roles.member",
  roleAdmin: "roles.admin",
  actionCreateProfile: "actions.createProfile",
  messageEnterName: "messages.enterName",
  messageNameChanged: "messages.nameChanged",
  messageNameRequired: "messages.nameRequired",
  messageProfileReady: "messages.profileReady",
  messageNoEmail: "messages.noEmail"
});
```

این کلیدها را با همان شناسهٔ کاتالوگ و مسیرهای نشان‌داده‌شده در `defineKeys` ترجمه کنید. هر دو API باید همان TranslationKey reference را ببینند؛ برای همین ابتدا `defineKeys` اجرا می‌شود. خود کنترلر reference کلید را نگه می‌دارد و متن را با `Lang.t(key)` می‌خواند.

## ثبت دسته‌بندی درختی

شناسهٔ هر دسته باید در namespace برنامه یکتا و پایدار باشد. عنوان نمایشی با `titleKey` مشخص می‌شود. درخت می‌تواند چندسطحی باشد؛ نمونه تا چهار سطح پایین می‌رود:

```ts
const categories = ControllerManager.registerCategories({
  namespace: "acme.account",
  categories: [
    {
      id: "account",
      titleKey: labels.categoryAccount,
      children: [
        {
          id: "administration",
          titleKey: labels.categoryAdministration,
          children: [
            {
              id: "profiles",
              titleKey: labels.categoryProfiles,
              children: [
                {
                  id: "create",
                  titleKey: labels.categoryCreate
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});

const createProfileCategory = categories.get("create");
if (!createProfileCategory) throw new Error("Controller category was not registered");
```

ثبت‌کننده کل درخت را پیش از افزودن بررسی می‌کند: شناسه‌ها باید معتبر و یکتا باشند، کلیدهای عنوان باید در `Framework.Lang` شناخته شده باشند، چرخه مجاز نیست و حداکثر عمق ۳۲ سطح است. برای ثبت کنترلر از reference برگشتی `get` استفاده کنید؛ ساختن یک object مشابه کافی نیست.

## تعیین نام گره‌های workflow

هر کامپوننتی که کنترلر می‌سازد باید نام فرزند ثابت داشته باشد تا اتصال workflow قابل پیش‌بینی بماند. در `workflowNodes`، کلید نام گره است و مقدار، کلید ترجمهٔ عنوان آن در ابزارهای بازرسی workflow. factory همان نام‌ها را در `workflowNodeNames` دریافت می‌کند:

```ts
const profileWorkflowNodes = {
  profileLayout: labels.workflowProfileLayout,
  nameInput: labels.workflowNameInput,
  emailInput: labels.workflowEmailInput,
  roleSelector: labels.workflowRoleSelector,
  submitButton: labels.workflowSubmitButton,
  resultLabel: labels.workflowResultLabel
};
```

برای مثال، `workflowNodeNames.nameInput` مقدار پایدار `nameInput` را می‌دهد. نام را خودتان دوباره در چند محل hard-code نکنید؛ آن را از همین map بگیرید.

## ساخت یک کنترلر با چند کامپوننت

این کنترلر یک فرم پروفایل با دو ورودی، انتخاب‌گر نقش، دکمهٔ ثبت و پیام نتیجه می‌سازد. هر فرزند یک `workflowChildName` دارد و همهٔ اجزا درون یک `componentLayout` قرار می‌گیرند.

```ts
type ProfileParams = {
  name?: string;
  email?: string;
};

const profileController = ControllerManager.register<ProfileParams>({
  id: "acme.account.profile-create",
  titleKey: labels.controllerProfileCreate,
  descriptionKey: labels.controllerProfileCreateDescription,
  category: createProfileCategory,
  workflowNodes: profileWorkflowNodes,

  factory: ({params, workflowNodeNames}) => {
    let currentName = String(params?.name ?? "");
    let currentEmail = String(params?.email ?? "");
    let currentRole = "member";
    const resultText = new Observable.App(Lang.t(labels.messageEnterName));

    const nameInput = Ui.Fetch.Inputs.V1.Input({
      prop_name: "name",
      prop_value: currentName,
      prop_labelTitle: Lang.t(labels.fieldName),
      prop_placeholder: Lang.t(labels.fieldNamePlaceholder)
    }, {
      INPUT_CHANGE: function (_event, _dataArgs, componentArgs) {
        currentName = String(componentArgs?.VALUE ?? "");

        // Find the nearest profileLayout node, then request its childInputChanged step.
        const source = this.getComponentWorkflow();
        const layoutMatch = Core.Event.findWorkflowNodes(source, workflowNodeNames.profileLayout)[0];
        const layoutWorkflow = layoutMatch?.node;
        const inputChangedStep = layoutWorkflow
          ? Core.Event.getChild(layoutWorkflow, "childInputChanged")
          : null;
        if (!inputChangedStep) return;

        Core.Event.App.request(
          Core.Event.requestMap([[inputChangedStep, {value: currentName}]]),
          source
        );
      }
    });

    const emailInput = Ui.Fetch.Inputs.V1.Input({
      prop_name: "email",
      prop_value: currentEmail,
      prop_labelTitle: Lang.t(labels.fieldEmail),
      prop_type: "email",
      prop_placeholder: Lang.t(labels.fieldEmailPlaceholder)
    }, {
      INPUT_CHANGE: (_event, _dataArgs, componentArgs) => {
        currentEmail = String(componentArgs?.VALUE ?? "");
      }
    });

    const roleSelector = Ui.Fetch.Inputs.V1.InputSelectOption({
      prop_name: "role",
      prop_itemSelected: currentRole,
      prop_options: [
        {id: "member", name: Lang.t(labels.roleMember)},
        {id: "admin", name: Lang.t(labels.roleAdmin)}
      ],
      prop_labelShow: true,
      prop_labelTitle: Lang.t(labels.fieldRole),
      prop_placeholder: Lang.t(labels.chooseRole)
    }, {
      SELECT_CHANGE: (_event, _dataArgs, componentArgs) => {
        currentRole = String(componentArgs?.VALUE ?? "member");
      }
    });

    const submitButton = Ui.Fetch.Inputs.Simple.Button({
      prop_btnTitle: Lang.t(labels.actionCreateProfile)
    }, {
      CLICK: () => {
        resultText.set(currentName.trim()
          ? Lang.t(labels.messageProfileReady, {
              name: currentName,
              role: currentRole,
              email: currentEmail || Lang.t(labels.messageNoEmail)
            })
          : Lang.t(labels.messageNameRequired));
      }
    });

    const resultLabel = Ui.Fetch.Inputs.Simple.Label({
      prop_labelTitle: resultText
    });

    const profileLayout = Ui.Basic.Layout({
      prop_workflowChildName: workflowNodeNames.profileLayout,
      prop_col: LayoutColumn.COL_12,
      prop_layoutContent: [
        {content: nameInput, col: LayoutColumn.COL_12, workflowChildName: workflowNodeNames.nameInput},
        {content: emailInput, col: LayoutColumn.COL_12, workflowChildName: workflowNodeNames.emailInput},
        {content: roleSelector, col: LayoutColumn.COL_12, workflowChildName: workflowNodeNames.roleSelector},
        {content: submitButton, col: LayoutColumn.COL_12, workflowChildName: workflowNodeNames.submitButton},
        {content: resultLabel, col: LayoutColumn.COL_12, workflowChildName: workflowNodeNames.resultLabel}
      ]
    });

    // The layout owns this workflow endpoint. The input above sends a CoreEvent request to it.
    const inputChangedStep = Core.Event.getChild(profileLayout.getComponentWorkflow(), "childInputChanged");
    if (!inputChangedStep) throw new Error("componentLayout has no childInputChanged workflow step");
    Core.Event.App.registerEmit(inputChangedStep, (request) => {
      resultText.set(Lang.t(labels.messageNameChanged, {
        name: String(request.payload.value ?? "")
      }));
      return {value: request.payload.value};
    });

    return new Controller.Requests.RequestManager({
      status: true,
      messages: [],
      data: {content: profileLayout},
      reference: {
        source: "acme.account.profile-create",
        method: Controller.Requests.RequestMethod.INTERNAL
      }
    }).get();
  }
});
```

در `prop_layoutContent` خود نمونه‌های کامپوننت را می‌دهیم، نه رشتهٔ HTML. `ComponentLayout` آن‌ها را render و به workflow فرزند وصل می‌کند. `workflowChildName`های آیتم‌ها نام فرزندان Layout هستند؛ `profileLayout` هم نام Layout در workflow میزبان است.

## نمایش کنترلر با ComponentWidget

`ControllerManager.create` factory را اجرا می‌کند و پاسخ `RequestState` را اعتبارسنجی می‌کند. `ComponentWidget` محتوای `data.content` را مستقیم render می‌کند؛ لازم نیست برای این حالت source جاوااسکریپتی یا آدرس source برگردانید:

```ts
const profileWidget = Ui.Fetch.Form.Widget({
  prop_workflowChildName: "profileCreateWidget",
  prop_controller: () => ControllerManager.create(
    profileController.id,
    {name: "Sara", email: "sara@example.com"}
  )
});

document.querySelector("#app")?.replaceChildren(profileWidget.getElement());
```

برای یک صفحه یا route، همین `profileWidget` را در محتوای صفحهٔ خود قرار دهید. می‌توانید به‌جای یک Layout، یک کامپوننت یا آرایه‌ای از محتوا برگردانید؛ برای ثبت workflow هر فرزند، نام‌های ثابت تعریف کنید.

## شکل workflow و ارسال رویداد

در مثال بالا، ساختار ثبت‌شده به‌صورت مفهومی چنین است:

```text
componentWidget
└── profileLayout                         componentLayout
    ├── step: childInputChanged           layout event endpoint
    ├── nameInput                         componentInput
    │   └── step: inputChange
    ├── emailInput                        componentInput
    │   └── step: inputChange
    ├── roleSelector                      componentInputSelectOption
    │   └── step: selectChange
    ├── submitButton                      componentButton
    │   └── step: click
    └── resultLabel                       componentLabel
        └── step: click
```

وقتی ورودی نام تغییر می‌کند، handler نام `nameInput` را به‌عنوان مبدأ می‌گیرد. `Core.Event.findWorkflowNodes` گره‌های `profileLayout` را از نزدیک‌ترین مورد پیدا می‌کند؛ سپس `getChild(..., "childInputChanged")` endpoint همان Layout را می‌گیرد و `Core.Event.App.request` مقدار را برای آن می‌فرستد. `registerEmit` روی endpoint درخواست را دریافت و متن نتیجه را به‌روزرسانی می‌کند. بنابراین کد مصرف‌کننده مسیر کامل `workflow.children...` را نمی‌سازد.

برای نمایش نام‌ها و عنوان‌های محلی گره‌ها در ابزار workflow:

```ts
const workflowNodes = ControllerManager
  .listWorkflowNodes(profileController.id)
  .map(({name, title}) => ({name, title}));
```

نام‌ها فقط درون یک controller باید یکتا باشند. اگر چند مقصد همنام در یک درخت وجود داشته باشد، `findWorkflowNodes` آن‌ها را از نزدیک‌ترین تا دورترین مورد مرتب می‌کند؛ تصمیم نهایی انتخاب مقصد با کد فرستنده است.

## API و اعتبارسنجی

- `registerCategories({namespace, categories})` یک درخت دسته‌بندی اعتبارسنجی‌شده ثبت می‌کند و reference دسته‌ها را می‌دهد.
- `register(definition)` یک کنترلر ثبت می‌کند؛ `registerMany(definitions)` چند کنترلر را اتمیک ثبت می‌کند.
- `get(id)`، `has(id)`، `list()` و `listByCategory(category, includeDescendants?)` برای جست‌وجوی کنترلرها هستند.
- `listCategories(namespace?)` دسته‌های ثبت‌شده را فهرست می‌کند.
- `listWorkflowNodes(controllerId)` نام‌ها و ترجمه‌های nodeهای workflow یک کنترلر را برمی‌گرداند.
- `create(id, params?)` factory را اجرا می‌کند و `RequestState` یا `Promise<RequestState>` می‌دهد.

ثبت‌کننده شناسهٔ تکراری، کلید ترجمهٔ ناشناخته، reference دستهٔ ثبت‌نشده، factory نامعتبر و نام workflow نامعتبر را رد می‌کند. دسته‌ها و batch کنترلرها فقط پس از موفقیت اعتبارسنجی کامل ثبت می‌شوند. پاسخ factory باید `RequestState` معتبر و `data` آن یک object باشد.
