import * as CoreComponent from "@/core_components"
import * as CoreReactive from "@/core_reactive"


export abstract class AbComponentConnector {

    renderManagerComponent(partName: string, attrsDefault:  CoreComponent.Basic.Types.PartAttrDefault, data: any, extra: any): CoreReactive.ReactiveElement{
        throw new Error("not override method Manager Component")
    }

    renderContentComponent() {
        return CoreReactive.ReactiveElement.section({
            children: [
                `<div class="not-exist-body"> NOT EXIST CONTENT</div>`
            ]
        });
    }

    static renderExampleComponent(extraData: any):  HTMLElement {
        return CoreReactive.ReactiveElement.section({
            children: [
                `<div class="not-exist-example"> NOT EXIST REGISTER</div>`
            ]
        }).getElement();
    }

}
