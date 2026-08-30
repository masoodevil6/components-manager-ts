
import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons from "@/ui_icons"
import * as UiCategories from "@/ui_categories";
///------------------------------
import './icons.css';
import {Destination} from "../../../module_categories/lists/icons/users/account";


export class ClIconPage implements ITemplate {

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement {

        console.log()


        const container = CoreReactive.App.div({
            className: [
                "row"
            ] ,
            children:[


                /// Status
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Status.Boolean.IsTrue() ,
                                        UiCategories.Icons.Status.Boolean.IsFalse()
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
                                        UiCategories.Icons.Status.Visit.On() ,
                                        UiCategories.Icons.Status.Visit.Off() ,
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
                                        UiCategories.Icons.Status.Light.On() ,
                                        UiCategories.Icons.Status.Light.Off() ,
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
                                        UiCategories.Icons.Status.Pin.Open() ,
                                        UiCategories.Icons.Status.Pin.Close() ,
                                        UiCategories.Icons.Status.Pin.Open2() ,
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
                                        UiCategories.Icons.Status.Resize.WindowResizeMax() ,
                                        UiCategories.Icons.Status.Resize.WindowResizeMin() ,
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
                                        UiCategories.Icons.Status.Locked.Close() ,
                                        UiCategories.Icons.Status.Locked.Open() ,
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),



                /// Arrows
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Symbols.Arrows.Basic.Up() ,
                                        UiCategories.Icons.Symbols.Arrows.Basic.Right() ,
                                        UiCategories.Icons.Symbols.Arrows.Basic.Down() ,
                                        UiCategories.Icons.Symbols.Arrows.Basic.Left() ,
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
                                        UiCategories.Icons.Symbols.Arrows.Chevron.Up() ,
                                        UiCategories.Icons.Symbols.Arrows.Chevron.Right() ,
                                        UiCategories.Icons.Symbols.Arrows.Chevron.Down() ,
                                        UiCategories.Icons.Symbols.Arrows.Chevron.Left() ,
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
                                        UiCategories.Icons.Symbols.Arrows.Double.Up() ,
                                        UiCategories.Icons.Symbols.Arrows.Double.Right() ,
                                        UiCategories.Icons.Symbols.Arrows.Double.Down() ,
                                        UiCategories.Icons.Symbols.Arrows.Double.Left() ,
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),



                /// Symbols -> Exclamation
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Symbols.Exclamation.Square() ,
                                        UiCategories.Icons.Symbols.Exclamation.Warning() ,
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),



                /// Calc
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Calc.Symbol.Plus() ,
                                        UiCategories.Icons.Calc.Symbol.Minus() ,
                                        UiCategories.Icons.Calc.Symbol.Cross() ,
                                        UiCategories.Icons.Calc.Symbol.Divide() ,
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),



