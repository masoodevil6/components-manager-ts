import * as CoreEvent from "@/core_event";

export function createInputSimpleStep() {
    const endpoint = () => CoreEvent.Step({
        request: CoreEvent.Request(),
        response: CoreEvent.Response({value: null as string | null}),
    });
    return CoreEvent.Step({
        children: {
            inputChange: endpoint(),
            inputFocus: endpoint(),
            inputBlur: endpoint(),
        },
    });
}
