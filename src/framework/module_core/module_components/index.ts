/// Class
export {ClComponentBase as App} from "./basic/class/ClComponentBase"

/// Abstract
export {AbComponentConnector as ComponentConnector} from "./basic/abstract/AbComponentConnector"

/// Methods
export {MtSetValue as SetValue} from "./basic/methods/MtSetValue"

/// Types (moved to tools)
export type {Type_ComponentDefinition    as ComponentDefinition}  from "./tools/defination/Type_ComponentDefinition"
export type {Interface_ComponentIdentity as ComponentIdentity}    from "./tools/Idetify/Interface_ComponentIdentity"
export type {Interface_ComponentProp     as ComponentPropEntry}   from "./tools/prop/Interface_ComponentProp"
export type {Interface_ComponentSchema   as ComponentSchemaEntry} from "./tools/schema/Interface_ComponentSchema"
export type ComponentProps   = Record<string, import("./tools/prop/Interface_ComponentProp").Interface_ComponentProp<any>>;
export type ComponentSchemas = Record<string, import("./tools/schema/Interface_ComponentSchema").Interface_ComponentSchema<any, any>>;

/// Types (remaining in basic/types)
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
export type {Interface_ComponentExample as ComponentExample} from "./tools/example/Interface_ComponentExample"

/// Manager
export      {ComponentManager}            from "./basic/manager/ComponentManager"
export type {ComponentRegistryEntry}      from "./basic/manager/ComponentManager"
export type {ComponentConstructor}        from "./basic/manager/ComponentManager"

/// Namespaces (backward compatibility)
export * as Basic from "./basic"
export * as Tools from "./tools"
