import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * MessageEventScope — هویت Eventی یک Message (Plan 8.2.8)
 *
 * این abstraction به‌جای دسترسی مستقیم به step.children.icon.children.close
 * یک رابط خوانا و type-safe ارائه می‌دهد.
 *
 * ساختار:
 *   MessageEventScope
 *   │
 *   └── root (Step اصلی این Scope)
 *        ├── body   ← unique روی section (محتوای پیام)
 *        └── icon
 *             └── close ← unique روی icon (آیکون بستن)
 *
 * Ownership:
 *   - ComponentMessages مالک Map<messageId, MessageEventScope> است
 *   - هر Scope متعلق به lifecycle همان Message Instance است
 *   - وقتی Message حذف می‌شود، Scope آن dispose می‌شود
 *
 * Plan 8.2.8 — قانون طلایی:
 *   State changes ≠ Event identity changes
 *   Scope در re-render حفظ می‌شود — فقط وقتی Message حذف شود dispose می‌شود
 */
export interface MessageEventScope {

    /** Step اصلی این Scope — برای SubEvent attachment و disposal */
    readonly root: CoreEvent.TStepInstance<any>;

    /** body — unique روی section (محتوای پیام) — target برای close Request */
    readonly body: CoreEvent.TStepInstance<any>;

    /** icon.close — unique روی icon — source برای close Request */
    readonly icon: {
        readonly close: CoreEvent.TStepInstance<any>;
    };
}


/**
 * ساخت یک MessageEventScope جدید (Plan 8.2.8)
 *
 * این متد فقط ساختار Event Scope را ایجاد می‌کند — مسئول lifecycle یا caching نیست.
 * ComponentMessages مالک Registry و reconciliation است.
 *
 * مصرف:
 *   const scope = createMessageEventScope();
 *   CoreEvent.SubEvent(messagesStep, `message_${id}`, scope.root);
 */
export const createMessageEventScope = (): MessageEventScope => {

    const root = CoreEvent.Step({
        children: {

            // body — محتوای پیام — target برای close Request
            body: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),

            // icon — آیکون بستن
            icon: CoreEvent.Step({
                children: {
                    close: CoreEvent.Step({
                        request:  CoreEvent.Request(),
                        response: CoreEvent.Response({ value: "" }),
                    }),
                },
            }),
        }
    });

    // type-safe extraction — به‌جای step.children.icon.children.close
    return {
        root,
        body:  root.body,
        icon:  {
            close: root.icon.close,
        },
    };
};
