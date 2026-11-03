import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
import * as Core from "@/core";

const endpoint = () => DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as unknown})});

export function createCustomFormStep() {
    return DefineWorkflow({
        children: {
            [Core.Dictionary.WorkflowNodeNames.customFormGroupSettings]: endpoint(),
            templateChange: endpoint(),
            valueChange: endpoint(),
            submit: endpoint(),
            getResponse: endpoint(),
            response: endpoint(),
        },
    });
}
