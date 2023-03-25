import React from 'react';
import { makeAutoObservable } from 'mobx';
import { useObserver, Observer, observer } from './mobx-react';

class Store {
    number = 1
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    add() {
        this.number++;
    }
}
let store = new Store();

// 使用 useObserver
/* export default function () {
    return useObserver(() => (
        <div>
            <p>{store.number}</p>
            <button onClick={store.add}>+</button>
        </div>
    ));
}; */

// 使用 Observer 组件
/* export default function () {
    return (
        <Observer>
            {
                () => (
                    <div>
                        <p>{store.number}</p>
                        <button onClick={store.add}>+</button>
                    </div>
                )
            }
        </Observer>
    )
}; */

// observer 是高阶组件，接收函数组件返回新组件
export default observer(function () {
    return (
        <div>
            <p>{store.number}</p>
            <button onClick={store.add}>+</button>
        </div>
    )
});  