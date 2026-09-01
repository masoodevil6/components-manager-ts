import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Node — درخت Workflow داخلی ComponentIcon
 *
 * این Step در constructor ComponentIcon به ComponentStructure پاس داده می‌شود.
 * در متدهای render به reactiveElementها متصل می‌شود.
 *
 * تفاوت با identity:
 *   identity = بیرونی — والد به این Component
 *   step     = داخلی — این Component به فرزندانش
 */
export const IconStep = CoreEvent.Step({
    children: {
        click: CoreEvent.Step({
            request:  CoreEvent.Request(),
            response: CoreEvent.Response({ value: "" }),
        }),
        hover: CoreEvent.Step({
            request:  CoreEvent.Request(),
            response: CoreEvent.Response({ value: "" }),
        }),
        blur: CoreEvent.Step({
            request:  CoreEvent.Request(),
            response: CoreEvent.Response({ value: "" }),
        }),
    }
});
