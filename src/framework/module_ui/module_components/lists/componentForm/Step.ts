import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createFormStep() {
    const endpoint = () => DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as unknown})});
    return DefineWorkflow({children: {submit: endpoint(), getResponse: endpoint(), response: endpoint()}});
}
