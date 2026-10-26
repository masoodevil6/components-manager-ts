import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

const endpoint = () => DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as unknown})});

export function createCustomFormStep() {
    return DefineWorkflow({
        children: {
            templateChange: endpoint(),
            valueChange: endpoint(),
            submit: endpoint(),
            getResponse: endpoint(),
            response: endpoint(),
        },
    });
}
