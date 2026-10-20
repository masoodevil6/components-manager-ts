import * as CoreEvent from "@/core_event";
import type {JsonValue} from "../componentJsonTree/Types";

export function createInputJsonStep() {
    const endpoint = () => CoreEvent.Step({
        request: CoreEvent.Request(),
        response: CoreEvent.Response({value: "" as string, json: null as JsonValue | null, isValid: false}),
    });
    return CoreEvent.Step({children: {
        inputChange: endpoint(),
        inputFocus: endpoint(),
        inputBlur: endpoint(),
    }});
}
