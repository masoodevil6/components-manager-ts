import * as CoreEvent from "@/core_event";

export function createInputColorStep() {
    return CoreEvent.Step({
        children: {
            change: CoreEvent.Step({
                request: CoreEvent.Request(),
                response: CoreEvent.Response({value: null as string | null}),
            }),
        },
    });
}
