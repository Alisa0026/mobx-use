import { observable, makeObservable, computed, autorun, action } from 'mobx';
class Doubler {
  value // 这里是1
  constructor(value) {
    // this是实例，给value属性指定一个注解叫observable，让实例上的value属性可观察
    // 一般放到类中使用
    makeObservable(this, {
      value: observable,
      double: computed, // 标记为计算属性，访问才计算，不访问不计算，结果会进行缓存，依赖项不改变，用缓存值
      add: action
    })
    this.value = value
  }

  get double() {
    return this.value * 2 // double是从value中派生出来的
  }
  // action 有很多好处：
  // 1.action的内部会使用事务机制，2.只在action修改状态，好排查错误
  add() {
    this.value
    this.value
  }
}
// 创建实例传1
const doubler = new Doubler(1);
autorun(() => {
  // 没处理value时，把这里doubler.value改2不会打印2
  console.log(doubler.value);
});

doubler.add();