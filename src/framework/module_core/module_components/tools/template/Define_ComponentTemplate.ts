// --------------------------------
import {Interface_ComponentTemplate as TemplateInterface}      from "../../tools/template/Interface_ComponentTemplate";
import {Type_ComponentTemplate      as TemplateType}           from "../../tools/template/Type_ComponentTemplate";

export function Define_ComponentTemplate<TTemplatesTypes , TPropTypes>(templates: { [K in  TemplateType<TTemplatesTypes>]: TemplateInterface<TPropTypes> }):  { [K in  TemplateType<TTemplatesTypes>]: TemplateInterface<TPropTypes> }{
    return templates;
}