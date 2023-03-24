import { observable, makeObservable, computed, autorun, action, flow } from 'mobx';
class Doubler {
  value // 这里是1
  constructor(value) {
    // this是实例，给value属性指定一个注解叫observable，让实例上的value属性可观察
    // 一般放到类中使用
    makeObservable(this, {
      value: observable,
      double: computed, // 标记为计算属性，访问才计算，不访问不计算，结果会进行缓存，依赖项不改变，用缓存值
      add: action,
      // fetch: flow
      fetch: flow.bound //自动绑this指针，不论在哪执行，this永远指向当前实例
    })
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
autorun(() => {
  // 没处理value时，把这里doubler.value改2不会打印2
  console.log(doubler.value);
});

// doubler.fetch();
// 下面直接这样是不可以的，需要flow.bound下
const fetch = doubler.fetch;
fetch()