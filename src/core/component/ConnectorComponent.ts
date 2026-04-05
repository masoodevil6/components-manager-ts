import {ReactiveElement} from "../ReactiveElement";


export abstract class ConnectorComponent {

    //--------------------------------------------------
    // Template Reader
    //--------------------------------------------------

    renderManagerComponent(partName , data , extra): ReactiveElement{
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
    static renderExampleComponent():  HTMLElement {
        return ReactiveElement.section({
            children: [
                `<div class="not-exist-example"> NOT EXIST REGISTER</div>`
            ]
        }).getElement();
    }

}