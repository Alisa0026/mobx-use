import React from 'react';
import { makeAutoObservable } from 'mobx';
import { useLocalObservable, useObserver } from 'mobx-react';// 用于将组件转换为观察者组件


/* class Store {
    number = 1
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    add() {
        this.number;
    }
}
// 创建仓库
let store = new Store(); */

// useLocalObservable 就不需要仓库了
export default function () {
    // 局部可观察对象，外面不需要了
    const store = useLocalObservable(() => ({
        number: 1,
        add() {
            this.number++;
        }
    }));

    return useObserver(() => (
        <>
            <p>{store.number}</p>
            <button onClick={store.add}>+</button>
        </>
    ))
};
