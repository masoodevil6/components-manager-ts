import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createInputFileStep() {
    const endpoint = () => DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as unknown})});
    return DefineWorkflow({children: {changeFiles: endpoint(), deleteFile: endpoint()}});
}
