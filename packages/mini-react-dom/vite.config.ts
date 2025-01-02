import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: "./lib/index.ts",
        client: "./lib/client.ts",
      },
      name: "MiniReactDom",
    },
    rollupOptions: {
      // output: {
      //   preserveModules: true, // 保留模块结构，确保每个模块作为单独的文件输出。
      // }
    },
    watch: {
      include: "lib/**", // 监听文件变化
    },
  },
});