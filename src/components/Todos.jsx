import { useContext, useRef } from 'react';
import StoreContext from '../context';
import { observer } from "mobx-react";
import { TodoStore } from '../store';

// 未完成todo
const TodoStatus = observer(function () {
    const { todoStore } = useContext(StoreContext);
    return <>未完成: {todoStore.unCompletedCount}</>;
});

const Todo = observer(function ({ todo }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => todo.toggle()}
            />
            {todo.text}
        </li>
    );
});

const TodoList = observer(function () {
    const { todoStore } = useContext(StoreContext);
    return (
        <div>
            <ul>
                {todoStore.list.map((todo, index) => (
                    <Todo todo={todo} key={index} />
                ))}
            </ul>
        </div>
    );
});


// 添加todo，observer只能管一层，管多层要写多次
const AddTodo = observer(function AddTodo() {
    // 通过useContext拿到store
    const { todoStore } = useContext(StoreContext);
    const ref = useRef(null);

    return (
        <>
            <input ref={ref} type="text" />
            <button
                onClick={() => {
                    const todo = new TodoStore(ref.current.value);
                    todoStore.add(todo);
                    ref.current.value = "";
                }}
            >新增TODO</button>
        </>
    );
});


export default observer(function () {
    return (
        <>
            <AddTodo />
            <TodoList />
            <TodoStatus />
        </>
    );
});