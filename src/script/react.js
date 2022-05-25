
/**
 * 创建虚拟 DOM 结构
 * @param {type} 标签名
 * @param {props} 属性对象
 * @param  {children} 子节点 
 * @returns {element} 虚拟DOM
 */
function createElement (type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => 
                typeof child === 'object'
                ? child
                : createTextElement(child)
            )
        }
    }
}

/**
 * 创建文本节点
 * @param {text} 文本值
 * @return {element} 虚拟 DOM
 */
function createTextElement (text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

/**
 * createDom 创建 DOM 节点
 * @param {fiber} fiber 节点
 * @return {dom} dom 节点
 */
 function createDom (fiber) {
    // 如果是文本类型，创建空的文本节点，如果不是文本类型，按 type 类型创建节点
    const dom = fiber.type === 'TEXT_ELEMENT'
        ? document.createTextNode("")
        : document.createElement(fiber.type)

    // isProperty 表示不是 children 的属性
    const isProperty = key => key !== "children"
    
    // 遍历 props，为 dom 添加属性
    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = fiber.props[name]
        })
        
    // 返回 dom
    return dom
}

// 根节点
let wipRoot = null

// 下一个工作单元
let nextUnitOfWork = null
/**
 * 将 fiber 添加至真实 DOM
 * @param {element} fiber
 * @param {container} 真实 DOM
 */
function render (element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        }
    }
    // 下一个工作单元是根节点
    nextUnitOfWork = wipRoot
}

/**
 * workLoop 工作循环函数
 * @param {deadline} 截止时间
 */
function workLoop(deadline) {
    // 是否应该停止工作循环函数
    let shouldYield = false

    // 如果存在下一个工作单元，且没有优先级更高的其他工作时，循环执行
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        
        // 如果截止时间快到了，停止工作循环函数
        shouldYield = deadline.timeRemaining() < 1
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot()
    }

    // 通知浏览器，空闲时间应该执行 workLoop
    requestIdleCallback(workLoop)
}
// 通知浏览器，空闲时间应该执行 workLoop
requestIdleCallback(workLoop)


// 全部工作单元完成后，将 fiber tree 渲染为真实 DOM；
function commitRoot () {
    commitWork(wipRoot.child)
    // 需要设置为 null，否则 workLoop 在浏览器空闲时不断的执行。
    wipRoot = null
}
/**
 * performUnitOfWork 处理工作单元, 知道找不到子单元或者兄弟单元停止（区别于）
 * @param {fiber} fiber
 */
function commitWork (fiber) {
    if (!fiber) return
    const domParent = fiber.parent.dom
    domParent.appendChild(fiber.dom)
    // 渲染子节点
    commitWork(fiber.child)
    // 渲染兄弟节点
    commitWork(fiber.sibling)
}



/**
 * performUnitOfWork 处理工作单元
 * @param {fiber} fiber
 * @return {nextUnitOfWork} 下一个工作单元
 */
function performUnitOfWork(fiber) {
    // 如果 fiber 没有 dom 节点，为它创建一个 dom 节点
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    // 如果 fiber 有父节点，将 fiber.dom 添加至父节点
    // if (fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }

    // 子节点
    const elements = fiber.props.children
    // 索引
    let index = 0
    // 上一个兄弟节点
    let prevSibling = null
    // 遍历子节点
    while (index < elements.length) {
        const element = elements[index]

        // 创建 fiber
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        }

        // 将第一个子节点设置为 fiber 的子节点
        if (index === 0) {
            fiber.child = newFiber
        } else if (element) {
        // 第一个之外的子节点设置为该节点的兄弟节点
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }
    // 如果有子节点，返回子节点
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        // 如果有兄弟节点，返回兄弟节点
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        // 否则继续走 while 循环，直到找到 root。
        nextFiber = nextFiber.parent
    }
}

const myReact = {
    createElement,
    render
};

export default myReact;