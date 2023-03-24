# Mobx 
[mobx](https://mobx.js.org/README.html)
[中文](https://zh.mobx.js.org/README.html)

项目使用的 mobx6.x，不过6.x 以后不推荐使用装饰器，因为装饰器不稳定

```
npm install @babel/core @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties

npm install mobx mobx-react
```

### 使用装饰器有个报错：
> 对修饰器的实验支持功能在将来的版本中可能更改。在 "tsconfig" 或 "jsconfig" 中设置 "experimentalDecorators" 选项以删除此警告

创建 jsconfig.json 文件，添加如下内容：
```
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

## observable
- 用法: observable(source, overrides?, options?)
- observable注解可以作为一个函数进行调用，从而一次性将整个对象变成可观察的。 source对象将会被克隆并且所有的成员都将会成为可观察的
- 由 observable 返回的对象将会使用 Proxy 包装，这意味着之后被添加到这个对象中的属性也将被侦测并使其转化为可观察对象

## reactions
reactions的目的是对自动发生的副作用进行建模。 它们的意义在于为你的可观察状态创建消费者，以及每当关联的值发生变化时，自动运行副作用