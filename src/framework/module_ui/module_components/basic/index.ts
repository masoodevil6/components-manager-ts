/**
 * Basic — زیرساخت مشترک Componentها (UI)
 *
 *   manager  → ComponentManager (Registry — بدون Runtime)
 *   types    → تایپ‌های Metadata
 *
 * نکته (پلن 6.1): Base Componentها به Core منتقل شدند —
 *   ComponentBase → @/core_components (module_core/module_components)
 */
export * as Manager from "./manager";
export * as Types   from "./types";