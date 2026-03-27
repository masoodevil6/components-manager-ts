import {ITemplate} from "../../interfaces/ITemplate";
import {TOOLS} from "../../../tools/tools";
import {AppConfig} from "../../../core/AppConfig";
import {Observable} from "../../../core/Observable";
import {ReactiveElement} from "../../../core/ReactiveElement";
import {Language} from "../../../core/Language";
import {Color, COLORS_GRAD, COLORS_MAIN, SIZES} from "../../../utils/ToolsConsts";
import {
    ComponentRecyclerViewMethodsType,
    ComponentRecyclerViewPropsType,
} from "../../../tools/components/ComponentRecyclerView";
import {
    ComponentMessageMethodsType,
    ComponentMessagesPropsType,
    ComponentMessages, ComponentMessages_Methods_CLOSE_MESSAGE_ComponentArgs, ComponentMessages_Methods_CLOSE_MESSAGE_DataArgs
} from "../../../tools/components/ComponentMessages";
import {
    ComponentIcon_Methods_CLICK_ComponentArgs,
    ComponentIcon_Methods_HOVER_DataArgs,
    ComponentIconMethodsType, ComponentIconProps,
    ComponentIconPropsType
} from "../../../tools/components/ComponentIcon";
import {
    ComponentButton, ComponentButton_Methods_CLICK_ComponentArgs, ComponentButton_Methods_CLICK_DataArgs,
    ComponentButtonMethodsType,
    ComponentButtonPropsType
} from "../../../tools/components/ComponentButton";
import {
    ComponentBorder_Methods_CLICK_BORDER_ComponentArgs, ComponentBorder_Methods_CLICK_BORDER_DataArgs,
    ComponentBorderMethodsType,
    ComponentBorderPropsType
} from "../../../tools/components/ComponentBorder";
import {ComponentFloatMenuMethodsType, ComponentFloatMenuPropsType} from "../../../tools/components/ComponentFloatMenu";


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

                    this.#_renderComponentMessages() ,
                    this.#_renderComponentButton() ,

                    this.#_renderComponentIcon() ,
                    this.#_renderComponentBorder() ,

                    this.#_renderComponentRecyclerView() ,
                    this.#_renderComponentFloatMenu() ,
                ]
            })



        return content.getElement();
    }



    #_renderComponentMessages(){

        return new TOOLS.COMPONENT.ComponentMessages(
            <ComponentMessagesPropsType> {
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {
                    color: "red"
                }  ,
                prop_show : true ,
                prop_type: "warning",
                prop_messages: ["error1" , "error2" , "error3"] ,
            } ,
            <ComponentMessageMethodsType>{
                fn_onCloseMessage: (event, dataArgs: ComponentMessages_Methods_CLOSE_MESSAGE_DataArgs, componentArgs: ComponentMessages_Methods_CLOSE_MESSAGE_ComponentArgs) => {
                    console.log(event , dataArgs.index , dataArgs.message , dataArgs.type)
                }
            }
        ).getSchema();
    }



    #_renderComponentButton(){
        return new TOOLS.COMPONENT.ComponentButton(
            <ComponentButtonPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                prop_title: "asd" ,
                prop_type: "submit" ,
            } ,
            <ComponentButtonMethodsType>{
                fn_onClickButton: function (event, dataArgs : ComponentButton_Methods_CLICK_DataArgs, componentArgs: ComponentButton_Methods_CLICK_ComponentArgs) {
                    alert("asd");
                }
            }
        ).getSchema();
    }



    #_renderComponentRecyclerView(){

        return new TOOLS.COMPONENT.ComponentRecyclerView(
            <ComponentRecyclerViewPropsType>{

                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                // styles: {} ,
                // prop_show: 0 ,

                prop_formClass: ["aaa"],
                prop_formStyles: {},
                prop_formDirection: "horizontal" ,
                prop_formComponents: [
                    ReactiveElement.section({
                        className:[
                            "border-end" , "border-dark" , "px-2"
                        ] ,
                        children: [
                            "item1"
                        ]
                    }) ,
                    ReactiveElement.section({
                        className:[
                            "border-end" , "border-dark" , "px-2"
                        ] ,
                        children: [
                            "item2"
                        ]
                    })
                ]
            } ,
            <ComponentRecyclerViewMethodsType>{

            }
        ).getSchema();
    }


    #_renderComponentFloatMenu(){
        return new TOOLS.COMPONENT.ComponentFloatMenu(
            <ComponentFloatMenuPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                prop_selectorContent: "selector" ,
                prop_floatContent: "content" ,
                prop_selectorShowType: "hover" ,
                prop_floatDirectionType: "bottom" ,
                prop_floatArrowWidth: 10 ,
                prop_floatMinWidth: 200 ,
            } ,
            <ComponentFloatMenuMethodsType>{

            }
        ).getSchema();
    }



    #_renderComponentIcon(){
        return new TOOLS.COMPONENT.ComponentIcon(
            <ComponentIconPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {
                    color: "red"
                }  ,

                prop_show :   true ,
                prop_icon:    TOOLS.ICON.icon_application({size: 80 }) ,

            } ,
            <ComponentIconMethodsType>{
                fn_onClickIcon: function (event, dataArgs:ComponentIcon_Methods_HOVER_DataArgs, componentArgs : ComponentIcon_Methods_CLICK_ComponentArgs){
                    this.set(ComponentIconProps.prop_icon ,  TOOLS.ICON.icon_qrcode({size: 80}) )
                    console.log(event , dataArgs , componentArgs)
                } ,
            }
        ).getSchema();
    }

    #_renderComponentBorder(){
        return new TOOLS.COMPONENT.ComponentBorder(
            <ComponentBorderPropsType>{
                classList: ["col-md-3" , "col-12" , "border" , "p-2"]  ,
                styles: {}  ,

                prop_show :               true ,
                prop_content:             "content test" ,
                prop_borderArrowType:     "bottom" ,
                prop_borderArrowPosition: 50 ,
                prop_borderArrowWidth:    10 ,
               //prop_borderWidth:        SIZES.XXL ,
                prop_borderColor:         Color(COLORS_MAIN.WARNING , COLORS_GRAD.GRADE_1) ,
            },
            <ComponentBorderMethodsType>{
                fn_onClickBorder: function (event, dataArgs:ComponentBorder_Methods_CLICK_BORDER_DataArgs, componentArgs:ComponentBorder_Methods_CLICK_BORDER_ComponentArgs) {
                    console.log(event)
                }
            }
        ).getSchema();
    }

}

///Set-ExecutionPolicy RemoteSigned