import {loadComponent} from "component-manager/lazy";
import "../../../dist/package/component-manager.css";

const app = document.querySelector("#app")!;
const loadButton = document.createElement("button");
loadButton.type = "button";
loadButton.textContent = "Load ElementCreator";

const status = document.createElement("p");
status.textContent = "ElementCreator is not loaded yet.";
app.append(loadButton, status);

loadButton.addEventListener("click", async () => {
    loadButton.disabled = true;
    status.textContent = "Loading ElementCreator…";

    try {
        const ElementCreator = await loadComponent("element-creator");
        const creator = ElementCreator({
            prop_componentProperties: {
                prop_name: "consumer-element-creator-lazy",
                prop_labelTitle: "Consumer input",
                prop_placeholder: "Type something",
                prop_value: "Loaded on demand",
            },
        });
        const openSettings = document.createElement("button");
        openSettings.type = "button";
        openSettings.textContent = "Open component settings";
        openSettings.style.position = "relative";
        openSettings.style.zIndex = "10000";
        openSettings.addEventListener("click", (event) => creator.call_openSettings(event));

        app.replaceChildren(creator.getElement(), openSettings);
    } catch (error) {
        loadButton.disabled = false;
        status.textContent = `Could not load ElementCreator: ${String(error)}`;
    }
});

document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
