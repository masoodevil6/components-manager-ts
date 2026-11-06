export type InternalProjectScenario = {id: string; title: string; path: string};
export type InternalProjectManifest = {version: 1; id: string; title: string; kind: string; previewBase: string; devPort: number; scenarios: InternalProjectScenario[]};

export function validateInternalProject(value: unknown): InternalProjectManifest {
    const project = value as InternalProjectManifest;
    const id = (value: unknown) => typeof value === "string" && /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/.test(value);
    if (!project || project.version !== 1 || !id(project.id) || typeof project.title !== "string" || !project.title.trim() || typeof project.kind !== "string" || !project.kind.trim() || !Number.isInteger(project.devPort) || project.devPort < 1024 || project.devPort > 65535 || project.previewBase !== `/internal-projects/${project.id}/` || !Array.isArray(project.scenarios) || !project.scenarios.length) throw new Error("Invalid internal project manifest.");
    const seen = new Set<string>();
    for (const scenario of project.scenarios) {
        if (!scenario || !id(scenario.id) || seen.has(scenario.id) || typeof scenario.title !== "string" || !scenario.title.trim() || typeof scenario.path !== "string" || !/^[a-z0-9][a-z0-9_-]*\.html$/.test(scenario.path)) throw new Error(`Invalid scenario in internal project ${project.id}.`);
        seen.add(scenario.id);
    }
    return project;
}

export function validateInternalProjects(values: unknown[]): InternalProjectManifest[] {
    const projects = values.map(validateInternalProject);
    if (new Set(projects.map((project) => project.id)).size !== projects.length || new Set(projects.map((project) => project.devPort)).size !== projects.length) throw new Error("Internal project IDs and dev ports must be unique.");
    return projects;
}
