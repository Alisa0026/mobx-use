import { createRoot } from "react-dom/client";
import Counter from "./Counter";
import App from "./App";
import CounterReactMobx from "./Counter_react_mobx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// root.render(<Counter />);
// root.render(<App />);
root.render(<CounterReactMobx />);


// 可以对源码做个debugger
/* import { observable, autorun } from './mobx';// 这里用了自己的库
let obj = { name: '1' }
// debugger
let proxyObj = observable(obj);
console.log(proxyObj);
// debugger
// 创建一个响应器（reaction），其实也就是观察者，负责观察可观察的值
// 响应器会自动执行一次收集依赖，当依赖的值发生变化以后会重新执行响应器
autorun(() => {
    console.log(proxyObj.name);
})
proxyObj.name = '2'; */