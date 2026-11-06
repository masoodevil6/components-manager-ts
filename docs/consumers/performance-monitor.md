# Performance monitor

The monitoring implementation is currently retained for future integration; the Performance page is a Hello World placeholder. The current-page panel reports browser navigation and resource timing entries for the entire document; it is not an isolated framework download measurement. Transfer size is only the sum of positive exposed resource `transferSize` values. Cached and cross-origin resources can report zero, so use the browser Network panel for a complete trace. Heap is a browser-provided snapshot, when available, and is not a leak measurement.

The scenario runner runs two warmup iterations followed by 1–100 measured iterations. It reports synchronous creation, DOM insertion, and disposal/removal separately, plus the DOM element count. These durations exclude browser paint and asynchronous work. The off-screen host has a fixed width of 800px; results depend on the environment, browser, and workload. The saved baseline is local to the browser and compares creation medians only. Compare runs under the same conditions; no automatic performance verdict is inferred.

Scenarios can be registered by importing the monitoring registry from `module_performance`. The registration returns an unregister function. A scenario must return an element and should dispose of all listeners, subscriptions, timers, and other resources it creates:

```ts
const unregister = MonitoringScenarios.register({
    id: "example.create",
    title: "Example component",
    description: "Creates one example component.",
    create: () => {
        const component = createExampleComponent();
        return {element: component.getElement(), dispose: () => component.dispose()};
    },
});
```

Register scenarios before opening the page. The bundled `browser-dom-baseline` is a plain DOM reference, not a framework component benchmark. Component-specific scenarios can be added independently without changing the page. For lifecycle code that fails before it returns an instance, the scenario itself must clean up any resources already created.
