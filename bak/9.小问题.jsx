import { autorun, observable, toJS } from "mobx";

let obj = { person: { name: 'zhangsan' } };
// 把对象传给observable，它的每个属性也会自动变成代理对象
const proxyObj = observable(obj)

const { person } = proxyObj
const { name } = proxyObj.person  // 基本类型值是不会处理的

// 可以通过 toJS 把代理对象转成普通对象
const clonePerson = toJS(person)

autorun(() => {
    console.log(clonePerson.name);
    console.log(person.name);
    console.log(name);
})

proxyObj.person.name = '2'

