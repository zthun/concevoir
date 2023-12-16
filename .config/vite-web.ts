import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export function defineWeb(dir: string) {
  return defineConfig({
    plugins: [
      tsConfigPaths(),
      visualizer({
        filename: `${dir}/stats/analysis.html`
      })
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
}
