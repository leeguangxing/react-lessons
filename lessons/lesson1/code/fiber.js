let nextUnitOfWork = null; // 下一个工作单元
let isPaused = false; // 模拟暂停标志

// 模拟 performWork 方法
function performWork(fiber) {
   // 检查当前节点是否需要更新
  if (fiber.flags === "update") {
    console.log(`Updating: ${fiber.name}`);
  } else {
    console.log(`Skipping: ${fiber.name}`);
  }
  // 优先返回子节点作为下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }

  // 如果没有子节点，访问兄弟节点或回溯父节点寻找兄弟节点
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return; // 回溯到父节点
  }

  return null; // 全部遍历完成
}

// 模拟时间切片，暂停任务
function workLoop() {
  while (nextUnitOfWork && !isPaused) {
    nextUnitOfWork = performWork(nextUnitOfWork);

    // 模拟某些条件下的暂停
    if (nextUnitOfWork?.name === "child1-1") {
      console.log("Pausing work...");
      isPaused = true;
    }
  }

  if (!nextUnitOfWork) {
    console.log("Work complete!");
  }
}

// 开始任务
function startWork() {
  nextUnitOfWork = fiberTree; // 从根节点开始
  workLoop();
}

// 恢复任务
function resumeWork() {
  console.log("Resuming work...");
  isPaused = false;
  workLoop();
}

// 执行代码
startWork(); // 启动 Fiber 遍历
setTimeout(() => resumeWork(), 2000); // 2 秒后恢复任务