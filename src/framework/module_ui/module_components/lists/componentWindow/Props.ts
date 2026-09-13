import * as CoreComponents from "@/core_components";
import * as CoreReactive   from "@/core_reactive";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UtilConst        from "@/util_consts";
import * as UtilStyle        from "@/util_styles";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Enums اختصاصی ComponentWindow
 */
export enum WindowType {
    WINDOW =   "window",
    DIALOG =   "dialog",
}


/**
 * Props اختصاصی ComponentWindow
 *
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    prop_blurBackgroundColor: Define_ComponentProp<string>({
        prop:         "prop_blurBackgroundColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.window.props.blurBackgroundColor.name,
        description:  Keys.category.components.window.props.blurBackgroundColor.description,
    }),

    prop_windowBackgroundColor: Define_ComponentProp<string>({
        prop:         "prop_windowBackgroundColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_2),
        name:         Keys.category.components.window.props.windowBackgroundColor.name,
        description:  Keys.category.components.window.props.windowBackgroundColor.description,
    }),

    prop_windowWidth: Define_ComponentProp<number>({
        prop:         "prop_windowWidth",
        default:      700,
        name:         Keys.category.components.window.props.windowWidth.name,
        description:  Keys.category.components.window.props.windowWidth.description,
    }),

    prop_windowHeight: Define_ComponentProp<number>({
        prop:         "prop_windowHeight",
        default:      400,
        name:         Keys.category.components.window.props.windowHeight.name,
        description:  Keys.category.components.window.props.windowHeight.description,
    }),

    prop_windowRound: Define_ComponentProp<string>({
        prop:         "prop_windowRound",
        default:      UtilStyle.Css_BorderRadius(UtilConst.Sizes.M),
        name:         Keys.category.components.window.props.windowRound.name,
        description:  Keys.category.components.window.props.windowRound.description,
    }),

    prop_headerBackgroundColor: Define_ComponentProp<string>({
        prop:         "prop_headerBackgroundColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.window.props.headerBackgroundColor.name,
        description:  Keys.category.components.window.props.headerBackgroundColor.description,
    }),

    prop_headerTitleColor: Define_ComponentProp<string>({
        prop:         "prop_headerTitleColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.window.props.headerTitleColor.name,
        description:  Keys.category.components.window.props.headerTitleColor.description,
    }),

    prop_header: Define_ComponentProp<CoreReactive.App | string | null>({
        prop:         "prop_header",
        default:      null,
        name:         Keys.category.components.window.props.header.name,
        description:  Keys.category.components.window.props.header.description,
    }),

    prop_body: Define_ComponentProp<CoreReactive.App | string | null>({
        prop:         "prop_body",
        default:      null,
        name:         Keys.category.components.window.props.body.name,
        description:  Keys.category.components.window.props.body.description,
    }),

    prop_footer: Define_ComponentProp<CoreReactive.App | string | null>({
        prop:         "prop_footer",
        default:      null,
        name:         Keys.category.components.window.props.footer.name,
        description:  Keys.category.components.window.props.footer.description,
    }),

    prop_showBtnResize: Define_ComponentProp<boolean>({
        prop:         "prop_showBtnResize",
        default:      true,
        name:         Keys.category.components.window.props.showBtnResize.name,
        description:  Keys.category.components.window.props.showBtnResize.description,
    }),

    prop_showBtnClose: Define_ComponentProp<boolean>({
        prop:         "prop_showBtnClose",
        default:      true,
        name:         Keys.category.components.window.props.showBtnClose.name,
        description:  Keys.category.components.window.props.showBtnClose.description,
    }),

    prop_isVisible: Define_ComponentProp<boolean>({
        prop:         "prop_isVisible",
        default:      false,
        name:         Keys.category.components.window.props.isVisible.name,
        description:  Keys.category.components.window.props.isVisible.description,
    }),

    prop_isFullSize: Define_ComponentProp<boolean>({
        prop:         "prop_isFullSize",
        default:      false,
        name:         Keys.category.components.window.props.isFullSize.name,
        description:  Keys.category.components.window.props.isFullSize.description,
    }),

    prop_title: Define_ComponentProp<string>({
        prop:         "prop_title",
        default:      "",
        name:         Keys.category.components.window.props.title.name,
        description:  Keys.category.components.window.props.title.description,
    }),

    prop_content: Define_ComponentProp<string>({
        prop:         "prop_content",
        default:      "",
        name:         Keys.category.components.window.props.content.name,
        description:  Keys.category.components.window.props.content.description,
    }),

    prop_acceptText: Define_ComponentProp<string>({
        prop:         "prop_acceptText",
        default:      "Confirm",
        name:         Keys.category.components.window.props.acceptText.name,
        description:  Keys.category.components.window.props.acceptText.description,
    }),

    prop_cancelText: Define_ComponentProp<string>({
        prop:         "prop_cancelText",
        default:      "Cancel",
        name:         Keys.category.components.window.props.cancelText.name,
        description:  Keys.category.components.window.props.cancelText.description,
    }),

    prop_showCancel: Define_ComponentProp<boolean>({
        prop:         "prop_showCancel",
        default:      true,
        name:         Keys.category.components.window.props.showCancel.name,
        description:  Keys.category.components.window.props.showCancel.description,
    }),

    prop_showAccept: Define_ComponentProp<boolean>({
        prop:         "prop_showAccept",
        default:      true,
        name:         Keys.category.components.window.props.showAccept.name,
        description:  Keys.category.components.window.props.showAccept.description,
    }),

    prop_closeOnOverlay: Define_ComponentProp<boolean>({
        prop:         "prop_closeOnOverlay",
        default:      true,
        name:         Keys.category.components.window.props.closeOnOverlay.name,
        description:  Keys.category.components.window.props.closeOnOverlay.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentWindow — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
