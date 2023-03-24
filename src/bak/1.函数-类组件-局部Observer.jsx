import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer, Observer } from 'mobx-react';// 用于将组件转换为观察者组件

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

function Child() {
    console.log('child render');
    return <div>Child</div>
}

// 函数组件,如果不想把Child组件也变成观察者组件Observer来包裹需要观察的部分
export default function () {
    return (
        <div>
            <Observer>
                {() => (
                    // 只响应这部分变化，不影响 Child 组件
                    <>
                        <p>{store.number}</p>
                        <button onClick={store.add}>+</button>
                    </>
                )}
            </Observer>
            <Child />
        </div>
    )
};

/* // 函数组件
export default observer(function () {
    return (
        <div>
            <p>{store.number}</p>
            <button onClick={store.add}>+</button>
        </div>
    )
}); */

// observer 装饰的是整个组件
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
export default Counter */