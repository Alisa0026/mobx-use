// 修饰器
// 修饰器(Decorator)是一个函数，用来修改类的行为

function logger(target) {
    console.log(target);
}
@logger
class Person { }