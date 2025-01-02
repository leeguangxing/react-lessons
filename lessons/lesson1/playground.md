# playground 前端项目搭建

vite npm 地址：https://www.npmjs.com/package/create-vite

<br>

## 环境配置

- node v20.14.0
- npm 10.7.0
- vite 6.1.1

<br>

## 初始化项目

使用 create vite 创建项目：

```bash
npm create vite@latest
```

- project name 输入 playground
- framework 选择 react
- variant 选择 TypeScript + SWC（高效的 ts 编译器）

> https://cn.vite.dev/guide/

<br>

## 使用 prettier 加强代码风格规范

eslint 主要用于校验代码的语法规范和潜在问题。而 prettier 则用于代码格式化规范。他们一般会配合使用。

查询 prettier 最新版本：

```bash
npm show prettier versions
```

安装固定版本号 prettier 和 对应 eslint 插件及配置：

```bash
pnpm add -D --save-exact prettier@3.4.2
pnpm add -D eslint-config-prettier eslint-plugin-prettier
```

在 playground 根目录创建 .prettierrc.json 代码格式化规则如下：

```json
{
  "trailingComma": "es5", // 在多行逗号分隔的句法结构中尽可能打印尾随逗号
  "tabWidth": 2, // 一个 tab 宽度为 2 个空格
  "useTabs": true, // 使用 tab 排版
  "semi": false, // 不在语句末尾打印分号
  "bracketSpacing": true, // 打印对象字面量中括号之间的空格
  "bracketSameLine": false, // JSX 中的结尾尖括号是否是否在同一行
  "singleQuote": true, // 单引号
  "endOfLine": "auto", // 允许使用 windows 和 linux 中的换行符
  "printWidth": 100
}
```

详细的 prettier 选项，请参阅 [https://prettier.io/docs/en/options.html](https://prettier.io/docs/en/options.html)。

同时亦支持 .prettierignore 文件。


为 eslint.config.js 添加 prettier 插件及配置：

```js
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config({
  // ...
  plugins: {
    // ...
    prettier: prettierPlugin,
  },
  rules: {
    // ...
    "prettier/prettier": ["error", prettierConfig],
  },
  prettierConfig, // 禁用与 Prettier 冲突的 ESLint 规则
});
```

执行 eslint fix，检查 eslint 是否配置正确，可执行：

```bash
npx eslint --fix
```
<p style="color:red;">请注意，eslint 和 vscode 的版本都在不断迭代更新，实际配置方式根版本相关。下面配置基于 eslint v9.17.0 和 vscode v1.96.2。<p>
<br>

## 优化 vscode 配置

首先，确保你的 vscode 已经安装了 eslint 插件。

vscode 可以设置在保存时候自动 eslint --fix 修正代码。

- 若全局配置：左下角设置按钮 -> setting -> 输入 eslint -> 点击 Edit in settings.json
- 若项目配置：.vscode/settings.json

.vscode/settings.json 配置如下：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.format.enable": true,
  "eslint.codeAction.showDocumentation": {
    "enable": true
  }
}
```

上面配置做了以下事情：

- 保存时自动 eslint --fix 修正代码
- 保存时自动格式化代码
- 保存时自动显示代码错误提示

<br>

## 使用 prettier 格式化项目代码

在 package.json 中添加格式化命令：

```json
{
  "scripts": {
    "checkFormat": "prettier --check .",
    "format": "prettier --write ."
  }
}
```

```bash
pnpm checkFormat
pnpm format
```
