import {validateInternalProjects} from "../../../../../../../inside-project/manifest";

// Vite collects metadata only; project application code is not included in the main app.
const manifests = import.meta.glob("/inside-project/*/inside-project.json", {eager: true, import: "default"});
export const internalProjects = validateInternalProjects(Object.values(manifests));
