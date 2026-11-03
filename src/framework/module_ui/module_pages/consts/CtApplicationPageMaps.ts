import type {TRouter} from "@/core_route";
import {CtPageMaps} from "./CtPageMaps";
import {CtControllerPageMaps} from "./CtControllerPageMaps";

/** Legacy template routes remain available; controller routes take precedence for matching paths. */
export const CtApplicationPageMaps: TRouter = {
    ...CtPageMaps,
    ...CtControllerPageMaps,
};
