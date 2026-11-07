import {describe, expect, it} from "vitest";
import "./setup";
import * as ComponentElementCreator from "@/ui_components/lists/componentElementCreator/runtime";
import {ElementCreatorMode} from "@/ui_components/lists/componentElementCreator/Props";

describe("ComponentElementCreator edit controls", () => {
    it("loads edit controls only in edit mode and creates the menu on hover", async () => {
        const previousCancelAnimationFrame = (globalThis as any).cancelAnimationFrame;
        (globalThis as any).cancelAnimationFrame = (handle: number) => clearTimeout(handle);
        const renderCreator = new ComponentElementCreator.Component({
            prop_mode: ElementCreatorMode.RENDER,
            prop_component: null,
        } as any);
        const creator = new ComponentElementCreator.Component({
            prop_mode: ElementCreatorMode.EDIT,
            prop_component: null,
        } as any);

        try {
            document.body.appendChild(renderCreator.getElement());
            expect((renderCreator as any)._EDIT_RUNTIME_PROMISE).toBeNull();
            expect((renderCreator as any)._EDIT_RUNTIME).toBeNull();
            document.body.appendChild(creator.getElement());
            const editRuntimePromise = (creator as any)._EDIT_RUNTIME_PROMISE as Promise<unknown>;
            expect(editRuntimePromise).toBeInstanceOf(Promise);
            await editRuntimePromise;
            expect((creator as any)._EDIT_RUNTIME).not.toBeNull();

            expect((creator as any)._OPTIONS_MENU).toBeNull();
            expect((creator as any)._OPTIONS_BORDER).toBeNull();

            const host = creator.getElement().querySelector('[data-part-name="part-element-creator-host"]') as HTMLElement;
            host.dispatchEvent(new MouseEvent("mouseenter"));

            expect((creator as any)._OPTIONS_MENU).not.toBeNull();
            expect((creator as any)._OPTIONS_BORDER).not.toBeNull();
        } finally {
            renderCreator.dispose();
            creator.dispose();
            if (previousCancelAnimationFrame === undefined) delete (globalThis as any).cancelAnimationFrame;
            else (globalThis as any).cancelAnimationFrame = previousCancelAnimationFrame;
        }
    });
});
