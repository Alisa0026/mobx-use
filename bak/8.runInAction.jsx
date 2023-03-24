import { observable, reaction, computed, autorun, action, flow, makeAutoObservable, runInAction } from 'mobx';
class Doubler {
  value // 这里是1
  age = 100
  constructor(value) {
    //  PI 可以特殊处理，,{autoBind:true} 自动绑定this永远是true
    makeAutoObservable(this, { PI: false }, { autoBind: true })
    this.value = value
  }

  get double() {
    return this.value * 2 // double是从value中派生出来的
  }
  // action 有很多好处：
  // 1.action的内部会使用事务机制，2.只在action修改状态，好排查错误
  add() {
    this.value++
    this.value++
  }

  async fetch1() {
    let amount = await new Promise((resolve) => setTimeout(() => resolve(5), 1000))
    this.value += amount
  }

  // 实现异步用yield，没有传染性，不会影响其他代码
  // 所以 flow 是 async / await 的一个替代方案
  *fetch() {// 类似redux-saga
    const amount = yield new Promise((resolve) => setTimeout(() => resolve(5), 1000))
    this.value += amount;
  }
}
// 创建实例传1
const doubler = new Doubler(1);

// autorun会打印5次
autorun(() => console.log(doubler.value)); // 1 5
// 如果我想合并用 runInAction
runInAction(() => {
  doubler.value++;//2
  doubler.value++;//3
  doubler.value++;//4
  doubler.value++;//5
})