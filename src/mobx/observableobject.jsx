import { getNextId, addHiddenProp, $mobx, getAdm } from './utils'
// 可观察值
export class ObservableValue {
    constructor(value) {
        this.value = value; // {name:1} 中的1其实是存在这里的
    }
    get() {
        return this.value;
    }
    setNewValue(newValue) {
        this.value = newValue
    }
}

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
    // key 属性名，descriptor 属性描述器
    extend(key, descriptor) {
        // 定义观察对象属性
        this.defineObservableProperty(key, descriptor.value) // name, 1
    }

    // 定义可观察属性
    defineObservableProperty(key, value) {
        const descriptor = {
            configurable: true, //可配置
            enumerable: true,   //可枚举
            get() {
                return this[$mobx].getObservablePropValue(key)
            },
            set(value) {
                return this[$mobx].setObservablePropValue(key, value)
            }
        }
        // 给this.target定一个key，值是descriptor
        Object.defineProperty(this.target, key, descriptor)
        const observable = new ObservableValue(value)
        this.values.set(key, observable)
    }

    getObservablePropValue(key) {
        return this.values.get(key).get()
    }
    // 设置可观察属性的值
    setObservablePropValue(key, newValue) {
        // 设置值时，会先从 values 中拿到 key 对应的 observable，就是 ObservableValue 这个实例，调用实例的 setNewValue 方法
        const observableValue = this.values.get(key)
        observableValue.setNewValue(newValue)
        return true;
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


// proxyObject是代理对象[是 asDynamicObservableObject 返回的 proxy]，properties是属性
export function extendObservable(proxyObject, properties) {
    // 把属性传入获取属性描述器
    const descriptors = Object.getOwnPropertyDescriptors(properties)
    // 获取空对象{}的管理器实例，
    // 此时会先走 asDynamicObservableObject 返回的 proxy 中 objectProxyTraps 的 get 方法
    // 因为 asDynamicObservableObject 返回的 proxy 里的 target 通过 asObservableObject 绑定了 $mobx 属性指向了管理器实例
    const adm = proxyObject[$mobx]

    // 获取descriptors所有的key
    Reflect.ownKeys(descriptors).forEach(key => {
        // 然后进行扩展
        adm.extend(key, descriptors[key])
    })
    return proxyObject;
}



// 这个方法是重点
// 每个targe都有一个可观察对象管理器 ObservableObjectAdministration (类似每个班都有班长)
export function object(target) {

    // asDynamicObservableObject 可以把空对象{}返回一个动态可观察对象，即空对象的代理对象
    // 为什么创建一个空的代理对象？
    // {home:{name:'beijing'}}
    // 针对嵌套的对象，要进行递归，有个深度deep的过程，如果改造源对象可能造成死循环，从外到内执行，然后把name赋值给home会触发set，导致死循环
    const dynamicObservableObject = new asDynamicObservableObject({});
    // 接下来给空的代理对象进行扩展挂属性
    return extendObservable(dynamicObservableObject, target);
}