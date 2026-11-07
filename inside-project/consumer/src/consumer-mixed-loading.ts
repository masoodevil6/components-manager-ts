import {Button} from "component-manager/components/button";
import {loadComponent} from "component-manager/lazy";
import "../../../dist/package/component-manager.css";

const app = document.querySelector("#app")!;
const navigation = document.createElement("nav");
navigation.setAttribute("aria-label", "Consumer demo sections");

const overviewTab = document.createElement("button");
overviewTab.type = "button";
overviewTab.textContent = "Overview";
overviewTab.setAttribute("aria-selected", "true");

const creatorTab = document.createElement("button");
creatorTab.type = "button";
creatorTab.textContent = "ElementCreator";
creatorTab.setAttribute("aria-selected", "false");

const panel = document.createElement("section");
panel.setAttribute("role", "tabpanel");
panel.textContent = "ElementCreator has not been requested yet.";

const button = Button({prop_btnTitle: "Button loaded with the initial page"});
navigation.append(overviewTab, creatorTab);
app.append(button.getElement(), navigation, panel);

let creatorView: HTMLElement | null = null;
overviewTab.addEventListener("click", () => {
    overviewTab.setAttribute("aria-selected", "true");
    creatorTab.setAttribute("aria-selected", "false");
    panel.textContent = "The direct Button is available. ElementCreator stays unloaded until its tab is opened.";
});

creatorTab.addEventListener("click", async () => {
    overviewTab.setAttribute("aria-selected", "false");
    creatorTab.setAttribute("aria-selected", "true");
    if (creatorView) {
        panel.replaceChildren(creatorView);
        return;
    }

    creatorTab.disabled = true;
    panel.textContent = "Loading ElementCreator…";
    try {
        const ElementCreator = await loadComponent("element-creator");
        const creator = ElementCreator({
            prop_componentProperties: {
                prop_name: "consumer-element-creator",
                prop_labelTitle: "Consumer input",
                prop_placeholder: "Type something",
                prop_value: "Loaded on demand",
            },
        });
        creatorView = document.createElement("div");
        creatorView.append(creator.getElement());
        panel.replaceChildren(creatorView);
    } catch (error) {
        panel.textContent = `Could not load ElementCreator: ${String(error)}`;
    } finally {
        creatorTab.disabled = false;
    }
});

document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
