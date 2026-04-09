import {ITemplate} from "../../interfaces/ITemplate";
import {TOOLS} from "../../../tools/tools";
import {AppConfig} from "../../../core/AppConfig";
import {Observable} from "../../../core/Observable";
import {ReactiveElement} from "../../../core/ReactiveElement";
import {Language} from "../../../core/Language";
import {Color, COLORS_GRAD, COLORS_MAIN, SIZES, SizeUnit, UNITS} from "../../../utils/ToolsConsts";


export class TestsPage implements ITemplate{

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement {

        /*const rtl = AppConfig.observable("directionRtl")

        const primary = AppConfig.color.get("primary")

        const isActive = new Observable(false);
        const status = new Observable("error");

        const colorObs = new  Observable("red");

        const el= ReactiveElement.section({
            styles: {
                //backgroundColor: "red" ,
                cursor: "pointer" ,
                //color: "var(--primary)"
            } ,
            stylesBind: el => ({
                //color: colorObs ,
                direction: rtl.mapBoolean("rtl" , "ltr") ,
                color: el.active.mapBoolean("var(--shanColor3)", "var(--successColor2)")
            }) ,
            className: [
                "rounded" , "shadow-sm" , "p-2" , "btn"
            ] ,
            classBind:[
                isActive.mapBoolean("active" , "di-active") ,

                status.mapList({
                    error: "btn-danger" ,
                    success: "btn-success" ,
                    warning: "btn-warning" ,
                })
            ] ,
            children: [
                /!* (() => {
                     const style = document.createElement("style");
                     style.textContent = `
                     #test {
                         color: red;
                     } `;
                     return style;
                 })(),*!/
                Language.translate("test.login", { name:"Ali" })
            ],
            on:{
                click: (event) => {
                    console.log(event)
                },
            }
        })

        colorObs.set("white" )
        isActive.set(true )
        status.set("success" )

        //

        AppConfig.color.set("primary" , "#fff")
        Language.setLanguage("en")

        return el.getElement()*/


        const content = ReactiveElement.section(
            {
                className: [
                    "row" , "p-0" , "m-0"
                ],
                children:[
                    ReactiveElement.section({
                        className: [
                            "col-md-3" , "col-12" , "border" , "p-2" ,
                        ],
                        children: [
                            ReactiveElement.section({
                                attrs: {
                                    id: "test-element"
                                },
                                className: [
                                    "position-relative"
                                ],
                                children: [
                                    "main"
                                ],
                            }) ,
                        ],
                    }) ,


                    TOOLS.COMPONENT.ComponentMessages.renderExampleComponent() ,
                    TOOLS.COMPONENT.ComponentErrorIsEmpty.renderExampleComponent() ,

                    TOOLS.COMPONENT.ComponentLabel.renderExampleComponent() ,
                    TOOLS.COMPONENT.ComponentButton.renderExampleComponent() ,

                    TOOLS.COMPONENT.ComponentIcon.renderExampleComponent() ,

                    TOOLS.COMPONENT.ComponentBorder.renderExampleComponent() ,

                    TOOLS.COMPONENT.ComponentRecyclerView.renderExampleComponent() ,

                    TOOLS.COMPONENT.ComponentFloatMenu.renderExampleComponent() ,

                    TOOLS.COMPONENT.ComponentTooltipDescription.renderExampleComponent() ,
                ]
            })



        return content.getElement();
    }



    onLoad(pageElement: HTMLElement): void {

         TOOLS.COMPONENT.ComponentSelector.renderExampleComponent({selector: "#test-element"})
         TOOLS.COMPONENT.ComponentSelector.renderExampleComponent({selector: "component-error-is-empty section[data-part-name=part_border_content_title]"})

    }









}

///Set-ExecutionPolicy RemoteSigned