import {Framework} from "component-manager";
import "../../../dist/package/component-manager.css";

const table = Framework.UI.Category.UI.Contents.Table({
    prop_header: [{id: "name", content: "Name"}, {id: "state", content: "State"}],
    prop_order: ["name", "state"],
    prop_data: [{name: "Button", state: "Ready"}, {name: "Progress", state: "Running"}],
    prop_hasColNumber: true,
    prop_hasColSelector: true,
});
document.querySelector("#app")!.appendChild(table.getElement());
document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
