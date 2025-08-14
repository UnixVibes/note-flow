import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import million from "million/compiler";
import preload from "vite-plugin-preload";
import { version as appVersion } from "./package.json";

const isDev = process.env.NODE_ENV === "development";
const mode = isDev ? "development" : "production";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    million.vite({
      auto: true,
      telemetry: false,
      mode: "react",
      log: false,
      hmr: isDev,
      server: false,
    }),
    VitePWA({
      mode,
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
        suppressWarnings: true,
        disableRuntimeConfig: false,
      },
      workbox: {
        mode,
        disableDevLogs: false,
        sourcemap: false,
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,json,woff,woff2,ttf,eot}",
        ],
        globDirectory: "dist",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
      minify: true,
      manifest: false,
      includeManifestIcons: true,
    }),
    preload({
      mode: "preload",
      includeJs: true,
      includeCss: true,
    }),
  ],
  server: {
    host: "0.0.0.0",
    open: true,
    strictPort: true,
    allowedHosts: true,
    hmr: {
      overlay: true,
    },
  },
  experimental: {
    hmrPartialAccept: true,
    importGlobRestoreExtension: true,
  },
  appType: "spa",
  clearScreen: true,
  dev: {
    sourcemap: true,
    recoverable: true,
    preTransformRequests: true,
  },
  css: {
    devSourcemap: true,
  },
  define: {
    __APP_VERSION__: JSON.stringify(appVersion || "0.0.0"),
  },
  build: {
    target: "es2015",
    sourcemap: "hidden", // Hidden source maps for production
    minify: !isDev ? "esbuild" : false, // esbuild is fast and effective
    cssCodeSplit: true, // Split CSS for improved caching
    cssMinify: !isDev ? "esbuild" : false, // esbuild is fast and effective
    modulePreload: {
      polyfill: true,
    },
    reportCompressedSize: true,
    emptyOutDir: true,
    rollupOptions: {
      perf: true, // Enable performance hints
      experimentalCacheExpiry: 60 * 60 * 1000, // Cache expiry in milliseconds
      cache: true, // Enable caching for faster builds
      treeshake: {
        preset: "recommended",
        annotations: true,
      },
      output: {
        manualChunks: {
          // Core React libraries
          "react-chunk": ["react", "react-dom"],

          // AI libraries
          "ai-chunk": ["ai", "@ai-sdk/google"],

          // Radix UI components
          "radix-chunk": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-slot",
          ],

          // UI libraries & animations
          "ui-chunk": ["clsx", "framer-motion", "tailwind-merge"],
        },
      },
    },
  },
});
