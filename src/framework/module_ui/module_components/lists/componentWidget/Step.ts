import * as CoreEvent from "@/core_event";

const fetchStep = () => CoreEvent.Step({
    request: CoreEvent.Request(),
    response: CoreEvent.Response({value: null as unknown}),
});

export function createWidgetStep() {
    return CoreEvent.Step({
        children: {
            fetch: fetchStep(),
            retry: fetchStep(),
        },
    });
}
