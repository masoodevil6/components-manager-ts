import {ReactiveElement} from "../ReactiveElement";


export type ComponentAttrsDefault = { "data-part-name" : string  , id: string}

export abstract class ConnectorComponent {

    //--------------------------------------------------
    // Template Reader
    //--------------------------------------------------

    renderManagerComponent(partName , attrsDefault : ComponentAttrsDefault , data , extra): ReactiveElement{
        throw new Error("not override method Manager Component")
    }

    renderContentComponent() {
        return ReactiveElement.section({
            children: [
                `<div class="not-exist-body"> NOT EXIST CONTENT</div>`
            ]
        });
    }


    //--------------------------------------------------
    // render example
    //--------------------------------------------------
    static renderExampleComponent(extraData):  HTMLElement {
        return ReactiveElement.section({
            children: [
                `<div class="not-exist-example"> NOT EXIST REGISTER</div>`
            ]
        }).getElement();
    }

}