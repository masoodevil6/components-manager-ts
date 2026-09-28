import * as UICategories from "@/ui_categories"
import {Keys}            from "../../../languages"
import {Border}          from "./border"
import {Collapse}        from "./collapse"
import {ErrorIsEmpty}    from "./errorIsEmpty"
import {WebCode}        from "./webCode"
import {RecyclerView}    from "./recyclerView"
import {Tabs}            from "./tabs"
import {Window}          from "./window"
import {WindowConfirm}  from "./windowConfirm"
import {Table}            from "./table"
import {ListSelectedScroller} from "./listSelectedScroller"
import {Loading}           from "./loading"
import {Sidebar}           from "./sidebar"
import {MouseScroller}     from "./mouseScroller"
import {TimerDown}         from "./timerDown"

export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "contents",
    name:        Keys.category.components.contents.name,
    description: Keys.category.components.contents.description,

    components:  [
        Border,
        Collapse,
        ErrorIsEmpty,
        WebCode,
        RecyclerView,
        Tabs,
        Window,
        WindowConfirm,
        Table,
        ListSelectedScroller,
        Loading,
        Sidebar,
        MouseScroller,
        TimerDown,
    ],
}
