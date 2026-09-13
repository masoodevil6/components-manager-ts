import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Props اختصاصی ComponentRecyclerView (Plan 15.1.0 — بازیابی ۴ prop Legacy)
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * تغییرات نسبت به Legacy:
 *   - prop_formComponents نوع: CoreReactive.App[] | CoreReactive.App (ReactiveElement → CoreReactive.App)
 *   - prop_formDirection نوع: DirectionType (enum string literal)
 */
export type DirectionType =
    | "vertical"
    | "vertical_reverse"
    | "horizontal"
    | "horizontal_reverse";


export const Props = {

    prop_formClass: Define_ComponentProp<string[]>({
        prop:         "prop_formClass",
        default:      [],
        name:         Keys.category.components.recyclerView.props.formClass.name,
        description:  Keys.category.components.recyclerView.props.formClass.description,
    }),

    prop_formStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_formStyles",
        default:      {},
        name:         Keys.category.components.recyclerView.props.formStyles.name,
        description:  Keys.category.components.recyclerView.props.formStyles.description,
    }),

    prop_formDirection: Define_ComponentProp<DirectionType>({
        prop:         "prop_formDirection",
        default:      "vertical",
        name:         Keys.category.components.recyclerView.props.formDirection.name,
        description:  Keys.category.components.recyclerView.props.formDirection.description,
    }),

    prop_formComponents: Define_ComponentProp<any[]>({
        prop:         "prop_formComponents",
        default:      [],
        name:         Keys.category.components.recyclerView.props.formComponents.name,
        description:  Keys.category.components.recyclerView.props.formComponents.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentRecyclerView — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
