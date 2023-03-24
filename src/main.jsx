/* import { createRoot } from "react-dom/client";
import Counter from "./Counter";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// root.render(<Counter />);
root.render(<App />); */


// 可以对源码做个debugger
import { observable } from './mobx';// 这里用了自己的库
let obj = { name: '1' }
// debugger
let proxyObj = observable(obj);
console.log(proxyObj);
// debugger
// 创建一个响应器，其实也就是观察者，负责观察可观察的值
/* autorun(() => {
    console.log(proxyObj.name);
})
proxyObj.name = '2'; */