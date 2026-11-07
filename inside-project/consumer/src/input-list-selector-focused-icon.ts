import {InputListSelector} from "component-manager/components/input-list-selector";
import {Framework} from "component-manager";
import "../../../dist/package/component-manager.css";

const selector = InputListSelector({
    prop_labelTitle: "Choose columns",
    prop_labelShow: true,
    prop_showListSelected: true,
    prop_icon: Framework.UI.Icon.Src.InputSelectColumn.Definition as any,
    prop_columns: [
        {id: "name", title: "Name", selected: true},
        {id: "state", title: "State", selected: true},
        {id: "owner", title: "Owner", selected: false},
    ],
});
document.querySelector("#app")!.appendChild(selector.getElement());
document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
