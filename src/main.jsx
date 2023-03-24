import { createRoot } from "react-dom/client";
import Counter from "./Counter";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// root.render(<Counter />);
root.render(<App />);


// 可以对源码做个debugger
/* import { observable, autorun } from 'mobx';
let obj = { name: '1' }
debugger
let proxyObj = observable(obj);
debugger
autorun(() => {
    console.log(proxyObj.name);
})
proxyObj.name = '2'; */