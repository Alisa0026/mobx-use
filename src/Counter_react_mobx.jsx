import React from 'react';
import { makeAutoObservable } from 'mobx';
import { useObserver, Observer } from './mobx-react';

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
export default function () {
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
};