import * as Observable from "@/core_observable";
import * as CoreRoute from "@/core_route"

export type TRouteData =  {template:new () => CoreRoute.Interfaces.Template ,data?:any , headerTitle: Observable.Class.Observable<string>};
