/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_script_react_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/script/react.js */ \"./src/script/react.js\");\n\n/** @jsx myReact.createElement */\n\nvar updateValue = function updateValue(e) {\n  rerender(e.target.value);\n};\n\nvar container = document.getElementById('root');\n\nvar rerender = function rerender(value) {\n  var element = _src_script_react_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"div\", null, _src_script_react_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"input\", {\n    onInput: updateValue,\n    value: value\n  }), _src_script_react_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"h2\", null, \"Hello \", value));\n  _src_script_react_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].render(element, container);\n};\n\nrerender(\"World\");\n\n//# sourceURL=webpack://react/./main.js?");

/***/ }),

/***/ "./src/script/react.js":
/*!*****************************!*\
  !*** ./src/script/react.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * 创建虚拟 DOM 结构\n * @param {type} 标签名\n * @param {props} 属性对象\n * @param  {children} 子节点 \n * @returns {element} 虚拟DOM\n */\nfunction createElement(type, props) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  return {\n    type: type,\n    props: _objectSpread(_objectSpread({}, props), {}, {\n      children: children.map(function (child) {\n        return _typeof(child) === 'object' ? child : createTextElement(child);\n      })\n    })\n  };\n}\n/**\n * 创建文本节点\n * @param {text} 文本值\n * @return {element} 虚拟 DOM\n */\n\n\nfunction createTextElement(text) {\n  return {\n    type: 'TEXT_ELEMENT',\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n}\n/**\n * createDom 创建 DOM 节点\n * @param {fiber} fiber 节点\n * @return {dom} dom 节点\n */\n\n\nfunction createDom(fiber) {\n  // 如果是文本类型，创建空的文本节点，如果不是文本类型，按 type 类型创建节点\n  var dom = fiber.type === 'TEXT_ELEMENT' ? document.createTextNode(\"\") : document.createElement(fiber.type);\n  updateDom(dom, {}, fiber.props); // 返回 dom\n\n  return dom;\n} // 根节点\n\n\nvar wipRoot = null; // 保存根节点更新前的 fiber tree\n\nvar currentRoot = null; // 下一个工作单元\n\nvar nextUnitOfWork = null; // 存储需删除的 fiber 节点，渲染 DOM 时，遍历 deletions 删除旧 fiber\n\nvar deletions = null; // 事件，以‘on’开头\n\nvar isEvent = function isEvent(key) {\n  return key.startsWith(\"on\");\n}; // 标签属性（排除事件和子节点）\n\n\nvar isProperty = function isProperty(key) {\n  return key !== \"children\" && !isEvent(key);\n}; // 是否是新属性\n\n\nvar isNew = function isNew(prev, next) {\n  return function (key) {\n    return prev[key] !== next[key];\n  };\n}; // 是否是旧属性\n\n\nvar isGone = function isGone(prev, next) {\n  return function (key) {\n    return !(key in next);\n  };\n};\n\nfunction updateDom(dom, prevProps, nextProps) {\n  //删除旧的或者有变化的事件\n  Object.keys(prevProps).filter(isEvent).filter(function (key) {\n    return !(key in nextProps) || isNew(prevProps, nextProps)(key);\n  }).forEach(function (name) {\n    var eventType = name.toLowerCase().substring(2);\n    dom.removeEventListener(eventType, prevProps[name]);\n  }); // 删除旧属性\n\n  Object.keys(prevProps).filter(isProperty).filter(isGone(prevProps, nextProps)).forEach(function (name) {\n    dom[name] = \"\";\n  }); // 更新新属性\n\n  Object.keys(nextProps).filter(isProperty).filter(isNew(prevProps, nextProps)).forEach(function (name) {\n    dom[name] = nextProps[name];\n  }); // 注册新事件\n\n  Object.keys(nextProps).filter(isEvent).filter(isNew(prevProps, nextProps)).forEach(function (name) {\n    var eventType = name.toLowerCase().substring(2);\n    dom.addEventListener(eventType, nextProps[name]);\n  });\n}\n/**\n * 将 fiber 添加至真实 DOM\n * @param {element} fiber\n * @param {container} 真实 DOM\n */\n\n\nfunction render(element, container) {\n  wipRoot = {\n    dom: container,\n    props: {\n      children: [element]\n    },\n    alternate: currentRoot // 保存 fiber 更新前的 fiber tree\n\n  }; // 下一个工作单元是根节点\n\n  nextUnitOfWork = wipRoot; // render 时，初始化 deletions 数组\n\n  deletions = [];\n}\n/**\n * workLoop 工作循环函数\n * @param {deadline} 截止时间\n */\n\n\nfunction workLoop(deadline) {\n  // 是否应该停止工作循环函数\n  var shouldYield = false; // 如果存在下一个工作单元，且没有优先级更高的其他工作时，循环执行\n\n  while (nextUnitOfWork && !shouldYield) {\n    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // 如果截止时间快到了，停止工作循环函数\n\n    shouldYield = deadline.timeRemaining() < 1;\n  }\n\n  if (!nextUnitOfWork && wipRoot) {\n    commitRoot();\n  } // 通知浏览器，空闲时间应该执行 workLoop\n\n\n  requestIdleCallback(workLoop);\n} // 通知浏览器，空闲时间应该执行 workLoop\n\n\nrequestIdleCallback(workLoop); // 全部工作单元完成后，将 fiber tree 渲染为真实 DOM；\n\nfunction commitRoot() {\n  // 渲染 DOM 时，遍历 deletions 删除旧 fiber\n  deletions.forEach(commitWork); // 将 fiber tree 渲染为真实 DOM；\n\n  commitWork(wipRoot.child);\n  currentRoot = wipRoot; // 需要设置为 null，否则 workLoop 在浏览器空闲时不断的执行。\n\n  wipRoot = null;\n}\n/**\n * performUnitOfWork 处理工作单元, 知道找不到子单元或者兄弟单元停止（区别于）\n * @param {fiber} fiber\n */\n\n\nfunction commitWork(fiber) {\n  if (!fiber) return;\n  var domParent = fiber.parent.dom;\n  /*\n   * 对 fiber 的 effectTag 进行判断，并分别处理\n   */\n\n  if (fiber.effectTag === \"PLACEMENT\" && fiber.dom != null) {\n    // 当 fiber 的 effectTag 为 PLACEMENT 时，表示是新增 fiber，将该节点新增至父节点中。\n    domParent.appendChild(fiber.dom);\n  } else if (fiber.effectTag === \"DELETION\") {\n    // 当 fiber 的 effectTag 为 PLACEMENT 时，表示是删除 fiber，将父节点的该节点删除\n    domParent.removeChild(fiber.dom);\n  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {\n    // 当 fiber 的 effectTag 为 UPDATE 时，表示是更新 fiber，更新 props 属性\n    updateDom(fiber.dom, fiber.alternate.props, fiber.props);\n  } // 渲染子节点\n\n\n  commitWork(fiber.child); // 渲染兄弟节点\n\n  commitWork(fiber.sibling);\n}\n/**\n * performUnitOfWork 处理工作单元\n * @param {fiber} fiber\n * @return {nextUnitOfWork} 下一个工作单元\n */\n\n\nfunction performUnitOfWork(fiber) {\n  // 如果 fiber 没有 dom 节点，为它创建一个 dom 节点\n  if (!fiber.dom) {\n    fiber.dom = createDom(fiber);\n  } // 子节点\n\n\n  var elements = fiber.props.children;\n  reconcileChildren(fiber, elements); // 如果有子节点，返回子节点\n\n  if (fiber.child) {\n    return fiber.child;\n  }\n\n  var nextFiber = fiber;\n\n  while (nextFiber) {\n    // 如果有兄弟节点，返回兄弟节点\n    if (nextFiber.sibling) {\n      return nextFiber.sibling;\n    } // 否则继续走 while 循环，直到找到 root。\n\n\n    nextFiber = nextFiber.parent;\n  }\n}\n/**\n * 协调子节点\n * @param {wipFiber} wipFiber\n * @param {elements} fiber 的 子节点\n */\n\n\nfunction reconcileChildren(wipFiber, elements) {\n  // 用于统计子节点的索引值\n  var index = 0; // 上一个兄弟节点\n\n  var prevSibling = null; // oldFiber 可以在 wipFiber.alternate 中找到\n\n  var oldFiber = wipFiber.alternate && wipFiber.alternate.child; // 遍历子节点\n\n  while (index < elements.length || oldFiber != null) {\n    var element = elements[index];\n    var newFiber = null; // fiber 类型是否相同\n\n    var sameType = oldFiber && element && element.type == oldFiber.type; // 如果类型相同，仅更新 props\n\n    if (sameType) {\n      newFiber = {\n        type: oldFiber.type,\n        props: element.props,\n        dom: oldFiber.dom,\n        parent: wipFiber,\n        alternate: oldFiber,\n        effectTag: \"UPDATE\"\n      };\n    } // 当新旧 fiber 类型不同，且有新元素时，创建新 fiber\n\n\n    if (element && !sameType) {\n      newFiber = {\n        type: element.type,\n        props: element.props,\n        dom: null,\n        parent: wipFiber,\n        alternate: null,\n        effectTag: \"PLACEMENT\"\n      };\n    } // 当新旧 fiber 类型不同，且有旧 fiber 时，删除旧 fiber，设置 effectTag 为 DELETION\n\n\n    if (oldFiber && !sameType) {\n      oldFiber.effectTag = \"DELETION\";\n      deletions.push(oldFiber);\n    }\n\n    if (oldFiber) {\n      oldFiber = oldFiber.sibling;\n    } // fiber的第一个子节点是它的子节点\n\n\n    if (index === 0) {\n      wipFiber.child = newFiber;\n    } else if (element) {\n      // fiber 的其他子节点，是它第一个子节点的兄弟节点\n      prevSibling.sibling = newFiber;\n    } // 把新建的 newFiber 赋值给 prevSibling，这样就方便为 newFiber 添加兄弟节点了\n\n\n    prevSibling = newFiber; // 索引值 + 1\n\n    index++;\n  }\n}\n\nvar myReact = {\n  createElement: createElement,\n  render: render\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myReact);\n\n//# sourceURL=webpack://react/./src/script/react.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;