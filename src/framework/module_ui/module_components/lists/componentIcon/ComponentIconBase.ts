import * as CoreComponents   from "@/core_components";
// --------------------------------
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
// --------------------------------
import {Props,     PropsType}     from "./Props";
import {Schemas,   SchemasType}   from "./Schemas";
import {Methods,   MethodsType}   from "./Methods";
import {Definition}               from "./Definition";


/**
 * ComponentIconBase — ترکیب config پایه و اختصاصی
 *
 * ارث از CoreComponents.App (ClComponentBase) — نه ComponentStructure.
 * ComponentIcon خودش یک Component مستقل است.
 * ComponentStructure به‌عنوان فرزند در renderContentComponent استفاده می‌شود.
 *
 * ۷ prop پایه ComponentStructure از ComponentStructureTrait.props در _COMPONENT_PATTERN
 * ثبت می‌شوند تا کاربر بتواند آن‌ها را set کند — سپس در renderContentComponent
 * به ComponentStructure.create() forward می‌شوند.
 */
export class ComponentIconBase extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType
> {

    protected _COMPONENT_DEFINITION = Definition;

    // ۷ prop پایه (از Trait) + ۴ prop اختصاصی ComponentIcon
    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<PropsType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    } as any);

    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<SchemasType, PropsType & Record<string, any>>({
        ...Schemas,
    } as any);

    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, PropsType & Record<string, any>>({
        ...Methods,
    } as any);

}
