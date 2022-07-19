
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

    updateDom(dom, {}, fiber.props)
    // 返回 dom
    return dom
}

// 当前工作单元 fiber
let wipFiber = null;

// 根节点
let wipRoot = null

// 保存根节点更新前的 fiber tree
let currentRoot = null

// 下一个工作单元
let nextUnitOfWork = null

// 存储需删除的 fiber 节点，渲染 DOM 时，遍历 deletions 删除旧 fiber
let deletions = null

// 事件，以‘on’开头
const isEvent = key => key.startsWith("on")
// 标签属性（排除事件和子节点）
const isProperty = key => key !== "children" && !isEvent(key)
// 是否是新属性
const isNew = (prev, next) => key => prev[key] !== next[key]
// 是否是旧属性
const isGone = (prev, next) => key => !(key in next)

function updateDom(dom, prevProps, nextProps) {
    //删除旧的或者有变化的事件
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(
        key =>
            !(key in nextProps) ||
            isNew(prevProps, nextProps)(key)
        )
        .forEach(name => {
            console.log('删除旧的或者有变化的事件')
            const eventType = name
                .toLowerCase()
                .substring(2)
            dom.removeEventListener(
                eventType,
                prevProps[name]
            )
        })

    // 删除旧属性
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            console.log('删除旧属性')
            dom[name] = ""
        })

    // 更新新属性
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            console.log('更新新属性', dom, prevProps, nextProps)
            dom[name] = nextProps[name]
        })

    // 注册新事件
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            console.log('注册新事件')
            const eventType = name
                .toLowerCase()
                .substring(2)
            dom.addEventListener(
                eventType,
                nextProps[name]
        )}
        )
}


/**
 * 将 fiber 添加至真实 DOM
 * @param {element} fiber
 * @param {container} 真实 DOM
 */
function render (element, container) {
    // 清空多次更新前的fiber tree
    if (currentRoot) {
        currentRoot.alternate = null
    }
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot // 保存 fiber 更新前的 fiber tree
    }
    // 下一个工作单元是根节点
    nextUnitOfWork = wipRoot
    // render 时，初始化 deletions 数组
    deletions = []
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
    // 渲染 DOM 时，遍历 deletions 删除旧 fiber
    deletions.forEach(commitWork)
    // 将 fiber tree 渲染为真实 DOM；
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    // 需要设置为 null，否则 workLoop 在浏览器空闲时不断的执行。
    wipRoot = null
}
/**
 * commitWork 对 fiber 的 effectTag 进行判断，并分别处理。
 * @param {fiber} fiber
 */
function commitWork (fiber) {
    if (!fiber) return

    // 兼容没有 dom 节点的 fiber（函数式组件没有dom）
    let domParentFiber = fiber.parent
    // 如果 fiber.parent 没有 dom 节点，则继续找 fiber.parent.parent.dom，直到有 dom 节点。
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }
    const domParent = domParentFiber.dom

    /*
     * 对 fiber 的 effectTag 进行判断，并分别处理
     */
    if (
        fiber.effectTag === "PLACEMENT" &&
        fiber.dom != null
    ) {
        // 当 fiber 的 effectTag 为 PLACEMENT 时，表示是新增 fiber，将该节点新增至父节点中。
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === "DELETION") {
        // TODO: 抽离函数 当 fiber 的 effectTag 为 PLACEMENT 时，表示是删除 fiber，将父节点的该节点删除
        if (fiber.dom) {
            // 如果该 fiber 有 dom 节点，直接删除
            domParent.removeChild(fiber.dom)
        } else {
            // 如果该 fiber 没有 dom 节点，则继续找它的子节点进行删除
            commitDeletion(fiber.child, domParent)
        }
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
        // 当 fiber 的 effectTag 为 UPDATE 时，表示是更新 fiber，更新 props 属性
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    }
    

    // 渲染子节点
    commitWork(fiber.child)
    // 渲染兄弟节点
    commitWork(fiber.sibling)
}

