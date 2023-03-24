import todoStore from "./todos";
import userStore from "./user";

// 这里是类的实例
const store = { todoStore, userStore };

// 这里导出的是类
export { default as TodoStore } from "./todos/todo";
export default store;