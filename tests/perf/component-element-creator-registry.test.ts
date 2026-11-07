import {describe, expect, it} from "vitest";
import "./setup";
import * as ComponentElementCreator from "@/ui_components/lists/componentElementCreator/runtime";
import {ElementCreatorMode} from "@/ui_components/lists/componentElementCreator/Props";

describe("ComponentElementCreator registry loading", () => {
    it("loads component options only after opening settings", async () => {
        const creator = new ComponentElementCreator.Component({
            prop_mode: ElementCreatorMode.SETTING_CREATE,
        } as any);
        const previousCancelAnimationFrame = (globalThis as any).cancelAnimationFrame;
        (globalThis as any).cancelAnimationFrame = (handle: number) => clearTimeout(handle);

        try {
            expect((creator as any)._SETTINGS_REGISTERED_COMPONENTS).toHaveLength(0);

            creator.call_openSettings();

            const deadline = Date.now() + 15_000;
            while ((creator as any)._SETTINGS_REGISTERED_COMPONENTS.length === 0 && Date.now() < deadline) {
                await new Promise((resolve) => setTimeout(resolve, 10));
            }

            expect((creator as any)._SETTINGS_REGISTERED_COMPONENTS.length).toBeGreaterThan(0);
            expect((creator as any)._SETTINGS_COMPONENT_SELECT.get("prop_options").length).toBeGreaterThan(0);
        } finally {
            creator.dispose();
            if (previousCancelAnimationFrame === undefined) delete (globalThis as any).cancelAnimationFrame;
            else (globalThis as any).cancelAnimationFrame = previousCancelAnimationFrame;
        }
    });
});
