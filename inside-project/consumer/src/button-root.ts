import {Framework} from "component-manager";
import "../../../dist/package/component-manager.css";

const button = Framework.UI.Category.UI.Simples.Button({prop_btnTitle: "Consumer button"});
document.querySelector("#app")!.appendChild(button.getElement());
document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
