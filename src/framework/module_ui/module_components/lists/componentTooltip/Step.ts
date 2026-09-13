import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentTooltip (Plan 14.1.0)
 *
 * هر ComponentTooltip Instance باید Step Instance مستقل داشته باشد.
 */
export function createTooltipStep() {
    return CoreEvent.Step({
        children: {},
    });
}
