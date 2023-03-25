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