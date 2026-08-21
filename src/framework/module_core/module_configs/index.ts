import * as Class from "./class";
import * as States from "./states";

export * as Class from "./class";
export * as States from "./states";
export * as Type from "./type";
export * as Interface from "./interface";

export const Configs = {
    DirectionRtl :   Class.ConfigApp.state(States.DirectionRtl) ,
    Language :       Class.ConfigApp.state(States.Language) ,
    SizeName :       Class.ConfigApp.state(States.SizeName) ,
    FontName :       Class.ConfigApp.state(States.FontName) ,
};