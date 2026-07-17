import {ReactiveElement} from "../ReactiveElement";

export type ComponentAttrsDefault = { "data-part-name" : string  , id: string}

export abstract class ConnectorComponent {

    renderManagerComponent(partName: string, attrsDefault: ComponentAttrsDefault, data: any, extra: any): ReactiveElement{
        throw new Error("not override method Manager Component")
    }

    renderContentComponent() {
        return ReactiveElement.section({
            children: [
                `<div class="not-exist-body"> NOT EXIST CONTENT</div>`
            ]
        });
    }

    static renderExampleComponent(extraData: any):  HTMLElement {
        return ReactiveElement.section({
            children: [
                `<div class="not-exist-example"> NOT EXIST REGISTER</div>`
            ]
        }).getElement();
    }

}
