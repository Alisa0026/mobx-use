import { getNextId, addHiddenProp, $mobx, getAdm } from './utils'

// 是一个类
class ObservableObjectAdministration {
    constructor(target, values, name) {
        this.target = target;
        this.values = values; // 存放target的属性的信息，属性可以更新
        this.name = name;
    }

    get(key) {
        return this.target[key]
    }
    set(key, value) {
        return this.target[key] = value;
    }
}

function asObservableObject(target) {

    const name = `ObservableObject@${getNextId()}`
    // 创建可观察对象的管理器
    const adm = new ObservableObjectAdministration(
        target, // 对象本身
        new Map(), // 给对象挂的属性
        name // 给管理器起名字
    );
    // 创建后进行关联,给对象挂一个属性$mobx，值是管理器实例
    addHiddenProp(target, $mobx, adm); // 其实是 target[$mobx] = adm;

    // 返回对象本身
    return target
}

// 对象代理捕获器,取值赋值操作
// 代理对象属性都存在管理器的 values 中，想取值先获取adm
// 走代理对象的get/set最终会走管理器的get/set,如下图
// ObservableObjectAdministration ===> target
//          ↑  ↑                         ↑
//          ↑  ↑------------get---------Proxy
//          ↑------------set-------------↓
const objectProxyTraps = {
    get(target, name) {
        // 获取目标对象的管理器,走管理器get方法
        return getAdm(target).get(name)
    },
    set(target, name, value) {
        return getAdm(target).set(name, value);
    }
}

function asDynamicObservableObject(target) {
    // 1. 作为可观察对象，怎么做呢？配管理器
    // 给 target 创建一个管家，让target的 $mobx 属性等于这个管家。见下面图
    // ObservableObjectAdministration ===> target
    //            ↑------------$mobx----------↓
    asObservableObject(target)

    // 接下来要代理
    // objectProxyTraps 对象代理捕获器
    const proxy = new Proxy(target, objectProxyTraps)
    return proxy;
}

// 这个方法是重点
// 每个targe都有一个可观察对象管理器 ObservableObjectAdministration (类似每个班都有班长)
export function object(target) {

    // asDynamicObservableObject 可以把空对象{}返回一个动态可观察对象
    const dynamicObservableObject = new asDynamicObservableObject({});
    console.log(dynamicObservableObject);
    // 目前先没做处理，直接返回
    return target;
}