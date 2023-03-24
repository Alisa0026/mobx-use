# Mobx 
[mobx](https://mobx.js.org/README.html)
[中文](https://zh.mobx.js.org/README.html)

项目使用的 mobx6.x，不过6.x 以后不推荐使用装饰器，因为装饰器不稳定

```
npm install @babel/core @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties

npm install mobx mobx-react
```

### 使用装饰器有个报错：
> 对修饰器的实验支持功能在将来的版本中可能更改。在 "tsconfig" 或 "jsconfig" 中设置 "experimentalDecorators" 选项以删除此警告

创建 jsconfig.json 文件，添加如下内容：
```
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## observable
- 用法: observable(source, overrides?, options?)
- observable注解可以作为一个函数进行调用，从而一次性将整个对象变成可观察的。 source对象将会被克隆并且所有的成员都将会成为可观察的
- 由 observable 返回的对象将会使用 Proxy 包装，这意味着之后被添加到这个对象中的属性也将被侦测并使其转化为可观察对象

## reactions
reactions的目的是对自动发生的副作用进行建模。 它们的意义在于为你的可观察状态创建消费者，以及每当关联的值发生变化时，自动运行副作用

# [mobx-react](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react)

- [mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite)

## 用法：src/bak下的代码
- observer：对函数组件和class组件中的使用
- <Observer>：是一个React组件，它将观察者应用于组件中的匿名区域。可以只包裹想被观察的部分，而不是整个组件
- useObserver：[已废弃]允许您使用类似观察者的行为，但仍然允许您以任何方式优化组件（例如，使用自定义areEqual的memo，使用forwardRef等），并准确声明观察到的部分（渲染阶段）
- useLocalObservable：返回对象的所有属性都将自动可观察，getter将转换为计算属性，方法将绑定到存储并自动应用mobx事务


# 实现一个todoList
具体代码看 App.jsx 、store和components文件夹

# mobx 实现

## 基础知识
### Reflect
- set: 静态方法 Reflect.set() 工作方式就像在一个对象上设置一个属性
  ```js
  Reflect.set(target, propertyKey, value)
  ```
- get:Reflect.get()方法与从 对象 (target[propertyKey]) 中读取属性类似，但它是通过一个函数执行来操作的。
  ```js
  Reflect.get(target, propertyKey)
  ```
### Proxy

```js
let obj ={name:'123'};

let proxyObj = new Proxy(obj,{
  set(target,key,value){
    console.log(target,key,value);
    return Reflect.set(target,key,value);
  },
  get(target,key){
    console.log(target,key);
   return Reflect.get(target,key);
  }
});

console.log(proxyObj.name);
proxyObj.name = '567';
```

### decorator
```js
function logger(target) {
    console.log(target);
}

@logger
class Person {}
```

## 实现 observable 流程：
看 mobx 下 observableobject.jsx 文件内容：
> - 前3步看图img/1.ObservableObjectAdministration.jpg 把普通对象变成代理对象，以及和管理器ObservableObjectAdministration的关系
> - 后2步看图img/2.extendObserble.jpg 扩展属性

1. 先创建空的代理对象（{}的代理对象），然后再给代理对象添加属性（就是原始对象的属性 {name:1,age:2}中的name,age）
2. 如何把普通对象变成代理对象？（asDynamicObservableObject方法中）给target配置管理器，创建adm，然后给target加$mobx属性等于管理器
3. 然后基于target 去new 一个代理Proxy对象，然后把代理对象返回。也就是 dynamicObservableObject
4. 然后给 proxy添加属性，extendObservable方法来添加。循环属性把key和属性表述器传给 adm.extend，给代理对象扩展属性。然后走到 defineObservableProperty 方法中。
5. defineObservableProperty 中创建新的属性描述器，给target添加属性，真正的value值是放到 ObservableValue 实例中的。描述器的get/set方法最终也是调用管理器的 getObservablePropValue 和 setObservablePropValue 方法，最终会操作values中的 observableValue，取值也是从 observableValue 中取，赋值给 observableValue 赋值。