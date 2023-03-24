// 就是一个标识
export const $mobx = Symbol("mobx administration")

// 判断对象
export function isObject(value) {
    return value !== null && typeof value === "object"
}

let mobxGuid = 0;
export function getNextId() {
    return ++mobxGuid // 用一次加一次
}
// object对象, propName属性, value值
export function addHiddenProp(object, propName, value) {
    // 给对象object添加属性propName，值为value
    Object.defineProperty(object, propName, {
        enumerable: false,// 不可枚举
        writable: true,// 可改
        configurable: false,//不可配置
        value
    })
}

// 拿到对象的管理器
export function getAdm(target) {
    return target[$mobx]
}

export const globalState = {
    pendingReactions: [],
    trackingDerivation: null
}