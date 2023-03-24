import React from 'react';
import { makeAutoObservable } from 'mobx';
import { useObserver } from 'mobx-react';// 用于将组件转换为观察者组件

class Store {
    number = 1
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    add() {
        this.number++;
    }
}
// 创建仓库
let store = new Store();

// useObserver[已经废弃了] 允许您使用类似观察者的行为，但仍然允许您以任何方式优化组件（例如，使用自定义areEqual的memo，使用forwardRef等），并准确声明观察到的部分（渲染阶段）
export default function () {
    return useObserver(() => (
        <>
            <p>{store.number}</p>
            <button onClick={store.add}>+</button>
        </>
    ))
};
