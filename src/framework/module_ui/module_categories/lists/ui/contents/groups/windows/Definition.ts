import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../../languages";
import {Window} from "../../window";
import {WindowConfirm} from "../../windowConfirm";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "windows",
    name: Keys.category.components.contents.windows.name,
    description: Keys.category.components.contents.windows.description,
    components: [Window, WindowConfirm] as NonNullable<UICategories.TCategoryComponentDefinition["components"]>,
};
