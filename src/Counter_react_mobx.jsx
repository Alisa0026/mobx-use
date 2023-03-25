import React from 'react';
import { makeAutoObservable } from 'mobx';
import { useObserver, Observer, observer, useLocalObservable } from './mobx-react';

/* class Store {
    number = 1
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    add() {
        this.number++;
    }
}
let store = new Store(); */

// 1.使用 useObserver
/* export default function () {
    return useObserver(() => (
        <div>
            <p>{store.number}</p>
            <button onClick={store.add}>+</button>
        </div>
    ));
}; */

// 2.使用 Observer 组件
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

// 3. observer 是高阶组件，接收函数组件返回新组件
/* export default observer(function () {
    return (
        <div>
            <p>{store.number}</p>
            <button onClick={store.add}>+</button>
        </div>
    )
});   */

// 4. 类组件用装饰器
/* @observer
class Counter extends React.Component {
    render() {
        return (
            <div>
                <p>{store.number}</p>
                <button onClick={store.add}>+</button>
            </div>
        )
    }
}
// 装饰器那个等价于 export default observer(Counter)
export default Counter; */

// 5. store 变成局部的
export default function (props) {
    // 接收一个函数，返回一个对象，对象会变成可观察的
    const store = useLocalObservable(() => ({
        number: 1,
        add() {
            this.number++;
        }
    }));

    return useObserver(() => (
        <div>
            <p>{store.number}</p>
            <button onClick={store.add}>+</button>
        </div>
    ));
};