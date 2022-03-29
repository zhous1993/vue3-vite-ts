import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// 自动按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// 图标
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import legacy from "@vitejs/plugin-legacy";
// https://vitejs.dev/config/

export default defineConfig((env) => {
  // 环境变量
  const viteEnv = loadEnv(env.mode, `.env.${env.mode}`);
  return {
    base: viteEnv.VITE_BASE,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"), // 别名
      },
    },
    // dev 服务
    server: {
      host: true, // IP访问
      port: 8080,
      open: true, // 打开浏览器
      cors: true, // 跨域
      proxy: {
        "/api": {
          target: "",
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace("/api", "/"), // url
        },
      },
    },
    // 打包
    build: {
      brotliSize: false,
      chunkSizeWarningLimit: 2000, // 打包大小限制
      // 生产环境移除log
      terserOptions: {
        compress: {
          drop_console: false,
          pure_funcs: ["console.log", "console.info"],
          drop_debugger: true,
        },
      },
      // 静态资源
      assetsDir: "static/assets",
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/variables.scss";`,
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      AutoImport({
        dts: "./src/auto-import.d.ts",
        imports: ["vue", "pinia", "vue-router"],
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`,
          // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
          globalsPropValue: true,
        },
      }),
      Components({
        dts: "./src/components.d.ts",
        // imports 指定组件所在位置，默认为 src/components
        dirs: ["src/components"],
        resolvers: IconsResolver(),
      }),
      Icons({
        compiler: "vue3",
        autoInstall: true,
      }),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      vue(),
    ],
  };
});
