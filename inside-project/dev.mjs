import {spawn, spawnSync} from "node:child_process";
import {readFileSync, readdirSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {createRequire} from "node:module";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = join(root, "inside-project");
const config = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).internalProjects ?? {};
if (!config || typeof config !== "object" || Array.isArray(config) || Object.values(config).some((enabled) => typeof enabled !== "boolean")) {
    throw new Error("package.json internalProjects must map project IDs to booleans.");
}

const projects = new Map();
for (const entry of readdirSync(projectRoot, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    const directory = join(projectRoot, entry.name);
    let manifest;
    try {
        manifest = JSON.parse(readFileSync(join(directory, "inside-project.json"), "utf8"));
    } catch (error) {
        if (error.code === "ENOENT") continue;
        throw error;
    }
    if (typeof manifest.id !== "string" || projects.has(manifest.id)) throw new Error(`Invalid or duplicate internal project ID in ${directory}.`);
    projects.set(manifest.id, directory);
}
for (const id of Object.keys(config)) {
    if (!projects.has(id)) throw new Error(`Unknown internal project in package.json: ${id}`);
}

const npm = process.env.npm_execpath;
if (Object.values(config).some(Boolean) && !npm) throw new Error("Run this command through npm run dev.");
const vite = join(dirname(createRequire(import.meta.url).resolve("vite/package.json")), "bin", "vite.js");
const children = new Set();
let stopping = false;

function stop(exitCode) {
    if (stopping) return;
    stopping = true;
    for (const child of children) {
        if (!child.pid || child.exitCode !== null) continue;
        if (process.platform === "win32") {
            spawnSync("taskkill", ["/pid", String(child.pid), "/t", "/f"], {stdio: "ignore"});
        } else {
            try { process.kill(-child.pid, "SIGTERM"); } catch (error) { if (error.code !== "ESRCH") console.error(error); }
        }
    }
    process.exitCode = exitCode;
}

function start(label, args, cwd) {
    console.log(`[dev] Starting ${label}`);
    const child = spawn(process.execPath, args, {cwd, stdio: "inherit", detached: process.platform !== "win32"});
    children.add(child);
    child.on("error", (error) => {
        console.error(`[dev] Could not start ${label}:`, error.message);
        stop(1);
    });
    child.on("exit", (code, signal) => {
        children.delete(child);
        if (!stopping) {
            console.error(`[dev] ${label} stopped (${signal ?? code}); stopping the other servers.`);
            stop(code || 1);
        }
    });
}

process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
start("main project", [vite, ...process.argv.slice(2)], root);
for (const [id, enabled] of Object.entries(config)) {
    if (enabled) start(id, [npm, "run", "dev"], projects.get(id));
}