                /// Inputs
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Inputs.Time.Clock() ,
                                        UiCategories.Icons.Inputs.Time.Calender() ,
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
                                        UiCategories.Icons.Inputs.Qr.QrCode() ,
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
                                        UiCategories.Icons.Inputs.Tools.ClearBroom() ,
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
                                        UiCategories.Icons.Inputs.Select.Column() ,
                                        UiCategories.Icons.Inputs.Select.Option() ,
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
                                        UiCategories.Icons.Inputs.Text.Title() ,
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
                                        UiCategories.Icons.Inputs.Number.Number() ,
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),




                /// Files
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Files.Toolbars.Zoom.Zoom() ,
                                        UiCategories.Icons.Files.Toolbars.Zoom.ZoomIn() ,
                                        UiCategories.Icons.Files.Toolbars.Zoom.ZoomOut() ,
                                        UiCategories.Icons.Files.Toolbars.Zoom.ZoomRefresh() ,
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
                                        UiCategories.Icons.Files.Toolbars.Export.Print() ,
                                        UiCategories.Icons.Files.Toolbars.Export.Excel() ,
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
                                        UiCategories.Icons.Files.Toolbars.Pin.Open() ,
                                        UiCategories.Icons.Files.Toolbars.Pin.Close() ,
                                        UiCategories.Icons.Files.Toolbars.Pin.Open2() ,
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
                                        UiCategories.Icons.Files.Toolbars.Window.Close() ,
                                        UiCategories.Icons.Files.Toolbars.Window.ResizeMax() ,
                                        UiCategories.Icons.Files.Toolbars.Window.ResizeMin() ,
                                        UiCategories.Icons.Files.Toolbars.Window.Minimize() ,
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
                                        UiCategories.Icons.Files.Toolbars.Header.Menu() ,
                                        UiCategories.Icons.Files.Toolbars.Header.Setting() ,
                                        UiCategories.Icons.Files.Toolbars.Header.Search() ,
                                        UiCategories.Icons.Files.Toolbars.Header.Filter() ,
                                        UiCategories.Icons.Files.Toolbars.Header.Reload() ,
                                        UiCategories.Icons.Files.Toolbars.Header.Empty() ,
                                        UiCategories.Icons.Files.Toolbars.Header.ClearBroom() ,
                                        UiCategories.Icons.Files.Toolbars.Header.Title() ,
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
                                        UiCategories.Icons.Files.Actions.Edit() ,
                                        UiCategories.Icons.Files.Actions.Delete() ,
                                        UiCategories.Icons.Files.Actions.Attachment() ,
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
                                        UiCategories.Icons.Files.Logo.Application() ,
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
                                        UiCategories.Icons.Files.Category.Category() ,
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
                                        UiCategories.Icons.Files.Type.Type() ,
                                        UiCategories.Icons.Files.Type.TypeNote() ,
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
                                        UiCategories.Icons.Files.Tag.Tage() ,
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
                                        UiCategories.Icons.Files.Status.Complete() ,
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),



                /// Loadings
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Loadings.Circle.Simple() ,
                                        UiCategories.Icons.Loadings.Circle.Orbit() ,
                                        UiCategories.Icons.Loadings.Circle.Pulse() ,
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
                                        UiCategories.Icons.Loadings.Horizontal.Dots() ,
                                        UiCategories.Icons.Loadings.Horizontal.Bars()
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
                                        UiCategories.Icons.Loadings.Vertical.Dots() ,
                                        UiCategories.Icons.Loadings.Vertical.Bars()
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),



                /// Loadings
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Payments.Types.Cash() ,
                                        UiCategories.Icons.Payments.Types.Rial() ,
                                        UiCategories.Icons.Payments.Types.Tether() ,
                                        UiCategories.Icons.Payments.Types.Derham() ,
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
                                        UiCategories.Icons.Payments.Actions.Deposit() ,
                                        UiCategories.Icons.Payments.Actions.Transaction() ,
                                        UiCategories.Icons.Payments.Actions.Withdrawal() ,
                                        UiCategories.Icons.Payments.Actions.WalletAdd() ,
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
                                        UiCategories.Icons.Payments.Cash.Amount() ,
                                        UiCategories.Icons.Payments.Cash.CashCurrency() ,
                                        UiCategories.Icons.Payments.Cash.CoinCurrency() ,
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
                                        UiCategories.Icons.Payments.Leverage.Leverage() ,
                                        UiCategories.Icons.Payments.Leverage.Leverage2() ,
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
                                        UiCategories.Icons.Payments.Input.Wallet1() ,
                                        UiCategories.Icons.Payments.Input.Wallet2() ,
                                        UiCategories.Icons.Payments.Input.CardNumber() ,
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
                                        UiCategories.Icons.Payments.Rate.Simple() ,
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),



                /// Users
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Users.Account.Simple() ,
                                        UiCategories.Icons.Users.Account.Add() ,
                                        UiCategories.Icons.Users.Account.GroupAdd() ,
                                        UiCategories.Icons.Users.Account.Reference() ,
                                        UiCategories.Icons.Users.Account.Destination() ,
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
                                        UiCategories.Icons.Users.Emails.Email1() ,
                                        UiCategories.Icons.Users.Emails.Email2() ,
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
                                        UiCategories.Icons.Users.Phone.Phone() ,
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
                                        UiCategories.Icons.Users.Password.Password() ,
                                        UiCategories.Icons.Users.Password.ChangePassword() ,
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),




                /// WebCodes
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
                                                UiCategories.Icons.WebCode.Series100.WebCode100( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series100.WebCode101( {size: 100} ) ,
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
                                                UiCategories.Icons.WebCode.Series200.WebCode200( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series200.WebCode201( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series200.WebCode204( {size: 100} ) ,
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
                                                UiCategories.Icons.WebCode.Series300.WebCode301( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series300.WebCode304( {size: 100} ) ,
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
                                                UiCategories.Icons.WebCode.Series400.WebCode401( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series400.WebCode403( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series400.WebCode404( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series400.WebCode405( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series400.WebCode408( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series400.WebCode410( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series400.WebCode429( {size: 100} ) ,
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
                                                UiCategories.Icons.WebCode.Series500.WebCode500( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series500.WebCode502( {size: 100} ) ,
                                            ]
                                        }),
                                        CoreReactive.App.div({
                                            className:["border" , "float-start"] ,
                                            children:[
                                                UiCategories.Icons.WebCode.Series500.WebCode504( {size: 100} ) ,
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