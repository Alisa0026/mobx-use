import { makeAutoObservable } from "mobx";


class TodoStore {
    text = "";
    completed = false;

    constructor(text) {
        makeAutoObservable(
            this, {}, { autoBind: true }
        );
        this.text = text;
    }

    toggle() {
        this.completed = !this.completed;
    }
}
// 这导出的是个类
export default TodoStore;