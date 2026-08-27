import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons from "@/ui_icons"
///------------------------------
import './icons.css';


export class ClIconPage implements ITemplate {

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement {

        const container = CoreReactive.App.div({
            className: [
                "page home"
            ] ,
            children:[

                CoreReactive.App.div({
                    className:["border"] ,
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.Zoom.Definition  ),
                        UiIcons.CreateIcon(UiIcons.Src.ZoomIn.Definition  ),
                        UiIcons.CreateIcon(UiIcons.Src.ZoomOut.Definition  ),
                        UiIcons.CreateIcon(UiIcons.Src.ZoomRefresh.Definition   ),
                    ]
                }),
                CoreReactive.App.div({
                    className:["border"] ,
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.LightSun.Definition  ),
                        UiIcons.CreateIcon(UiIcons.Src.LightMoon.Definition  ),
                    ]
                }),
                CoreReactive.App.div({
                    className:["border"] ,
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.StatusIsTrue.Definition  ),
                        UiIcons.CreateIcon(UiIcons.Src.StatusIsFalse.Definition  ),
                    ]
                }),
                CoreReactive.App.div({
                    className:["border"] ,
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.CalcPlus.Definition   ),
                        UiIcons.CreateIcon(UiIcons.Src.CalcMinus.Definition  ),
                        UiIcons.CreateIcon(UiIcons.Src.CalcCross.Definition   ),
                        UiIcons.CreateIcon(UiIcons.Src.CalcDivide.Definition  ),
                    ]
                }),
                CoreReactive.App.div({
                    className:["border"] ,
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.TimeClock.Definition  ),
                        UiIcons.CreateIcon(UiIcons.Src.TimeCalender.Definition  ),
                    ]
                }),
                CoreReactive.App.div({
                    className:["border"] ,
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.ArrowChevronUp.Definition   ),
                        UiIcons.CreateIcon(UiIcons.Src.ArrowChevronRight.Definition   ),
                        UiIcons.CreateIcon(UiIcons.Src.ArrowChevronDown.Definition   ),
                        UiIcons.CreateIcon(UiIcons.Src.ArrowChevronLeft.Definition   ),
                    ]
                }),
                CoreReactive.App.div({
                    className:["border"] ,
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.ArrowUp.Definition     ),
                        UiIcons.CreateIcon(UiIcons.Src.ArrowRight.Definition   ),
                        UiIcons.CreateIcon(UiIcons.Src.ArrowDown.Definition   ),
                        UiIcons.CreateIcon(UiIcons.Src.ArrowLeft.Definition   ),
                    ]
                }),
                CoreReactive.App.div({
                    className:["border"] ,
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.ArrowDoubleUp.Definition  ),
                        UiIcons.CreateIcon(UiIcons.Src.ArrowDoubleRight.Definition  ),
                        UiIcons.CreateIcon(UiIcons.Src.ArrowDoubleDown.Definition   ),
                        UiIcons.CreateIcon(UiIcons.Src.ArrowDoubleLeft.Definition   ),
                    ]
                }),
                CoreReactive.App.div({
                    children:[

                    ]
                })


            ]
        }).getElement()

        return container

        // const container = document.createElement("div")
        //
        // Object.keys(TOOLS.ICON).forEach(key=>{
        //     let iconSvg = TOOLS.ICON[key as keyof typeof TOOLS.ICON]({
        //         size : 100
        //     })
        //
        //     const itemHeaderMethod = document.createElement("b")
        //     itemHeaderMethod.className = "item-icon-method-name";
        //     itemHeaderMethod.textContent = key
        //
        //     const itemHeader = document.createElement("span")
        //     itemHeader.className = "bg-dark text-white d-block text-center";
        //     itemHeader.textContent = "TOOLS.ICON."
        //     itemHeader.appendChild(itemHeaderMethod)
        //
        //     const item = document.createElement("div")
        //     item.className = "item-icon-form-method-name item-icon border  float-end";
        //     item.appendChild(itemHeader)
        //     item.innerHTML += iconSvg
        //
        //     container.appendChild(item)
        // })
        //
        // return container
    }

    onLoad(pageElement: HTMLElement): void {
    }

}