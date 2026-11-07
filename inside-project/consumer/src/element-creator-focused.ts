import {ElementCreator} from "component-manager/components/element-creator";
import "../../../dist/package/component-manager.css";

const creator = ElementCreator({
    prop_componentProperties: {
        prop_name: "consumer-element-creator",
        prop_labelTitle: "Consumer input",
        prop_placeholder: "Type something",
        prop_value: "ElementCreator via consumer",
    },
});
const openSettings = document.createElement("button");
openSettings.type = "button";
openSettings.textContent = "Open component settings";
openSettings.style.position = "relative";
openSettings.style.zIndex = "10000";
openSettings.addEventListener("click", (event) => creator.call_openSettings(event));

const app = document.querySelector("#app")!;
app.append(creator.getElement(), openSettings);
document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
