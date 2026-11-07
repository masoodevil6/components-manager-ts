import {loadComponent} from "component-manager/lazy";
import "../../../dist/package/component-manager.css";

void loadComponent("button").then((Button) => {
    const button = Button({prop_btnTitle: "Consumer button via lazy loader"});
    document.querySelector("#app")!.appendChild(button.getElement());
    document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
}).catch((error) => {
    console.error("Could not load the consumer button", error);
});
