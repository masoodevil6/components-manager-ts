import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createSelectCustomSimpleStep() {
    const endpoint = () => DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as string | number | null})});
    return DefineWorkflow({children: {selectChange: endpoint(), selectSearch: endpoint(), selectOpen: endpoint(), selectClose: endpoint()}});
}
