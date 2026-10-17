import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export enum CodeMirrorLanguage {
    HTML = "html",
    JAVASCRIPT = "javascript",
}

export type CodeMirrorRunContext = {
    console: {
        log: (...values: unknown[]) => void;
        info: (...values: unknown[]) => void;
        warn: (...values: unknown[]) => void;
        error: (...values: unknown[]) => void;
        debug: (...values: unknown[]) => void;
    };
};

export type CodeMirrorRunResult = HTMLElement | Node | string | null | undefined | void;
export type CodeMirrorRunHandler = (source: string, language: CodeMirrorLanguage, context?: CodeMirrorRunContext) => CodeMirrorRunResult;

export const Props = {
    prop_title: Define_ComponentProp<string | null>({
        prop: "prop_title",
        default: null,
        name: Keys.category.components.codeMirror.props.title.name,
        description: Keys.category.components.codeMirror.props.title.description,
    }),
    prop_canRun: Define_ComponentProp<boolean>({
        prop: "prop_canRun",
        default: false,
        name: Keys.category.components.codeMirror.props.canRun.name,
        description: Keys.category.components.codeMirror.props.canRun.description,
    }),
    prop_run: Define_ComponentProp<CodeMirrorRunHandler | null>({
        prop: "prop_run",
        default: null,
        name: Keys.category.components.codeMirror.props.run.name,
        description: Keys.category.components.codeMirror.props.run.description,
    }),
    prop_value: Define_ComponentProp<string>({
        prop: "prop_value",
        default: "",
        name: Keys.category.components.codeMirror.props.value.name,
        description: Keys.category.components.codeMirror.props.value.description,
    }),
    prop_language: Define_ComponentProp<CodeMirrorLanguage>({
        prop: "prop_language",
        default: CodeMirrorLanguage.HTML,
        name: Keys.category.components.codeMirror.props.language.name,
        description: Keys.category.components.codeMirror.props.language.description,
    }),
    prop_isReadOnly: Define_ComponentProp<boolean>({
        prop: "prop_isReadOnly",
        default: false,
        name: Keys.category.components.codeMirror.props.isReadOnly.name,
        description: Keys.category.components.codeMirror.props.isReadOnly.description,
    }),
    prop_placeholder: Define_ComponentProp<string | null>({
        prop: "prop_placeholder",
        default: null,
        name: Keys.category.components.codeMirror.props.placeholder.name,
        description: Keys.category.components.codeMirror.props.placeholder.description,
    }),
    prop_lineWrapping: Define_ComponentProp<boolean>({
        prop: "prop_lineWrapping",
        default: true,
        name: Keys.category.components.codeMirror.props.lineWrapping.name,
        description: Keys.category.components.codeMirror.props.lineWrapping.description,
    }),
    prop_editorHeight: Define_ComponentProp<string | null>({
        prop: "prop_editorHeight",
        default: null,
        name: Keys.category.components.codeMirror.props.editorHeight.name,
        description: Keys.category.components.codeMirror.props.editorHeight.description,
    }),
    prop_numbersBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_numbersBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_2),
        name: Keys.category.components.codeMirror.props.numbersBackgroundColor.name,
        description: Keys.category.components.codeMirror.props.numbersBackgroundColor.description,
    }),
    prop_numbersColor: Define_ComponentProp<string>({
        prop: "prop_numbersColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.codeMirror.props.numbersColor.name,
        description: Keys.category.components.codeMirror.props.numbersColor.description,
    }),
    prop_numberActiveBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_numberActiveBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4),
        name: Keys.category.components.codeMirror.props.numberActiveBackgroundColor.name,
        description: Keys.category.components.codeMirror.props.numberActiveBackgroundColor.description,
    }),
    prop_lineActiveBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_lineActiveBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_4),
        name: Keys.category.components.codeMirror.props.lineActiveBackgroundColor.name,
        description: Keys.category.components.codeMirror.props.lineActiveBackgroundColor.description,
    }),
    prop_themeLightBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_themeLightBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.codeMirror.props.themeLightBackgroundColor.name,
        description: Keys.category.components.codeMirror.props.themeLightBackgroundColor.description,
    }),
    prop_themeDarkBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_themeDarkBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_4),
        name: Keys.category.components.codeMirror.props.themeDarkBackgroundColor.name,
        description: Keys.category.components.codeMirror.props.themeDarkBackgroundColor.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
