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
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.Zoom.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                        UiIcons.CreateIcon(UiIcons.Src.ZoomIn.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                        UiIcons.CreateIcon(UiIcons.Src.ZoomOut.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                        UiIcons.CreateIcon(UiIcons.Src.ZoomRefresh.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                    ]
                }),
                CoreReactive.App.div({
                    children:[

                        UiIcons.CreateIcon(UiIcons.Src.LightSun.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),

                        UiIcons.CreateIcon(UiIcons.Src.LightMoon.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                    ]
                }),
                CoreReactive.App.div({
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.StatusIsTrue.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                        UiIcons.CreateIcon(UiIcons.Src.StatusIsFalse.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                    ]
                }),
                CoreReactive.App.div({
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.CalcPlus.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                        UiIcons.CreateIcon(UiIcons.Src.CalcMinus.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                        UiIcons.CreateIcon(UiIcons.Src.CalcCross.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                        UiIcons.CreateIcon(UiIcons.Src.CalcDivide.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                    ]
                }),
                CoreReactive.App.div({
                    children:[
                        UiIcons.CreateIcon(UiIcons.Src.TimeClock.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
                        UiIcons.CreateIcon(UiIcons.Src.TimeCalender.Definition ,
                            {
                                size : 100 ,
                                // strokeWidth: 1 ,
                                // primaryColor: "red" ,
                            }
                        ),
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