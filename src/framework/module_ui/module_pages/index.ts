
export { Home, Tests, Icon, Workflow, Components } from "./pages";
export * as V2 from "./v2";

export {
    CtPageMaps as PageMap
} from "./consts/CtPageMaps";
export {
    CtPageMaps as LegacyPageMap,
} from "./consts/CtPageMaps";
export {CtControllerPageMaps as ControllerPageMap} from "./consts/CtControllerPageMaps";
export {CtApplicationPageMaps as ApplicationPageMap} from "./consts/CtApplicationPageMaps";
export {PageManager, STANDARD_PAGE_LAYOUT} from "./registry/PageManager";
export type {
    ConsumerPageContext,
    ConsumerPageControllerBinding,
    ConsumerPageControllerParams,
    ConsumerPageControllers,
    ConsumerPageDefinition,
    ConsumerPageGuardResult,
    ConsumerPageLayoutDefinition,
    ConsumerPageLayoutInstance,
    ConsumerPageLayoutRenderer,
    ConsumerPageRegistryEntry,
    ConsumerPageRouteMap,
    ConsumerPageSlotSource,
    ConsumerPageSlots,
} from "./registry/Types";
