import {JsonTree} from "component-manager/json-tree";
import "../../../dist/package/component-manager.css";

const tree = JsonTree({
    prop_data: {project: "consumer", component: "JSON Tree", items: ["one", "two", "three"]},
});
document.querySelector("#app")!.appendChild(tree.getElement());
document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
