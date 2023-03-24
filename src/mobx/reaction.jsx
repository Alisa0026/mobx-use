import { getNextId, globalState } from './utils';

export class Reaction {
    // 构造函数，name是起的名字,onInvalidate是函数,当观察的变量发生变化时执行的函数
    constructor(name = "Reaction@" + getNextId(), onInvalidate) {
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.observing = []; // 数组，表示它观察到了哪些观察变量
    }

    // 参数fn
    track(fn) {
        // 跟踪的派生 Derivation意思等于 reaction
        globalState.trackingDerivation = this
        // 想在fn执行的时候得到的可观察变量和this建立关联
        fn.call();
        // 执行fn之后重置为null
        globalState.trackingDerivation = null;
        // 绑定依赖
        bindDependencies(this)
    }
    // 调度更新
    schedule() {
        // 把reaction自己先放到一个地方pendingReactions，等待执行
        globalState.pendingReactions.push(this)
        // 运行reactions
        runReactions()
    }

    runReaction() {
        this.onInvalidate();
    }
}

// 这里参数 derivation 就是 reaction
function bindDependencies(derivation) {
    const { observing } = derivation;
    // 把 observing 数组取出，进行遍历，拿到每个observableValue，获取 observableValue 上 observers 观察者的集合，把当前的 reaction 放进去
    observing.forEach(observableValue => {
        observableValue.observers.add(derivation)
    });
}

// 运行等待的响应
export function runReactions() {
    // 取出所有响应器
    const allReactions = globalState.pendingReactions
    let reaction;
    // 循环执行响应器中的runReaction方法
    while (reaction = allReactions.shift()) {
        reaction.runReaction()
    }
}