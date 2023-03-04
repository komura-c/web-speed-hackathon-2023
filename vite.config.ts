import path from 'node:path';

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';

import { getFileList } from './tools/get_file_list';

const publicDir = path.resolve(__dirname, './public');
const getPublicFileList = async (targetPath: string) => {
  const filePaths = await getFileList(targetPath);
  const publicFiles = filePaths
    .map((filePath) => path.relative(publicDir, filePath))
    .map((filePath) => path.join('/', filePath));

  return publicFiles;
};

export default defineConfig(async ({mode}) => {
  const prod = !!(mode === 'production');
  const videos = await getPublicFileList(path.resolve(publicDir, 'videos'));

  return {
    build: {
      assetsInlineLimit: 20480,
      cssCodeSplit: prod,
      cssTarget: 'es6',
      minify: prod,
      rollupOptions: {
        output: {
          manualChunks: prod ? {
            "@emotion/css": ["@emotion/css"],
            "classnames": ["classnames"],
            "currency-formatter": ["currency-formatter"],
            "formik": ["formik"],
            lodash: ['lodash'],
            react: ['react'],
            "react-dom": ["react-dom"],
            "react-error-boundary": ["react-error-boundary"],
            "react-helmet": ["react-helmet"],
            "react-icons": ["react-icons"],
            "react-router-dom": ["react-router-dom"],
            "zod": ["zod"],
          } : {}
        },
        plugins: [
          mode === 'analyze' &&
            visualizer({
              brotliSize: true,
              filename: 'dist/stats.html',
              gzipSize: true,
              open: true,
            }),
        ],
      },
      target: 'es2015',
    },
    plugins: [
      react(),
      topLevelAwait(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
        videos,
      }),
    ],
  };
});
