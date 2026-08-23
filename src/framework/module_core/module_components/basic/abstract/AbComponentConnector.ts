import * as CoreReactive     from "@/core_reactive";
// --------------------------------
import {TPartAttrDefault}    from "../types/TPartAttrDefault"

export abstract class AbComponentConnector {

    renderManagerComponent(partName: string, attrsDefault:  TPartAttrDefault, data: any, extra: any): CoreReactive.App{
        throw new Error("not override method Manager Component")
    }

    renderContentComponent() {
        return CoreReactive.App.section({
            children: [
                `<div class="not-exist-body"> NOT EXIST CONTENT</div>`
            ]
        });
    }

    static renderExampleComponent(extraData: any):  HTMLElement {
        return CoreReactive.App.section({
            children: [
                `<div class="not-exist-example"> NOT EXIST REGISTER</div>`
            ]
        }).getElement();
    }

}
