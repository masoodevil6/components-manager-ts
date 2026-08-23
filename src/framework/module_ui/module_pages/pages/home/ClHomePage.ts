import { ITemplate } from "@/core_route";
import * as CoreLanguage from "@/core_languages";
import * as CoreConfig from "@/core_configs";
import * as CoreReactive from "@/core_reactive";
///------------------------------

export class ClHomePage implements ITemplate {

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement {

        const container = CoreReactive.App.div({
            className: [
                "page home"
            ] ,
            children:[
                CoreLanguage.App.translate("welcome")
            ]
        }).getElement()

        // const container = document.createElement("div")
        // container.className = "page home"
        // //container.textContent = query?.message ??  "خوش آمدید!"
        // container.textContent = query?.message ??  CoreLanguage.App.translate("welcome").get()

        //CoreConfig.App.state(CoreConfig.States.Language).set(CoreLanguage.DefinitionEn)

        return container
    }

    onLoad(pageElement: HTMLElement): void {
    }

}