import * as Observable              from "@/core_observable";
///------------------------------
import {ITemplate as Template}      from "../interfaces/ITemplate";

export type TRouteData =  {template:new () => Template ,data?:any , headerTitle: Observable.App<string>};
