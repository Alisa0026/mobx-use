// 代理模式基本用法

let obj = { name: 1 };

// 当设置值或者获取值，进行一些操作
let proxyObj = new Proxy(obj, {
    set(target, key, value) {
        console.log(target, key, value);
        // target[key] = value; // 不建议这样写
        return Reflect.set(target, key, value);
    },
    get(target, key) {
        console.log(target, key);
        return Reflect.get(target, key);
    }
});

console.log(proxyObj.name);
proxyObj.name = 2;