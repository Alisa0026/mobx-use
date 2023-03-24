# Mobx 
[mobx](https://mobx.js.org/README.html)
[中文](https://zh.mobx.js.org/README.html)

项目使用的 mobx6.x，不过6.x 以后不推荐使用装饰器

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

