
import {ITemplate} from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons from "@/ui_icons"
import * as UiCategories from "@/ui_categories";
///------------------------------
import './icons.css';


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
                                        UiCategories.Icons.Status.Boolean.StatusIsTrue() ,
                                        UiCategories.Icons.Status.Boolean.StatusIsFalse()
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
                                        UiCategories.Icons.Status.Visit.StatusVisit() ,
                                        UiCategories.Icons.Status.Visit.StatusUnVisit() ,
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
                                        UiCategories.Icons.Status.Light.StatusLightOn() ,
                                        UiCategories.Icons.Status.Light.StatusLightOff() ,
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
                                        UiCategories.Icons.Status.Pin.StatusPinOpen() ,
                                        UiCategories.Icons.Status.Pin.StatusPinClose() ,
                                        UiCategories.Icons.Status.Pin.StatusPin2Open() ,
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
                                        UiCategories.Icons.Status.Resize.FileWindowResizeMax() ,
                                        UiCategories.Icons.Status.Resize.FileWindowResizeMin() ,
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
                                        UiCategories.Icons.Status.Locked.StatusLockedClose() ,
                                        UiCategories.Icons.Status.Locked.StatusLockedOpen() ,
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
                                        UiCategories.Icons.Symbols.Arrows.Basic.ArrowUp() ,
                                        UiCategories.Icons.Symbols.Arrows.Basic.ArrowRight() ,
                                        UiCategories.Icons.Symbols.Arrows.Basic.ArrowDown() ,
                                        UiCategories.Icons.Symbols.Arrows.Basic.ArrowLeft() ,
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
                                        UiCategories.Icons.Symbols.Arrows.Chevron.ArrowChevronUp() ,
                                        UiCategories.Icons.Symbols.Arrows.Chevron.ArrowChevronRight() ,
                                        UiCategories.Icons.Symbols.Arrows.Chevron.ArrowChevronDown() ,
                                        UiCategories.Icons.Symbols.Arrows.Chevron.ArrowChevronLeft() ,
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
                                        UiCategories.Icons.Symbols.Arrows.Double.ArrowDoubleUp() ,
                                        UiCategories.Icons.Symbols.Arrows.Double.ArrowDoubleRight() ,
                                        UiCategories.Icons.Symbols.Arrows.Double.ArrowDoubleDown() ,
                                        UiCategories.Icons.Symbols.Arrows.Double.ArrowDoubleLeft() ,
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),



                /// Symbols -> Exclumation
                CoreReactive.App.div({
                    className:["col-12" , "row" , "p-0" , "m-0"] ,
                    children:[
                        CoreReactive.App.div({
                            className:["col-3" , "row" , "p-0" , "m-0"] ,
                            children:[
                                CoreReactive.App.div({
                                    className:["border"] ,
                                    children:[
                                        UiCategories.Icons.Symbols.Exclumation.SymbolExclumationSquare() ,
                                        UiCategories.Icons.Symbols.Exclumation.SymbolExclumationWarning() ,
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
                                        UiCategories.Icons.Calc.Symbol.CalcPlus() ,
                                        UiCategories.Icons.Calc.Symbol.CalcMinus() ,
                                        UiCategories.Icons.Calc.Symbol.CalcCross() ,
                                        UiCategories.Icons.Calc.Symbol.CalcDivide() ,
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
                                        UiCategories.Icons.Inputs.Time.InputClock() ,
                                        UiCategories.Icons.Inputs.Time.InputCalender() ,
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
                                        UiCategories.Icons.Inputs.Qr.InputQrCode() ,
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
                                        UiCategories.Icons.Inputs.Tools.FileClearBroom() ,
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
                                        UiCategories.Icons.Inputs.Select.InputSelectColumn() ,
                                        UiCategories.Icons.Inputs.Select.InputSelectOption() ,
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
                                        UiCategories.Icons.Inputs.Text.InputTitle() ,
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
                                        UiCategories.Icons.Inputs.Number.InputNumber() ,
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
                                        UiCategories.Icons.Files.Toolbars.Zoom.FilesZoom() ,
                                        UiCategories.Icons.Files.Toolbars.Zoom.FilesZoomIn() ,
                                        UiCategories.Icons.Files.Toolbars.Zoom.FilesZoomOut() ,
                                        UiCategories.Icons.Files.Toolbars.Zoom.FilesZoomRefresh() ,
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
                                        UiCategories.Icons.Files.Toolbars.Export.FilesPrint() ,
                                        UiCategories.Icons.Files.Toolbars.Export.FilesExcel() ,
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
                                        UiCategories.Icons.Files.Toolbars.Pin.StatusPinOpen() ,
                                        UiCategories.Icons.Files.Toolbars.Pin.StatusPinClose() ,
                                        UiCategories.Icons.Files.Toolbars.Pin.StatusPin2Open() ,
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
                                        UiCategories.Icons.Files.Toolbars.Window.FileWindowClose() ,
                                        UiCategories.Icons.Files.Toolbars.Window.FileWindowResizeMax() ,
                                        UiCategories.Icons.Files.Toolbars.Window.FileWindowResizeMin() ,
                                        UiCategories.Icons.Files.Toolbars.Window.FileWindowMinimize() ,
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
                                        UiCategories.Icons.Files.Toolbars.Header.FileMenu() ,
                                        UiCategories.Icons.Files.Toolbars.Header.FileSetting() ,
                                        UiCategories.Icons.Files.Toolbars.Header.FileSearch() ,
                                        UiCategories.Icons.Files.Toolbars.Header.FileFilter() ,
                                        UiCategories.Icons.Files.Toolbars.Header.FileReload() ,
                                        UiCategories.Icons.Files.Toolbars.Header.FileEmpty() ,
                                        UiCategories.Icons.Files.Toolbars.Header.FileClearBroom() ,
                                        UiCategories.Icons.Files.Toolbars.Header.InputTitle() ,
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
                                        UiCategories.Icons.Files.Actions.FilesEdit() ,
                                        UiCategories.Icons.Files.Actions.FilesDelete() ,
                                        UiCategories.Icons.Files.Actions.FileAttachment() ,
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
                                        UiCategories.Icons.Files.Logo.FileApplication() ,
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
                                        UiCategories.Icons.Files.Category.FileCategory() ,
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
                                        UiCategories.Icons.Files.Type.FileType() ,
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
                                        UiCategories.Icons.Files.Type.FileTypeNote() ,
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
                                        UiCategories.Icons.Files.Tag.FileTage() ,
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
                                        UiCategories.Icons.Files.Status.FileStatusComplete() ,
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
                                        UiCategories.Icons.Loadings.Circle.Loading() ,
                                        UiCategories.Icons.Loadings.Circle.LoadingOrbit() ,
                                        UiCategories.Icons.Loadings.Circle.LoadingPulse() ,
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
                                        UiCategories.Icons.Loadings.Horizontal.LoadingDotsHorizontal() ,
                                        UiCategories.Icons.Loadings.Horizontal.LoadingBarsHorizontal()
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
                                        UiCategories.Icons.Loadings.Vertical.LoadingDotsVertical() ,
                                        UiCategories.Icons.Loadings.Vertical.LoadingBarsVertical()
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
                                        UiCategories.Icons.Payments.Types.PaymentCash() ,
                                        UiCategories.Icons.Payments.Types.PaymentRial() ,
                                        UiCategories.Icons.Payments.Types.PaymentTether() ,
                                        UiCategories.Icons.Payments.Types.PaymentDerham() ,
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
                                        UiCategories.Icons.Payments.Actions.PaymentDeposit() ,
                                        UiCategories.Icons.Payments.Actions.PaymentTransaction() ,
                                        UiCategories.Icons.Payments.Actions.PaymentWithDrawal() ,
                                        UiCategories.Icons.Payments.Actions.PaymentWalletAdd() ,
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
                                        UiCategories.Icons.Payments.Cash.PaymentAmount() ,
                                        UiCategories.Icons.Payments.Cash.PaymentCashCurrency() ,
                                        UiCategories.Icons.Payments.Cash.PaymentCoinCurrency() ,
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
                                        UiCategories.Icons.Payments.Leverage.PaymentLeverage() ,
                                        UiCategories.Icons.Payments.Leverage.PaymentLeverage2() ,
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
                                        UiCategories.Icons.Payments.Input.PaymentWallet1() ,
                                        UiCategories.Icons.Payments.Input.PaymentWallet2() ,
                                        UiCategories.Icons.Payments.Input.PaymentCardNumber() ,
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
                                        UiCategories.Icons.Payments.Rate.PaymentRate() ,
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
                                        UiCategories.Icons.Users.Account.UserAccount() ,
                                        UiCategories.Icons.Users.Account.UserAccountAdd() ,
                                        UiCategories.Icons.Users.Account.UserAccountGroupAdd() ,
                                        UiCategories.Icons.Users.Account.UserAccountReference() ,
                                        UiCategories.Icons.Users.Account.UserAccountReffrence() ,
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
                                        UiCategories.Icons.Users.Emails.UserEmail1() ,
                                        UiCategories.Icons.Users.Emails.UserEmail2() ,
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
                                        UiCategories.Icons.Users.Phone.UserPhone() ,
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
                                        UiCategories.Icons.Users.Password.UserPassword() ,
                                        UiCategories.Icons.Users.Password.UserChangePassword() ,
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