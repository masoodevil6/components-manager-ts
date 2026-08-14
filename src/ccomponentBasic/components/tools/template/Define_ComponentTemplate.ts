import * as CoreComponent from "@/core_components";

export function Define_ComponentTemplate<TTemplatesTypes , TPropTypes>(templates: { [K in  CoreComponent.Tools.Template.Type<TTemplatesTypes>]: CoreComponent.Tools.Template.Interface<TPropTypes> }):  { [K in  CoreComponent.Tools.Template.Type<TTemplatesTypes>]: CoreComponent.Tools.Template.Interface<TPropTypes> }{
    return templates;
}