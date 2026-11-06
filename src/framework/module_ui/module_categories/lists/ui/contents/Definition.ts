import * as UICategories from "@/ui_categories"
import {Keys}            from "../../../languages"
import {Cards}           from "./groups/cards"
import {CollapseGroup}   from "./groups/collapse"
import {Windows}         from "./groups/windows"
import {Tables}          from "./groups/table"
import {Messages}       from "./groups/messages"
import {Definition as Breadcrumb} from "./groups/breadcrumb"
import {Border}          from "./border"
import {ErrorIsEmpty}    from "./errorIsEmpty"
import {RecyclerView}    from "./recyclerView"
import {Tabs}            from "./tabs"
import {ListSelectedScroller} from "./listSelectedScroller"
import {Sidebar}           from "./sidebar"
import {MouseScroller}     from "./mouseScroller"
import {Workflow}          from "./workflow"
import {TimerDown}         from "./timerDown"

export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "contents",
    name:        Keys.category.components.contents.name,
    description: Keys.category.components.contents.description,

    children: [Cards, CollapseGroup, Windows, Tables, Messages, Breadcrumb],

    components:  [
        Border,
        ErrorIsEmpty,
        RecyclerView,
        Tabs,
        ListSelectedScroller,
        Sidebar,
        MouseScroller,
        Workflow,
        TimerDown,
    ],
}
