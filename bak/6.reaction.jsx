import { observable, computed, autorun, action, flow, makeAutoObservable, reaction } from 'mobx';
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
}
// 创建实例传1
const doubler = new Doubler(1);

// 不会立刻执行，只会在值发生变化后执行
reaction(
  () => doubler.value,// data函数，会返回一个值
  (value, previousValue) => console.log('reaction', value, previousValue)// 副作用函数，会返回两个值
)
doubler.value = 2
doubler.age = 2 // 改age不会触发reaction，因为它目前依赖的是value