# 😕：“你是否了解调和算法的工作原理？”

**调和算法**（Reconciliation）是 React 用于比较新旧虚拟 DOM 树并计算最小变更的一套机制。它的核心目的是**提升性能**和**保证正确性**。

<br>

## 1、核心原则
React 的调和算法基于以下假设：  
**不同类型的元素会生成不同的树**：
   - 如果新旧节点的类型不同，React 会直接销毁旧节点并创建新节点。
   - 示例：`<div>` 替换为 `<p>` 会直接重建。

**相同类型的元素会保留 DOM 并对比属性**：
   - React 会复用 DOM 节点，仅更新变更的属性。
   - 示例：`<div id="old" />` 更新为 `<div id="new" />`，只修改 `id` 属性。

**通过 `key` 优化列表渲染**：
   - 在列表中，`key` 用于标识元素的唯一性。
   - 如果 `key` 缺失或变化，React 可能会误判节点，导致性能下降或渲染问题。

<br>

## 2、具体步骤
**构建 Fiber 树**：
   - Fiber 是一种链表结构，用于高效描述组件树的更新任务。

**比较虚拟 DOM**：
   - 深度优先遍历新旧虚拟 DOM 树。
   - 对每个节点，根据类型和 `key` 判断是否需要复用、更新或销毁。

**生成更新任务**：
   - 调和过程中，React 将变更打包为任务队列，交由调度器逐步执行。

**提交更新到 DOM**：
   - 调和完成后，React 将所有任务提交给真实 DOM，更新页面。

<br>

## 3、Fiber 架构优化
- 传统的递归算法无法中断，但 Fiber 将树结构转化为链表，支持分块渲染。
- React 结合调度器，为高优先级任务（如用户输入）让出执行权，提升响应速度。

<br>

### 示例：虚拟 DOM 的 Diff 过程

```javascript
// 旧虚拟 DOM
const oldVDOM = {
  type: 'div',
  props: { id: 'container' },
  children: [
    { type: 'h1', props: { className: 'title' }, children: ['Hello, world!'] },
    { type: 'p', props: {}, children: ['This is a paragraph.'] },
  ],
};

// 新虚拟 DOM
const newVDOM = {
  type: 'div',
  props: { id: 'container' },
  children: [
    { type: 'h1', props: { className: 'title' }, children: ['Hello, React!'] }, // 修改文本
    { type: 'p', props: {}, children: ['This is a paragraph.'] },
    { type: 'button', props: { onClick: () => alert('Clicked!') }, children: ['Click me'] }, // 新增节点
  ],
};

// React 比较新旧虚拟 DOM，找到需要更新的地方
```

Diff 结果：

1、h1 节点的子节点文本从 "Hello, world!" 更新为 "Hello, React!"。

2、新增了一个 button 节点。