import '../files/styles/app.css';
import '../files/styles/main.css';

import "./bootstrap/Language";

// core
export * as Core           from "@/core";
export * as Config         from "@/core_configs";
export * as Language       from "@/core_languages";
export * as Lang           from "./Lang";
export * as Observable     from "@/core_observable";
export * as Reactive       from "@/core_reactive";
export * as ComponentBase  from "@/core_components";
export * as Route          from "@/core_route";
export * as Controller     from "./module_ui/module_controller";
export * as Consumer       from "./Consumer";


// UI
export * as Pages          from "@/ui_pages";
export {PageManager}       from "@/ui_pages";
export * as UI              from "./module_ui";


// util
export * as Brand          from "@/util_brands";
export * as Consts         from "@/util_consts";
export * as Styles         from "@/util_styles";
export * as Shapes         from "@/util_shapes";
export * as Validators     from "@/util_validators";
export * as Convertor      from "@/util_convertor";
export * as Files          from "@/util_files";
export * as Dates          from "@/util_dates";
export * as Tools          from "@/util_tools";
export * as OptionsStd     from "@/util_options_std";
