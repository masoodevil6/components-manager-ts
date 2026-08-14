import * as CoreComponent from "@/core_components";



export function Define_ComponentProp<TPropTypes>(patterns: { [K in CoreComponent.Tools.Prop.Type<TPropTypes>]: CoreComponent.Tools.Prop.Interface<TPropTypes[K]> } ) : { [K in CoreComponent.Tools.Prop.Type<TPropTypes>]: CoreComponent.Tools.Prop.Interface<TPropTypes[K]> } {
    return patterns;
}