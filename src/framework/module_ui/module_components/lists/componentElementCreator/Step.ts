import {DefineWorkflow} from "@/core_components";
import * as Core from "@/core";
import * as CoreEvent from "@/core_event";

export const createElementCreatorStep = () => DefineWorkflow({
    children: {
        [Core.Dictionary.WorkflowNodeNames.elementCreatorStyleChanged]: DefineWorkflow({
            request: CoreEvent.Request(),
            response: CoreEvent.Response({
                applied: false,
                values: null as Record<string, any> | null,
            }),
        }),
    },
});
