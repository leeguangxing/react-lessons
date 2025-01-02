# MiniReact npm 包项目开发

我们的 playground 项目使用了 vite 脚手架，所以我们为了更好的兼容 vite 项目，我们也使用了 Vite 的库模式开发 npm 包。

<br>

## 创建 mini-react 项目

```bash
npm create vite@latest mini-react --template lib
```

- framework 选择 Others
- variant 选择 create-vite-extra
- template 选择 Library (TypeScript)

mini-react-dom 项目同理，我们先从 mini-react-dom 项目开始。

<br>



# 调整 mini-react-dom 项目

现在让我们在尝试调整一下 mini-react-dom 项目，以实现以下代码：

```jsx
import { createRoot } from 'mini-react-dom/client'

const element = document.createElement('div')
element.innerText = 'Hello, Mini React DOM!'

createRoot(document.getElementById('root')!).render(element)
```

上面模仿了 react-dom 的用法，不过 render 是普通 DOM 元素，而不是 React 元素。

首先需要调整 vite.config.ts 的配置，让它支持多入口：

> vite 的库模式介绍：https://cn.vite.dev/guide/build

```ts
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
      include: "lib/**", // 启用 rollup 的监听器
    },
  },
});
```

然后创建 lib/client.ts 文件：
```ts
export function createRoot(container: HTMLElement) {
  return {
    render(element: HTMLElement) {
      container.appendChild(element);
    },
  };
}
```

添加 `client.d.ts` 文件：
```ts
export * from './lib/client'; 
```
这里直接导出了 client 的 ts 文件，而不是重新定义 ts 类型。

再创建 lib/index.ts 文件：
```ts
export * from './client';
export * from './main'; 
```

然后需要调整 package.json 的入口文件：
```json
{
  "name": "mini-react-dom",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "files": [
    "dist",
    "index.d.ts",
    "client.d.ts"
  ],
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./index.d.ts",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./client": {
      "types": "./client.d.ts",
      "import": "./dist/client.js",
      "require": "./dist/client.cjs"
    }
  },
  "scripts": {
    "dev": "tsc && vite build",
    "build": "tsc && vite build"
  },
  "devDependencies": {
    "typescript": "~5.7.2",
    "vite": "^6.0.1"
  }
}
```
可以看到，上面的入口增加了 client 部分，并且没有入口声明单独的 `d.ts` 文件。

<br>

# 为 playground 项目添加 mini-react 依赖

在 playground 项目 package.json 中添加 mini-react 依赖：

```json
{
  "dependencies": {
    "mini-react": "workspace:*",
    "mini-react-dom": "workspace:*",
  }
}
```
pnpm workspaces 说明文档：https://pnpm.io/zh/workspaces

让 vite 监听 mini-react 的构建目录 dist 目录，并刷新浏览器。

```bash
pnpm add -D vite-plugin-live-reload
```
在 vite.config.ts 中使用 liveReload 插件：
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import liveReload from 'vite-plugin-live-reload'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), liveReload([
    '../packages/mini-react/dist/**/*',
    '../packages/mini-react-dom/dist/**/*'
  ])],
})
```

## 更改 workspace 目录 package.json 的 scripts 命令

package.json

```json
{
  "scripts": {
    "dev": "pnpm -r --parallel run dev",
  },
}
```
使用 --parallel 参数显式声明为并行执行。

**先在 mini-react 和 mini-react-dom 项目中先执行一次构建命令，确保 npm 包入口文件已经准备好。**

为 workspace 所有项目重新执行依赖安装：
```bash
pnpm install
```

这时候，我们可以在 playground 项目的 node_modules 目录下看到 mini-react 和 mini-react-dom 的包。

最后

```bash
npm run dev
```

<br>

### 测试
在 playground 项目 main.ts 中使用：
```ts
import { createRoot } from 'mini-react-dom/client'

const element = document.createElement('div')
element.innerText = 'Hello, Mini React DOM!'

createRoot(document.getElementById('root')!).render(element)
```

<br>

# 来看看 Babel 是如何编译 React 代码的

https://babeljs.io/

示例：
```jsx
function App() {
  return <h1>Hello, World!</h1>;
}
```