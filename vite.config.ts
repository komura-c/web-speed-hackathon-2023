import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(async ({ mode }) => {
  const prod = !!(mode === 'production');

  return {
    build: {
      cssCodeSplit: prod,
      minify: prod,
      rollupOptions: {
        output: {
          manualChunks: prod ? {
            "@apollo/client": ["@apollo/client"],
            "@emotion/css": ["@emotion/css"],
            "@js-temporal/polyfill": ["@js-temporal/polyfill"],
            "classnames": ["classnames"],
            "formik": ["formik"],
            react: ['react'],
            "react-dom": ["react-dom"],
            "react-error-boundary": ["react-error-boundary"],
            "react-helmet": ["react-helmet"],
            "react-icons": ["react-icons"],
            "react-router-dom": ["react-router-dom"],
            "recoil": ["recoil"],
          } : {}
        },
        plugins: [
          (mode === 'analyze' &&
            visualizer({
              brotliSize: true,
              filename: 'dist/stats.html',
              gzipSize: true,
              open: true,
            })
          ),
          prod && viteCompression({
            algorithm: 'brotliCompress',
            disable: false,
            verbose: true,
          })
        ],
      },
      target: 'es2022',
    },
    plugins: [
      react(),
    ],
  };
});
