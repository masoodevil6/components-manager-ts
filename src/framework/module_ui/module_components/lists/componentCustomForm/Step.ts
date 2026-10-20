import * as CoreEvent from "@/core_event";

const endpoint = () => CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as unknown})});

export function createCustomFormStep() {
    return CoreEvent.Step({
        children: {
            templateChange: endpoint(),
            valueChange: endpoint(),
            submit: endpoint(),
            getResponse: endpoint(),
            response: endpoint(),
        },
    });
}
