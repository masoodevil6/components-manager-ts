import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export const createJsonTreeStep = () => DefineWorkflow({
    children: {
        nodeToggle: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({path: "$", expanded: false, value: null as any})}),
        searchChange: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({query: ""})}),
        expandAll: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({count: 0})}),
        collapseAll: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({count: 0})}),
        copy: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({success: false, path: "$", value: null as any})}),
    },
});
