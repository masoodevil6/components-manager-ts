import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Node — درخت Workflow داخلی ComponentMessages
 *
 * Plan 8.2.8 — ساختار جدید:
 *
 *   ComponentMessagesStep
 *   └── messages (container)
 *        ├── message_<id_1>  ← SubEvent (dynamic, per-message)
        │    ├── body
        │    └── icon.close
 *        ├── message_<id_2>  ← SubEvent (dynamic, per-message)
        │    ├── body
        │    └── icon.close
 *        └── message_<id_N>  ← SubEvent (dynamic, per-message)
             ├── body
             └── icon.close
 *
 * Per-Message Step در MessageEventScope.ts تعریف شده است (createMessageEventScope).
 * این factory فقط Component-level Step را می‌سازد.
 *
 * تفاوت با Plan 8.2.7:
 *   - قبل: message و icon.close در این فایل تعریف می‌شدند (ثابت مشترک)
 *   - بعد: فقط messages container — Per-Message Scopes در runtime ساخته می‌شوند
 *
 * تفاوت با identity:
 *   identity = بیرونی — والد به این Component
 *   step     = داخلی — این Component به فرزندانش
 */
export const createMessagesStep = () =>
    CoreEvent.Step({
        children: {

            // Container — div والد لیست پیام‌ها
            // Per-Message SubEventها در runtime به این node متصل می‌شوند
            messages: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
