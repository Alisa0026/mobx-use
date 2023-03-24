const properties = { name: 1, age: 2 }
// 获取属性描述器
const descriptors = Object.getOwnPropertyDescriptors(properties)

console.log(descriptors);
/* 
返回一个对象，key是属性名，value是属性描述器
{
    name: { value: 1, writable: true, enumerable: true, configurable: true },
    age: { value: 2, writable: true, enumerable: true, configurable: true }
} */