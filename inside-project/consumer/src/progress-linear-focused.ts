import {ProgressLinear} from "component-manager/progress-linear";
import "../../../dist/package/component-manager.css";

const progress = ProgressLinear({
    prop_title: "Processing records",
    prop_statusText: "48 of 100 records",
    prop_value: 48,
});
document.querySelector("#app")!.appendChild(progress.getElement());
document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
