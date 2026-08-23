import * as Class from "./class";
import * as States from "./states";

// Config
//     .App(Config.State.Language)
//     .set(language.code);

export {ConfigApp as App} from "./class";
export * as States from "./states";

export const Settings = {
    DirectionRtl :   Class.ConfigApp.state(States.DirectionRtl) ,
    Language :       Class.ConfigApp.state(States.Language) ,
    SizeName :       Class.ConfigApp.state(States.SizeName) ,
    FontName :       Class.ConfigApp.state(States.FontName) ,
};