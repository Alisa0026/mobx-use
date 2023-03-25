import React, { useEffect } from 'react';
import { Reaction } from 'mobx';

// 自定义hooks，把函数组件变成响应式的
// fn 可能是函数组件，可能是render函数
export function useObserver(fn) {
    // 仅仅是为了得到一个强行更新组件的函数，调用 forceUpdate 走 setState 会刷新组件
    const [, setState] = React.useState({});
    const forceUpdate = () => setState({});

    // 创建一个响应
    let reaction = new Reaction(`observer`, forceUpdate);

    let rendering
    reaction.track(() => {
        // 执行fn拿到返回的虚拟dom放到track中跟踪依赖
        // 当可观察值发生改变，会重新执行forceUpdate
        rendering = fn();
    });
    return rendering;
}

// Observer 函数组件，children是个render函数，所以直接用 useObserver 把 children 传入即可
export function Observer({ children }) {
    return useObserver(children);
}

// observer 是个高阶组件，oldComponent 用 useObserver 套一下就可以变成响应式
export function observer(oldComponent) {
    // 判断是不是类组件
    if (oldComponent.prototype.isReactComponent) {
        return makeClassComponentObserver(oldComponent);
    }

    // 新的函数组件
    let observerComponent = (props, ref) => {
        return useObserver(() => oldComponent(props, ref));
    };
    return observerComponent;
}

// 重写类组件 render 方法
export function makeClassComponentObserver(classComponent) {
    // 重新类组件的render方法
    const prototype = classComponent.prototype // 获取 prototype
    const originalRender = prototype.render // 获取 render 方法
    // 重写 render 方法
    prototype.render = function () {
        // 先把老方法绑定this
        const boundOriginalRender = originalRender.bind(this)
        // 创建一个响应, 传入一个强制更新的函数,每个类组件都有 forceUpdate 方法
        const reaction = new Reaction(`render`, () => React.Component.prototype.forceUpdate.call(this))
        let rendering;
        // 跟踪函数
        reaction.track(() => {
            // 调用老的 render 方法,然后返回虚拟dom
            rendering = boundOriginalRender();
        })
        return rendering
    }
    return classComponent
}