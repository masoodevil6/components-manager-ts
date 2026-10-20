import * as CoreEvent from "@/core_event";

export function createCollapseLineStep() {
    return CoreEvent.Step({
        children: {
            click: CoreEvent.Step({
                request: CoreEvent.Request(),
                response: CoreEvent.Response({value: false}),
            }),
        },
    });
}
