import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: [
      // ─── CORE ───────────────────────────────────────────────
      { find: '@/core_configs_public', replacement: path.resolve(__dirname, './src/framework/module_core/module_configs/public.ts') },
      { find: '@/core_components_public', replacement: path.resolve(__dirname, './src/framework/module_core/module_components/public.ts') },
      { find: '@/core_languages_public', replacement: path.resolve(__dirname, './src/framework/module_core/module_languages/public.ts') },
      { find: '@/core_observable_public', replacement: path.resolve(__dirname, './src/framework/module_core/module_observable/public.ts') },
      { find: '@/core_reactive_public', replacement: path.resolve(__dirname, './src/framework/module_core/module_reactive/public.ts') },
      { find: '@/core_route_public', replacement: path.resolve(__dirname, './src/framework/module_core/module_route/public.ts') },

      { find: '@/core_configs', replacement: path.resolve(__dirname, './src/framework/module_core/module_configs') },
      { find: '@/core_components', replacement: path.resolve(__dirname, './src/framework/module_core/module_components') },
      { find: '@/core_languages', replacement: path.resolve(__dirname, './src/framework/module_core/module_languages') },
      { find: '@/core_observable', replacement: path.resolve(__dirname, './src/framework/module_core/module_observable') },
      { find: '@/core_reactive', replacement: path.resolve(__dirname, './src/framework/module_core/module_reactive') },
      { find: '@/core_route', replacement: path.resolve(__dirname, './src/framework/module_core/module_route') },
      { find: '@/core', replacement: path.resolve(__dirname, './src/framework/module_core') },

      // ─── UI ─────────────────────────────────────────────────
      { find: '@/ui_pages_public', replacement: path.resolve(__dirname, './src/framework/module_ui/module_pages/public.ts') },

      { find: '@/ui_categories', replacement: path.resolve(__dirname, './src/framework/module_ui/module_categories') },
      { find: '@/ui_components', replacement: path.resolve(__dirname, './src/framework/module_ui/module_components') },
      { find: '@/ui_icons', replacement: path.resolve(__dirname, './src/framework/module_ui/module_icons') },
      { find: '@/ui_pages', replacement: path.resolve(__dirname, './src/framework/module_ui/module_pages') },
      { find: '@/ui', replacement: path.resolve(__dirname, './src/framework/module_ui') },

      // ─── UTIL ───────────────────────────────────────────────
      { find: '@/util_brands_public', replacement: path.resolve(__dirname, './src/framework/module_util/module_brands/public.ts') },
      { find: '@/util_consts_public', replacement: path.resolve(__dirname, './src/framework/module_util/module_consts/public.ts') },
      { find: '@/util_styles_public', replacement: path.resolve(__dirname, './src/framework/module_util/module_styles/public.ts') },
      { find: '@/util_validators_public', replacement: path.resolve(__dirname, './src/framework/module_util/module_validators/public.ts') },
      { find: '@/util_convertor_public', replacement: path.resolve(__dirname, './src/framework/module_util/module_convertor/public.ts') },
      { find: '@/util_files_public', replacement: path.resolve(__dirname, './src/framework/module_util/module_files/public.ts') },
      { find: '@/util_dates_public', replacement: path.resolve(__dirname, './src/framework/module_util/module_dates/public.ts') },
      { find: '@/util_excels_public', replacement: path.resolve(__dirname, './src/framework/module_util/module_excel/public.ts') },
      { find: '@/util_tools_public', replacement: path.resolve(__dirname, './src/framework/module_util/module_tools/public.ts') },

      { find: '@/util_brands', replacement: path.resolve(__dirname, './src/framework/module_util/module_brands') },
      { find: '@/util_consts', replacement: path.resolve(__dirname, './src/framework/module_util/module_consts') },
      { find: '@/util_styles', replacement: path.resolve(__dirname, './src/framework/module_util/module_styles') },
      { find: '@/util_validators', replacement: path.resolve(__dirname, './src/framework/module_util/module_validators') },
      { find: '@/util_convertor', replacement: path.resolve(__dirname, './src/framework/module_util/module_convertor') },
      { find: '@/util_files', replacement: path.resolve(__dirname, './src/framework/module_util/module_files') },
      { find: '@/util_dates', replacement: path.resolve(__dirname, './src/framework/module_util/module_dates') },
      { find: '@/util_excels', replacement: path.resolve(__dirname, './src/framework/module_util/module_excel') },
      { find: '@/util_tools', replacement: path.resolve(__dirname, './src/framework/module_util/module_tools') },
      { find: '@/util', replacement: path.resolve(__dirname, './src/framework/module_util') },

      // ─── FRAMEWORK (پیش از @ قرار دارد) ─────────────────────
      { find: '@/framework', replacement: path.resolve(__dirname, './src/framework') },

      // ─── FALLBACK (همیشه آخرین مورد) ────────────────────────
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ]
  }
});