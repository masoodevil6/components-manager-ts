import * as CoreReactive    from "@/core_reactive";
import * as CoreObservable  from "@/core_observable";
import * as CoreConfigs     from "@/core_configs";
import * as CoreComponents  from "@/core_components";
// --------------------------------


/**
 * ComponentTooltipTrait
 *
 * Shared Capability برای Componentهایی که tooltip (با ComponentTooltip) دارند.
 *
 * Trait سه چیز ارائه می‌دهد:
 *   1. renderTooltip — رندر wrapper <section> با anchor styles + Composition ComponentTooltip
 *   2. getTooltipAnchorStyles — استایل‌های positioning (position: absolute, full width/height)
 *   3. buildTooltip — ساخت ComponentTooltip با prop mapping و رندر شرطی
 *
 * قوانین (Plan 8.1.2):
 *   - Trait کلاس نیست
 *   - Trait State ندارد
 *   - Trait Event ندارد
 *   - Trait Lifecycle ندارد
 *   - Trait Registry ندارد
 *   - Trait از Public API استفاده می‌کند (getScope)
 *   - Silent Failure ممنوع — Missing required prop باید throw کند
 */
export const ComponentTooltipTrait = {

    /**
     * رندر کامل tooltip — wrapper <section> + anchor styles + ComponentTooltip composition
     *
     * @param component    — Component instance (this) — برای getScope
     * @param attrsDefault — attributeهای پیش‌فرض از executeSchemaPart
     * @param tooltipProps — ۶ observable prop (tooltip*)
     * @returns CoreReactive.App
     *
     * استفاده در renderManagerComponent:
     *   case Schemas.BORDER_CONTENT_TOOLTIP.part:
     *       return ComponentTooltipTrait.renderTooltip(this, attrsDefault, {
     *           tooltipIcon:          prop_labelTooltipIcon,
     *           tooltipDescription:   prop_labelTooltipDescription,
     *           tooltipBackground:    prop_labelTooltipBackground,
     *           tooltipColor:         prop_labelTooltipColor,
     *           tooltipIconPosition:  prop_labelTooltipPosition,
     *           tooltipDirection:    prop_labelTooltipDirection,
     *       });
     */
    renderTooltip(
        component:    CoreComponents.App<any, any, any, any>,
        attrsDefault: CoreComponents.PartAttrDefault,
        tooltipProps: {
            tooltipIcon:         CoreObservable.App<any>;
            tooltipDescription:  CoreObservable.App<any>;
            tooltipBackground:   CoreObservable.App<any>;
            tooltipColor:        CoreObservable.App<any>;
            tooltipIconPosition: CoreObservable.App<any>;
            tooltipDirection:    CoreObservable.App<any>;
        },
    ): CoreReactive.App {

        const anchorStyles = ComponentTooltipTrait.getTooltipAnchorStyles(component);

        const tooltip = ComponentTooltipTrait.buildTooltip(component, tooltipProps);

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            stylesBind: anchorStyles,
            children: [tooltip],
        });
    },


    /**
     * استایل‌های anchor — position: absolute با عرض و ارتفاع کامل parent
     * آیکون tooltip داخل ComponentTooltip با prop_tooltipIconPosition موقعیت‌گیری می‌کند
     */
    getTooltipAnchorStyles(
        component: CoreComponents.App<any, any, any, any>,
    ): CoreObservable.App<Record<string, string>> {
        return CoreObservable.App.computed(
            (_dirRtl: boolean) => ({
                position: "absolute",
                top:      "0",
                right:    "0",
                left:     "0",
                width:    "100%",
                height:   "100%",
            }),
            [CoreConfigs.Settings.DirectionRtl.observable()],
            component.getScope(),
        );
    },


    /**
     * ساخت ComponentTooltip با prop mapping و رندر شرطی
     * رندر شرطی: if (tooltipDescription == null) → null
     *
     * mapping propهای مصرف‌کننده → ComponentTooltip:
     *   tooltipIcon         → prop_tooltipIcon
     *   tooltipDescription  → prop_tooltipDescription
     *   tooltipBackground   → prop_tooltipBackground
     *   tooltipColor        → prop_tooltipColor
     *   tooltipIconPosition → prop_tooltipIconPosition
     *   tooltipDirection    → prop_tooltipDirection
     */
    buildTooltip(
        component:    CoreComponents.App<any, any, any, any>,
        tooltipProps: {
            tooltipIcon:         CoreObservable.App<any>;
            tooltipDescription:  CoreObservable.App<any>;
            tooltipBackground:   CoreObservable.App<any>;
            tooltipColor:        CoreObservable.App<any>;
            tooltipIconPosition: CoreObservable.App<any>;
            tooltipDirection:    CoreObservable.App<any>;
        },
    ): CoreObservable.App<any> {
        const workflowComposition = CoreComponents.Tools.Workflow.Capture_ComponentWorkflowComposition();
        const scope = component.getScope();
        let requestVersion = 0;
        let isDisposed = false;
        scope.track(() => {
            isDisposed = true;
            requestVersion += 1;
        });

        return CoreObservable.App.computed(
            (desc) => {
                const currentRequest = ++requestVersion;
                if (desc == null || desc === "") return null;

                const content = new CoreObservable.App<any>(null);
                const container = CoreReactive.App.section({children: [content]});
                void import("../../lists/componentTooltip/ComponentTooltip")
                    .then(({ComponentTooltip}) => {
                        if (isDisposed || currentRequest !== requestVersion) return;
                        const createTooltip = () => new ComponentTooltip(
                            {
                                styles: {height: "100%"},
                                prop_structureStyles: {height: "100%"},
                                prop_tooltipIcon: tooltipProps.tooltipIcon,
                                prop_tooltipDescription: tooltipProps.tooltipDescription,
                                prop_tooltipBackground: tooltipProps.tooltipBackground,
                                prop_tooltipColor: tooltipProps.tooltipColor,
                                prop_tooltipIconPosition: tooltipProps.tooltipIconPosition,
                                prop_tooltipDirection: tooltipProps.tooltipDirection,
                            } as any,
                            {},
                        ).getReactiveElement();
                        const tooltip = workflowComposition
                            ? CoreComponents.Tools.Workflow.With_ComponentWorkflowComposition(workflowComposition, createTooltip)
                            : createTooltip();
                        content.set(tooltip);
                    })
                    .catch((error) => {
                        if (!isDisposed && currentRequest === requestVersion) {
                            console.error("ComponentTooltipTrait could not load tooltip support", error);
                        }
                    });

                return container;
            },
            [tooltipProps.tooltipDescription],
            scope,
        );
    },

};
