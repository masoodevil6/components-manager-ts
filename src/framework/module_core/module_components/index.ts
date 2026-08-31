/// Class — Legacy
export {ClComponentBase as App} from "./basic/class/ClComponentBase"

/// Class — ComponentBase (پلن 6.1 — قرارداد واحد Base)
export {ComponentBase}                                     from "./basic/class/ComponentBase"
export type {ComponentPropConfig}                          from "./basic/class/ComponentPropConfig"
export type {ComponentSchemaConfig}                        from "./basic/class/ComponentSchemaConfig"
export type {ComponentMethodConfig}                        from "./basic/class/ComponentMethodConfig"
export type {ComponentIdentity}                            from "./basic/class/ComponentIdentity"
export type {ComponentPropConfig   as PropConfig}   from "./basic/class/ComponentPropConfig"
export type {ComponentSchemaConfig as SchemaConfig} from "./basic/class/ComponentSchemaConfig"
export type {ComponentMethodConfig as MethodConfig} from "./basic/class/ComponentMethodConfig"
export type {ComponentIdentity     as Identity}     from "./basic/class/ComponentIdentity"

/// Abstract
export {AbComponentConnector as ComponentConnector} from "./basic/abstract/AbComponentConnector"

/// Methods
export {MtSetValue as SetValue} from "./basic/methods/MtSetValue"

/// Types
export type {TComponentDefinition  as ComponentDefinition}  from "./basic/types/TComponentDefinition"
export type {TExtractName          as ExtractName}          from "./basic/types/TExtractName"
export type {TExtractNameAndValue  as ExtractNameAndValue}  from "./basic/types/TExtractNameAndValue"
export type {TTypeOf               as TypeOf}               from "./basic/types/TTypeOf"
export type {TValueOf              as ValueOf}              from "./basic/types/TValueOf"
export type {TPartAttrDefault      as PartAttrDefault}      from "./basic/types/TPartAttrDefault"

/// Tools -> Prop
export type {Type_ComponentProp    as PropType}             from "./tools/prop/Type_ComponentProp"
export type {Interface_ComponentProp   as PropInterface}    from "./tools/prop/Interface_ComponentProp"
export      {Define_ComponentProp  as DefineProp}           from "./tools/prop/Define_ComponentProp"

/// Tools -> Schema
export type {Type_ComponentSchema      as SchemaType}       from "./tools/schema/Type_ComponentSchema"
export type {Interface_ComponentSchema as SchemaInterface}  from "./tools/schema/Interface_ComponentSchema"
export      {Define_ComponentSchema    as DefineSchema}     from "./tools/schema/Define_ComponentSchema"

/// Tools -> Template
export type {Type_ComponentTemplate      as TemplateType}      from "./tools/template/Type_ComponentTemplate"
export type {Interface_ComponentTemplate as TemplateInterface} from "./tools/template/Interface_ComponentTemplate"
export      {Define_ComponentTemplate    as DefineTemplate}    from "./tools/template/Define_ComponentTemplate"

/// Tools -> Method
export type {Type_ComponentMethod      as MethodType}      from "./tools/method/Type_ComponentMethod"
export type {Interface_ComponentMethod as MethodInterface} from "./tools/method/Interface_ComponentMethod"
export type {Callback_ComponentMethod  as MethodCallback}  from "./tools/method/Callback_ComponentMethod"
export      {Define_ComponentMethod    as DefineMethod}    from "./tools/method/Define_ComponentMethod"

/// Tools -> Example
export      {ExampleRenderer}                          from "./tools/example/ExampleRenderer"
export type {ExampleRendererComponentConstructor}      from "./tools/example/ExampleRenderer"
export type {ExampleRendererComponent}                 from "./tools/example/ExampleRenderer"
export type {Interface_ComponentExampleDefinition as ComponentExampleDefinition} from "./tools/example/Interface_ComponentExampleDefinition"

/// Namespaces (backward compatibility)
export * as Basic from "./basic"
export * as Tools from "./tools"