import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  base: "/kyoto-travel/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [
        "illustrations/*.svg",
        "icons/*.svg",
        "icons/*.png",
        "fonts/*.woff2",
      ],
      manifest: {
        name: "ふたりの京都旅日記",
        short_name: "京都旅日記",
        description: "兩個人的京都冬日旅行手帳",
        lang: "zh-TW",
        start_url: "/kyoto-travel/",
        scope: "/kyoto-travel/",
        display: "standalone",
        background_color: "#FFFCF6",
        theme_color: "#FFFCF6",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webp,woff2}"],
        navigateFallback: "/kyoto-travel/index.html",
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
