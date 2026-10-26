import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
import type {JsonValue} from "../componentJsonTree/Types";

export function createInputJsonStep() {
    const endpoint = () => DefineWorkflow({
        request: CoreEvent.Request(),
        response: CoreEvent.Response({value: "" as string, json: null as JsonValue | null, isValid: false}),
    });
    return DefineWorkflow({children: {
        inputChange: endpoint(),
        inputFocus: endpoint(),
        inputBlur: endpoint(),
    }});
}
