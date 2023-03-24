import { observable, reaction, computed, autorun, action, flow, makeAutoObservable, when } from 'mobx';
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

// 不会立刻执行，只会在值发生变化后执行
/* reaction(
  () => doubler.value,// data函数，会返回一个值
  (value, previousValue) => console.log('reaction', value, previousValue)// 副作用函数，会返回两个值
)
doubler.value = 2
doubler.age = 2 // 改age不会触发reaction，因为它目前依赖的是value */

// 条件满足时执行，只执行1次
let disposer = when(() => doubler.value > 3, () => console.log('when', doubler.value))
doubler.value++;//2
doubler.value++;//3

disposer() // 一旦执行了when返回的方法，则表示取消等待
doubler.value++;//4