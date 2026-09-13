import * as CoreObservable  from "@/core_observable";
import * as CoreReactive    from "@/core_reactive";
import * as CoreConfig      from "@/core_configs";
import * as CoreEvent       from "@/core_event";
import * as CoreComponents  from "@/core_components";
// --------------------------------
import {ComponentRecyclerViewBase} from "./ComponentRecyclerViewBase";
import {Schemas}                    from "./Schemas";
import {Props, type DirectionType}  from "./Props";
import {createRecyclerViewStep}     from "./Step";
import {ComponentStructureTrait}    from "../../traits/componentStructureTrait";
import {PartAttrDefault}           from "@/core_components";
// --------------------------------
import type {MethodsConfigType}     from "./Methods";
// --------------------------------


/**
 * ComponentRecyclerView — رندر لیست با جهت‌دهی (Plan 15.1.0)
 *
 * بازیابی Behavior از Legacy:
 *   - direction → flex-row / flex-row-reverse / flex-column / flex-column-reverse
 *   - children از prop_formComponents
 *   - stylesBind با computed merge (prop_formStyles)
 */
export class ComponentRecyclerView extends ComponentRecyclerViewBase {

    constructor(
        config?:  any,
        methods?: MethodsConfigType<ComponentRecyclerView>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        super("recycler-view", null, identity, createRecyclerViewStep());

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    dispose(): void {
        this.disposeStep();
    }


    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.COMPONENTS.part, {});
    }


    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema پایه ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema اختصاصی ---
            case Schemas.COMPONENTS.part:
                return this.renderComponents(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderComponents — رندر Part COMPONENTS
       section.d-flex + classBind(direction) + children
    --------------------------------------------- */
    protected renderComponents(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_formClass      = data?.["prop_formClass"]      ?? bind.prop_formClass;
        const prop_formStyles     = data?.["prop_formStyles"]     ?? bind.prop_formStyles;
        const prop_formComponents  = data?.["prop_formComponents"] ?? bind.prop_formComponents;
        const prop_formDirection   = data?.["prop_formDirection"]  ?? bind.prop_formDirection;

        const directionClass = CoreObservable.App.computed(
            (dir: DirectionType) => {
                switch (dir) {
                    case "horizontal":          return "flex-row";
                    case "horizontal_reverse":  return "flex-row-reverse";
                    case "vertical":            return "flex-column";
                    case "vertical_reverse":    return "flex-column-reverse";
                    default:                    return "flex-column";
                }
            },
            [prop_formDirection],
            this.getScope(),
        );

        const stylesMerged = CoreObservable.App.computed(
            (styleMap: Record<string, string> | null) => ({
                ...(styleMap ?? {}),
            }),
            [prop_formStyles],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            stylesBind: stylesMerged,
            className: ["d-flex"],
            classBind: [directionClass, prop_formClass as any],
            children: [prop_formComponents as any],
        });
    }


    /* ---------------------------------------------
       renderEmptyContent — fallback خالی
    --------------------------------------------- */
    public renderEmptyContent(
        attrsDefault?: PartAttrDefault,
    ): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
        });
    }

}
