import * as CoreComponents from "@/core_components";
import * as CoreReactive   from "@/core_reactive";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UiIcons          from "@/ui_icons";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Props اختصاصی ComponentWindowConfirm
 *
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_icon",
        default:      UiIcons.Src.SymbolExclumationWarning.Definition,
        name:         Keys.category.components.windowConfirm.props.icon.name,
        description:  Keys.category.components.windowConfirm.props.icon.description,
    }),

    prop_message: Define_ComponentProp<string>({
        prop:         "prop_message",
        default:      "",
        name:         Keys.category.components.windowConfirm.props.message.name,
        description:  Keys.category.components.windowConfirm.props.message.description,
    }),

    prop_title: Define_ComponentProp<string>({
        prop:         "prop_title",
        default:      "",
        name:         Keys.category.components.windowConfirm.props.title.name,
        description:  Keys.category.components.windowConfirm.props.title.description,
    }),

    prop_acceptText: Define_ComponentProp<string>({
        prop:         "prop_acceptText",
        default:      "Confirm",
        name:         Keys.category.components.windowConfirm.props.acceptText.name,
        description:  Keys.category.components.windowConfirm.props.acceptText.description,
    }),

    prop_cancelText: Define_ComponentProp<string>({
        prop:         "prop_cancelText",
        default:      "Cancel",
        name:         Keys.category.components.windowConfirm.props.cancelText.name,
        description:  Keys.category.components.windowConfirm.props.cancelText.description,
    }),

    prop_showCancel: Define_ComponentProp<boolean>({
        prop:         "prop_showCancel",
        default:      true,
        name:         Keys.category.components.windowConfirm.props.showCancel.name,
        description:  Keys.category.components.windowConfirm.props.showCancel.description,
    }),

    prop_showAccept: Define_ComponentProp<boolean>({
        prop:         "prop_showAccept",
        default:      true,
        name:         Keys.category.components.windowConfirm.props.showAccept.name,
        description:  Keys.category.components.windowConfirm.props.showAccept.description,
    }),

    prop_closeOnOverlay: Define_ComponentProp<boolean>({
        prop:         "prop_closeOnOverlay",
        default:      true,
        name:         Keys.category.components.windowConfirm.props.closeOnOverlay.name,
        description:  Keys.category.components.windowConfirm.props.closeOnOverlay.description,
    }),

    prop_windowWidth: Define_ComponentProp<number>({
        prop:         "prop_windowWidth",
        default:      400,
        name:         Keys.category.components.windowConfirm.props.windowWidth.name,
        description:  Keys.category.components.windowConfirm.props.windowWidth.description,
    }),

    prop_windowHeight: Define_ComponentProp<number>({
        prop:         "prop_windowHeight",
        default:      200,
        name:         Keys.category.components.windowConfirm.props.windowHeight.name,
        description:  Keys.category.components.windowConfirm.props.windowHeight.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentWindowConfirm — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
