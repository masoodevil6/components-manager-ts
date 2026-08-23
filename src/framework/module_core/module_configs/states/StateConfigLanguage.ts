import * as CoreLanguage                                     from "@/core_languages"
///------------------------------
import {TConfigStateDefinition as ConfigStateDefinition}     from "../type/TConfigStateDefinition";


export const StateConfigLanguage : ConfigStateDefinition<CoreLanguage.TLanguagesDefinition> = {
    name: "language" ,
    default: CoreLanguage.DefinitionFa,
}