import ssr from "vike/plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react({}), ssr({})],
  resolve: {
    alias: {
        // 设置别名
        "@utils": "/utils",
        "@layouts": "/layouts",
        "@pages": "/pages",
        "@components": "/components",
        "@assets": "/assets",
        "@typesSelf": "/types",
        "@common": "/common",
    },
},
});