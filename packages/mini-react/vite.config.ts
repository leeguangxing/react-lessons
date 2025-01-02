import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./lib/main.ts",
      name: "MiniReact", // 导出的模块名
      fileName: "mini-react", // 打包后的文件名
    },
    watch: {
      include: "lib/**", // 监听文件变化
    },
  },
});