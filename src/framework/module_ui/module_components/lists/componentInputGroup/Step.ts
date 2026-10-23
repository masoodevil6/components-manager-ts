import * as CoreEvent from "@/core_event";

export function createInputGroupStep() {
  const endpoint = () =>
    CoreEvent.Step({
      request: CoreEvent.Request(),
      response: CoreEvent.Response({ value: {} as Record<string, any> }),
    });

  return CoreEvent.Step({
    children: {
      inputChange: endpoint(),
      inputFocus: endpoint(),
      inputBlur: endpoint(),
      clickButton: endpoint(),
    },
  });
}
