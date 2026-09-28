import * as CoreComponents from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreLanguage from "@/core_languages";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export const Props = {
    prop_backgroundColor_body: Define_ComponentProp<string | null>({ prop: "prop_backgroundColor_body", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), name: Keys.category.components.timerDown.props.backgroundColor_body.name, description: Keys.category.components.timerDown.props.backgroundColor_body.description }),
    prop_backgroundColor_timer: Define_ComponentProp<string | null>({ prop: "prop_backgroundColor_timer", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), name: Keys.category.components.timerDown.props.backgroundColor_timer.name, description: Keys.category.components.timerDown.props.backgroundColor_timer.description }),
    prop_backgroundColor_timerEffect: Define_ComponentProp<string | null>({ prop: "prop_backgroundColor_timerEffect", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), name: Keys.category.components.timerDown.props.backgroundColor_timerEffect.name, description: Keys.category.components.timerDown.props.backgroundColor_timerEffect.description }),
    prop_color_timer: Define_ComponentProp<string | null>({ prop: "prop_color_timer", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), name: Keys.category.components.timerDown.props.color_timer.name, description: Keys.category.components.timerDown.props.color_timer.description }),
    prop_color_description: Define_ComponentProp<string | null>({ prop: "prop_color_description", default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1), name: Keys.category.components.timerDown.props.color_description.name, description: Keys.category.components.timerDown.props.color_description.description }),
    prop_description: Define_ComponentProp<string | null>({ prop: "prop_description", default: null, name: Keys.category.components.timerDown.props.description.name, description: Keys.category.components.timerDown.props.description.description }),
    prop_show_options: Define_ComponentProp<boolean>({ prop: "prop_show_options", default: true, name: Keys.category.components.timerDown.props.show_options.name, description: Keys.category.components.timerDown.props.show_options.description }),
    prop_tooltipIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({ prop: "prop_tooltipIcon", default: UiIcons.Src.SymbolExclumationSquare.Definition, name: Keys.category.components.timerDown.props.tooltipIcon.name, description: Keys.category.components.timerDown.props.tooltipIcon.description }),
    prop_lang_on_progress_duration: Define_ComponentProp<CoreObservable.App<string>>({ prop: "prop_lang_on_progress_duration", default: CoreLanguage.App.translate(Keys.category.components.timerDown.texts.onProgressDuration), name: Keys.category.components.timerDown.props.lang_on_progress_duration.name, description: Keys.category.components.timerDown.props.lang_on_progress_duration.description }),
    prop_lang_on_end_duration: Define_ComponentProp<CoreObservable.App<string>>({ prop: "prop_lang_on_end_duration", default: CoreLanguage.App.translate(Keys.category.components.timerDown.texts.onEndDuration), name: Keys.category.components.timerDown.props.lang_on_end_duration.name, description: Keys.category.components.timerDown.props.lang_on_end_duration.description }),
    prop_lang_btn_resend: Define_ComponentProp<CoreObservable.App<string>>({ prop: "prop_lang_btn_resend", default: CoreLanguage.App.translate(Keys.category.components.timerDown.texts.btnResend), name: Keys.category.components.timerDown.props.lang_btn_resend.name, description: Keys.category.components.timerDown.props.lang_btn_resend.description }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
