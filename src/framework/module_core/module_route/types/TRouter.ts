import * as Observable from "@/core_observable";
import * as CoreRoute from "@/core_route"

//export type TRoute =  Record<string,{template:new () => CoreRoute.Interfaces.Template ,data?:any , headerTitle: Observable.Class.Observable<string>}>;
export type TRouteData =  {template:new () => CoreRoute.Interfaces.Template ,data?:any , headerTitle: Observable.Class.Observable<string>};
