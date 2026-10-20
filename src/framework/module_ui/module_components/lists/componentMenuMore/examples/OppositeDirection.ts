import type {ComponentExample} from "@/core_components";
import * as CoreConfig from "@/core_configs";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";
import {MenuMoreOrientation} from "../Props";

export const OppositeDirectionExample: ComponentExample = {
    id: "menu_more_opposite_direction",
    name: Keys.category.components.menuMore.examples.oppositeDirection.name,
    description: Keys.category.components.menuMore.examples.oppositeDirection.description,
    render: (): HTMLElement => UiCategory.UI.Menus.MenuMore({
        prop_orientation: MenuMoreOrientation.VERTICAL,
        prop_directionRtl: !CoreConfig.Settings.DirectionRtl.get(),
        prop_items: [
            {
                type: "group",
                id: "workspace",
                items: [
                    {
                        id: "workspace-menu",
                        title: "Workspace",
                        icon: UiIcons.Src.FileApplication.Definition,
                        children: [
                            {
                                id: "workspace-settings",
                                title: "Settings",
                                children: [
                                    {id: "workspace-profile", title: "Profile", action: "profile"},
                                    {id: "workspace-preferences", title: "Preferences", action: "preferences"},
                                ],
                            },
                            {id: "workspace-members", title: "Members", action: "members"},
                        ],
                    },
                    {id: "workspace-help", title: "Help", action: "help"},
                ],
            },
        ],
    }, {
        SELECT_ITEM: (_event, dataArgs) => console.log("opposite direction menu item selected", dataArgs?.ITEM),
    }).getElement() as HTMLElement,
};
