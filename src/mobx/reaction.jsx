import { getNextId, globalState } from './utils';

export class Reaction {
    // 构造函数，name是起的名字,onInvalidate是函数,当观察的变量发生变化时执行的函数
    constructor(name = "Reaction@" + getNextId(), onInvalidate) {
        this.name = name;
        this.onInvalidate = onInvalidate;
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