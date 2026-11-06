import { defineConfig, type ProxyOptions } from 'vite';
import path from 'path';
import {readdirSync, readFileSync, existsSync} from 'fs';
import {validateInternalProjects} from './inside-project/manifest';

const internalProjectsDir = path.resolve(__dirname, './inside-project');
const manifests = readdirSync(internalProjectsDir, {withFileTypes: true})
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(internalProjectsDir, entry.name, 'inside-project.json'))
  .filter(existsSync)
  .map((file) => JSON.parse(readFileSync(file, 'utf8')));
const internalProjects = validateInternalProjects(manifests);
const disableInternalProjectCache: NonNullable<ProxyOptions['configure']> = (proxy) => {
  proxy.on('proxyReq', (request) => {
    request.removeHeader('if-none-match');
    request.removeHeader('if-modified-since');
  });
  proxy.on('proxyRes', (response) => {
    response.headers['cache-control'] = 'no-store';
    response.headers.pragma = 'no-cache';
    delete response.headers.etag;
    delete response.headers['last-modified'];
    delete response.headers.expires;
  });
};

export default defineConfig({
  server: {proxy: Object.fromEntries(internalProjects.map((project) => [project.previewBase, {target: `http://127.0.0.1:${project.devPort}`, ws: true, configure: disableInternalProjectCache}]))},
  resolve: {
    alias: [
      // ─── CORE ───────────────────────────────────────────────
      { find: '@/core_configs',      replacement: path.resolve(__dirname, './src/framework/module_core/module_configs') },
      { find: '@/core_components',   replacement: path.resolve(__dirname, './src/framework/module_core/module_components') },
      { find: '@/core_event',        replacement: path.resolve(__dirname, './src/framework/module_core/module_event') },
      { find: '@/core_languages',    replacement: path.resolve(__dirname, './src/framework/module_core/module_languages') },
      { find: '@/core_observable',   replacement: path.resolve(__dirname, './src/framework/module_core/module_observable') },
      { find: '@/core_reactive',     replacement: path.resolve(__dirname, './src/framework/module_core/module_reactive') },
      { find: '@/core_route',        replacement: path.resolve(__dirname, './src/framework/module_core/module_route') },
      { find: '@/core',              replacement: path.resolve(__dirname, './src/framework/module_core') },

      // ─── UI ─────────────────────────────────────────────────
      { find: '@/ui_controller', replacement: path.resolve(__dirname, './src/framework/module_ui/module_controller') },
      { find: '@/ui_categories', replacement: path.resolve(__dirname, './src/framework/module_ui/module_categories') },
      { find: '@/ui_components', replacement: path.resolve(__dirname, './src/framework/module_ui/module_components') },
      { find: '@/ui_icons', replacement: path.resolve(__dirname, './src/framework/module_ui/module_icons') },
      { find: '@/ui_pages', replacement: path.resolve(__dirname, './src/framework/module_ui/module_pages') },
      { find: '@/ui', replacement: path.resolve(__dirname, './src/framework/module_ui') },

      // ─── UTIL ───────────────────────────────────────────────

      { find: '@/util_brands', replacement: path.resolve(__dirname, './src/framework/module_util/module_brands') },
      { find: '@/util_consts', replacement: path.resolve(__dirname, './src/framework/module_util/module_consts') },
      { find: '@/util_styles', replacement: path.resolve(__dirname, './src/framework/module_util/module_styles') },
      { find: '@/util_shapes', replacement: path.resolve(__dirname, './src/framework/module_util/module_shapes') },
      { find: '@/util_validators', replacement: path.resolve(__dirname, './src/framework/module_util/module_validators') },
      { find: '@/util_convertor', replacement: path.resolve(__dirname, './src/framework/module_util/module_convertor') },
      { find: '@/util_files', replacement: path.resolve(__dirname, './src/framework/module_util/module_files') },
      { find: '@/util_dates', replacement: path.resolve(__dirname, './src/framework/module_util/module_dates') },
      { find: '@/util_excels', replacement: path.resolve(__dirname, './src/framework/module_util/module_excel') },
      { find: '@/util_tools', replacement: path.resolve(__dirname, './src/framework/module_util/module_tools') },
      { find: '@/util_options_std', replacement: path.resolve(__dirname, './src/framework/module_util/module_options_std') },
      { find: '@/util', replacement: path.resolve(__dirname, './src/framework/module_util') },

      // ─── PERFORMANCE ────────────────────────────────────────
      { find: '@/performance', replacement: path.resolve(__dirname, './src/framework/module_performance') },

      // ─── FRAMEWORK (پیش از @ قرار دارد) ─────────────────────
      { find: '@/framework', replacement: path.resolve(__dirname, './src/framework') },

      // ─── FALLBACK (همیشه آخرین مورد) ────────────────────────
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ]
  }
});
