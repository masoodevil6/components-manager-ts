import {Button} from "component-manager/button";
import "../../../dist/package/component-manager.css";

const button = Button({prop_btnTitle: "Consumer button"});
document.querySelector("#app")!.appendChild(button.getElement());

document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
