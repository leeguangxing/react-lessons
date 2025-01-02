const fiberTree = {
    name: "root",
    flags: "update", // 根节点需要更新
    child: {
      name: "child1",
      flags: null, // 不需要更新
      child: {
        name: "child1-1",
        flags: null, // 不需要更新
        child: null,
        sibling: {
          name: "child1-2",
          flags: "update", // 此节点需要更新
          child: {
            name: "child1-2-1",
            flags: null, // 不需要更新
            child: null,
            sibling: null,
            return: null, // 将在构造时设置
          },
          sibling: null,
          return: null, // 将在构造时设置
        },
        return: null, // 将在构造时设置
      },
      sibling: {
        name: "child2",
        flags: null, // 不需要更新
        child: null,
        sibling: {
          name: "child3",
          flags: "update", // 此节点需要更新
          child: {
            name: "child3-1",
            flags: "update", // 此节点需要更新
            child: null,
            sibling: {
              name: "child3-2",
              flags: null, // 不需要更新
              child: null,
              sibling: null,
              return: null, // 将在构造时设置
            },
            return: null, // 将在构造时设置
          },
          sibling: null,
          return: null, // 将在构造时设置
        },
        return: null, // 将在构造时设置
      },
      return: null, // 将在构造时设置
    },
    sibling: null,
    return: null,
  };
  
  
  function setReturnPointers(fiber, parent = null) {
    if (!fiber) return;
    fiber.return = parent;
  
    if (fiber.child) {
      setReturnPointers(fiber.child, fiber);
    }
    if (fiber.sibling) {
      setReturnPointers(fiber.sibling, parent);
    }
  }
  
  // 初始化 Fiber 树的 return 属性
  setReturnPointers(fiberTree);