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
// 把普通对象变成代理对象
let proxyObj = observable(obj);
console.log(proxyObj);