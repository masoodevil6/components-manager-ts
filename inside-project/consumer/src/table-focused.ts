import {Table} from "component-manager/components/table";
import "../../../dist/package/component-manager.css";

const table = Table({
    prop_header: [{id: "name", content: "Name"}, {id: "state", content: "State"}],
    prop_order: ["name", "state"],
    prop_data: [{name: "Button", state: "Ready"}, {name: "Progress", state: "Running"}],
    prop_hasColNumber: true,
    prop_hasColSelector: true,
});
document.querySelector("#app")!.appendChild(table.getElement());
document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
