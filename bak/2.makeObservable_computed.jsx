import { observable, makeObservable, computed, autorun } from 'mobx';
class Doubler {
  value // 这里是1
  constructor(value) {
    // this是实例，给value属性指定一个注解叫observable，让实例上的value属性可观察
    // 一般放到类中使用
    makeObservable(this, {
      value: observable,
      double: computed, // 标记为计算属性，访问才计算，不访问不计算，结果会进行缓存，依赖项不改变，用缓存值
    })
    this.value = value
  }

  get double() {
    return this.value * 2 // double是从value中派生出来的
  }
}
// 创建实例传1
const doubler = new Doubler(1);
autorun(() => {
  // 没处理value时，把这里doubler.value改2不会打印2
  console.log(doubler.value);
  console.log(doubler.double);
});
doubler.value = 2;