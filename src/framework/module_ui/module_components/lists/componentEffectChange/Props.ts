import * as CoreComponents from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsConfigType, ExtractPropsType} from "../../tools/type/TypeHelpers";

export enum EffectChangeMode {
    NONE = "none",
    FADE = "fade",
    SLIDE = "slide",
    SCALE = "scale",
    LOADING = "loading",
}

export enum EffectChangeDirection {
    FORWARD = "forward",
    BACKWARD = "backward",
}

export interface EffectChangeComponentLike {
    getElement(): HTMLElement;
    getReactiveElement?(): CoreReactive.App;
    dispose?(): void;
    disposeStep?(): void;
}

// Core props can be supplied as observables. The component base binds those
// observables directly, so include them in the public config type as well.
export type EffectChangeContent = CoreReactive.App | Node | string | EffectChangeComponentLike | CoreObservable.App<any> | null;
type ObservableMode = EffectChangeMode | CoreObservable.App<EffectChangeMode>;
type ObservableDirection = EffectChangeDirection | CoreObservable.App<EffectChangeDirection>;

const labels = Keys.category.components.effectChange.props;

export const Props = {
    prop_content: Define_ComponentProp<EffectChangeContent>({
        prop: "prop_content",
        default: null,
        name: labels.content.name,
        description: labels.content.description,
    }),
    prop_mode: Define_ComponentProp<ObservableMode>({
        prop: "prop_mode",
        default: EffectChangeMode.FADE,
        name: labels.mode.name,
        description: labels.mode.description,
    }),
    prop_changeDirection: Define_ComponentProp<ObservableDirection>({
        prop: "prop_changeDirection",
        default: EffectChangeDirection.FORWARD,
        name: labels.changeDirection.name,
        description: labels.changeDirection.description,
    }),
    prop_duration: Define_ComponentProp<number>({
        prop: "prop_duration",
        default: 300,
        name: labels.duration.name,
        description: labels.duration.description,
    }),
    prop_easing: Define_ComponentProp<string>({
        prop: "prop_easing",
        default: "ease-in-out",
        name: labels.easing.name,
        description: labels.easing.description,
    }),
    prop_respectReducedMotion: Define_ComponentProp<boolean>({
        prop: "prop_respectReducedMotion",
        default: true,
        name: labels.respectReducedMotion.name,
        description: labels.respectReducedMotion.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
