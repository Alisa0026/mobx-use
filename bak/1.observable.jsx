/*function logger() {
  console.log('logger');
}

// 对修饰器的实验支持功能在将来的版本中可能更改。在 "tsconfig" 或 "jsconfig" 中设置 "experimentalDecorators" 选项以删除此警告
@logger
class Person {

}
*/
import { observable, autorun } from 'mobx';
let obj = { name: '1' }
// 把普通对象变成一个可观察对象(代理对象)
let proxyObj = observable(obj);
// console.log(proxyObj);
// 通过autorun来创建一个响应，以后每当依赖的可观察值发生变化后都会重新执行
autorun(() => {
  // 读取代理属性，name属性发生变化会重新执行
  console.log(proxyObj.name);
})
proxyObj.name = '2';// 这样改会报警告，要通过action来改