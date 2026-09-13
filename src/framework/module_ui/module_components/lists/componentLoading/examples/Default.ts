import {ComponentExample} from "@/core_components";
import {ComponentLoading} from "../ComponentLoading";
import {Keys}              from "../../../../module_categories/languages";
// --------------------------------


/**
 * Example: Default
 * نمایش لودینگ دایره‌ای با دکمه لغو
 */
export const Default: ComponentExample = {
    id:          "loading_default",
    name:        Keys.category.components.loading.examples.default.name,
    description: Keys.category.components.loading.examples.default.description,

    render(): HTMLElement {
        const loading = new ComponentLoading(
            {
                classList: ["col-12", "border", "rounded", "p-2"],
                styles: {
                    "minHeight": "200px",
                },
                prop_structureStyles: {
                    position: "relative",
                    minHeight: "200px",
                },
                prop_loadingWidth:  60,
                prop_loadingHeight: 60,
                prop_showCancel:    true,
                prop_cancelDelay:   2000,
            } as any,
            {
                CANCEL: (event: Event) => {
                    console.log("Loading cancelled!");
                },
            } as any,
        );

        return loading.getElement() as HTMLElement;
    },
};
