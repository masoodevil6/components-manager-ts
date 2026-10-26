import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createInputGroupStep() {
  const endpoint = () =>
    DefineWorkflow({
      request: CoreEvent.Request(),
      response: CoreEvent.Response({ value: {} as Record<string, any> }),
    });

  return DefineWorkflow({
    children: {
      inputChange: endpoint(),
      inputFocus: endpoint(),
      inputBlur: endpoint(),
      clickButton: endpoint(),
    },
  });
}
