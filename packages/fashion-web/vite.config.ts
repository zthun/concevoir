import { visualizer } from 'rollup-plugin-visualizer';
import { PluginOption, defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    visualizer({
      filename: 'stats/analysis.html'
    }) as PluginOption
  ],
  server: {
    strictPort: true
  },
  resolve: {
    alias: {
      lodash: 'lodash-es'
    }
  }
});
