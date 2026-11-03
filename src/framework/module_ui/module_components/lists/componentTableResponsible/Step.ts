import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createTableResponsibleStep() {
    return DefineWorkflow({
        children: {
            clickRowOption: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})}),
            callbackColSelector: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})}),
            changeViewMode: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})}),
        },
    });
}