/**
 * 函数式组件
 */
function updateFunctionComponent(fiber) {
    wipFiber = fiber
    // 当前工作单元 fiber 的 hook
    wipFiber.hook = []
    // fiber.type 就是函数组件本身，fiber.props 就是函数组件的参数
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
}

/**
 * 非函数式组件
 */
function updateHostComponent(fiber) {
    // 如果 fiber 没有 dom 节点，为它创建一个 dom 节点
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    // 子节点
    const elements = fiber.props.children
    reconcileChildren(fiber, elements)
}

/**
 * performUnitOfWork 处理工作单元
 * @param {fiber} fiber
 * @return {nextUnitOfWork} 下一个工作单元
 */
function performUnitOfWork(fiber) {
    
    console.log(fiber)
    // 判断是否是函数式组件
    const isFunctionComponent = fiber && fiber.type && fiber.type instanceof Function

    if (isFunctionComponent) {
        // 如果是函数组件，执行 updateFunctionComponent 函数
        updateFunctionComponent(fiber)
    } else {
        // 如果不是函数组件，执行 updateHostComponent 函数
        updateHostComponent(fiber)
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

/**
 * 协调子节点
 * @param {wipFiber} wipFiber
 * @param {elements} fiber 的 子节点
 */
 function reconcileChildren (wipFiber, elements) {

    // 用于统计子节点的索引值
    let index = 0
    // 上一个兄弟节点
    let prevSibling = null

    // oldFiber 可以在 wipFiber.alternate 中找到
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child

    // console.group('fiber')
    // console.log('wipFiber', wipFiber)
    // console.log('oldFiber', oldFiber)
    // console.groupEnd()

    // 遍历子节点
    while (index < elements.length || oldFiber != null) {
        const element = elements[index]

        let newFiber = null

        // fiber 类型是否相同
        const sameType =
            oldFiber &&
            element &&
            element.type == oldFiber.type

        // 如果类型相同，仅更新 props
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: "UPDATE",
            }
        }
        // 当新旧 fiber 类型不同，且有新元素时，创建新 fiber
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: "PLACEMENT",
            }
        }
        // 当新旧 fiber 类型不同，且有旧 fiber 时，删除旧 fiber，设置 effectTag 为 DELETION
        if (oldFiber && !sameType) {
            oldFiber.effectTag = "DELETION"
            deletions.push(oldFiber)
        }    

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }

        // fiber的第一个子节点是它的子节点
        if (index === 0) {
            wipFiber.child = newFiber
        } else if (element) {
            // fiber 的其他子节点，是它第一个子节点的兄弟节点
            prevSibling.sibling = newFiber
        }

        // 把新建的 newFiber 赋值给 prevSibling，这样就方便为 newFiber 添加兄弟节点了
        prevSibling = newFiber
        
        // 索引值 + 1
        index++
    }
}

/**
 * useState 获取、更新 state
 * @param {*} initial 
 * @returns 
 */
function useState(initial) {
    // 是否有旧钩子，旧钩子存储了上一次更新的 hook
    const oldHook = wipFiber.alternate && wipFiber.alternate.hook
    // 初始化钩子 ，钩子的状态是旧钩子的状态或者初始状态
    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: [],
    }
    // 从旧的钩子队列中获取所有动作，然后将它们一一应用到新的钩子状态
    const actions = oldHook ? oldHook.queue : []
    actions.forEach(action => {
        hook.state = action(hook.state)
    })
    // 设置钩子状态
    const setState = action => {
        // 将动作添加至钩子队列
        hook.queue.push(action)
        // 更新渲染，wipRoot 赋值，requestIdleCallback 监听，触发 workLoop 进行渲染
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
        }
        nextUnitOfWork = wipRoot
        deletions = []
    }

    // 把钩子添加至工作单元
    wipFiber.hook = hook
    // 返回钩子的状态和设置钩子的函数
    return [hook.state, setState]
}

const myReact = {
    createElement,
    render,
    useState
};

export default myReact;