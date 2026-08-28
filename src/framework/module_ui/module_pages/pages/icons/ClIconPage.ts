import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons from "@/ui_icons"
///------------------------------
import './icons.css';


export class ClIconPage implements ITemplate {

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement {

        const container = CoreReactive.App.div({
            className: [
                "row"
            ] ,
            children:[


                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.StatusIsTrue.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.StatusIsFalse.Definition  ),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.StatusVisit.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.StatusUnVisit.Definition  ),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.StatusMoon.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.StatusSun.Definition  ),
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),





                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[

                                        UiIcons.CreateIcon(UiIcons.Src.ArrowUp.Definition     ),
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowRight.Definition   ),
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowDown.Definition   ),
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowLeft.Definition   ),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowChevronUp.Definition   ),
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowChevronRight.Definition   ),
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowChevronDown.Definition   ),
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowChevronLeft.Definition   ),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowDoubleUp.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowDoubleRight.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowDoubleDown.Definition   ),
                                        UiIcons.CreateIcon(UiIcons.Src.ArrowDoubleLeft.Definition   ),
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),







                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.CalcPlus.Definition   ),
                                        UiIcons.CreateIcon(UiIcons.Src.CalcMinus.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.CalcCross.Definition   ),
                                        UiIcons.CreateIcon(UiIcons.Src.CalcDivide.Definition  ),
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),





                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.InputClock.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.InputCalender.Definition  ),
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),







                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.FilesZoom.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.FilesZoomIn.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.FilesZoomOut.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.FilesZoomRefresh.Definition   ),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.FilesPrint.Definition   ),
                                        UiIcons.CreateIcon(UiIcons.Src.FilesExcel.Definition    ),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.FilesEdit.Definition ),
                                        UiIcons.CreateIcon(UiIcons.Src.FilesDelete.Definition ),
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),




                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiIcons.CreateIcon(UiIcons.Src.PaymentTether.Definition  ),
                                        UiIcons.CreateIcon(UiIcons.Src.PaymentCash.Definition ) ,
                                        UiIcons.CreateIcon(UiIcons.Src.PaymentRial.Definition ) ,
                                        UiIcons.CreateIcon(UiIcons.Src.PaymentDerham.Definition  ),
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),




                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode100.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode101.Definition , {size: 100}  ),
                                            ]
                                        }),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode200.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode201.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode204.Definition , {size: 100}  ),
                                            ]
                                        }),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode301.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode304.Definition , {size: 100}  ),
                                            ]
                                        }),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode401.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode403.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode404.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode405.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode408.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode410.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode429.Definition , {size: 100}  ),
                                            ]
                                        }),
                                    ]
                                }),
                            ]
                        }),
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode500.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode502.Definition , {size: 100}  ),
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiIcons.CreateIcon(UiIcons.Src.WebCode504.Definition , {size: 100}  ),
                                            ]
                                        }),
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),







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