import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export const createConsoleStep = () => DefineWorkflow({
    children: {
        clear: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({count: 0 as number})}),
        entry: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({entry: null as any, level: "log"})}),
        filterChange: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({level: "all"})}),
    },
});
