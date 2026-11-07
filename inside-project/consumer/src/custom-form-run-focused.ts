import {CustomForm} from "component-manager/components/custom-form";
import "../../../dist/package/component-manager.css";

const form = CustomForm({
    prop_customFormMode: "RUN" as any,
    prop_customFormFormOptions: {prop_runFetch: false, prop_url: ""},
    prop_customFormGroups: [
        {
            id: "account",
            title: "Account details",
            columns: 2,
            fields: [
                {id: "name", name: "name", label: "Name", type: "INPUT" as any, placeholder: "Your name", required: true},
                {id: "email", name: "email", label: "Email", type: "INPUT" as any, placeholder: "you@example.com"},
                {id: "updates", name: "updates", label: "Receive product updates", type: "CHECKBOX" as any},
                {id: "topics", name: "topics", label: "Topics", type: "SELECT" as any, options: [{label: "Design", value: "design"}, {label: "Engineering", value: "engineering"}]},
            ],
        },
    ],
});

document.querySelector("#app")!.appendChild(form.getElement());
document.querySelector('meta[name="internal-project-ready"]')!.setAttribute("content", "ready");
