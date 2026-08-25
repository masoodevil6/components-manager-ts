import * as Core                                     from "@/core"
///------------------------------
import {TConfigStateDefinition as ConfigStateDefinition}     from "../type/TConfigStateDefinition";


export const StateConfigLanguage : ConfigStateDefinition<Core.Language.Types.LanguageDefinition> = {
    name: "language" ,
    default: Core.Language.Definition.En,
}