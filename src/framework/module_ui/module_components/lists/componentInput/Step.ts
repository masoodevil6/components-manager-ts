import * as CoreEvent from "@/core_event";

export function createInputStep() {
    const endpoint = () => CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as string | null})});
    return CoreEvent.Step({children: {
        inputChange: endpoint(),
        inputFocus: endpoint(),
        inputBlur: endpoint(),
        clickButton: endpoint(),
    }});
}
