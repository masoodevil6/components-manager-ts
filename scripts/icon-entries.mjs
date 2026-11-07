import {readdirSync} from "node:fs";
import {dirname, join, relative, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const iconSourceRoot = join(projectRoot, "src/framework/module_ui/module_icons/src");

function collectIconDefinitions(directory, entries = {}) {
    for (const entry of readdirSync(directory, {withFileTypes: true})) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            collectIconDefinitions(path, entries);
        } else if (entry.isFile() && entry.name === "Definition.ts") {
            const publicName = relative(iconSourceRoot, dirname(path)).split("\\").join("/");
            if (entries[publicName]) throw new Error(`Duplicate public icon subpath: ${publicName}`);
            entries[publicName] = resolve(path);
        }
    }
    return entries;
}

export const iconEntries = collectIconDefinitions(iconSourceRoot);

if (Object.keys(iconEntries).length === 0) {
    throw new Error(`No public icon definitions found under ${iconSourceRoot}`);
}
