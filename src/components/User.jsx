import { useContext, useRef } from 'react';
import StoreContext from '../context';
import { observer } from "mobx-react";

// 用context，store变了，不用频繁修改组件
// useContext 作用：
// 通过 context 可以从顶层组件跨层级传递数据
const User = observer(() => {
    const { userStore } = useContext(StoreContext);
    const { username, isLogin, login, logout } = userStore;

    const ref = useRef(null);

    return (
        <div>
            <h1>用户</h1>
            {isLogin ? (
                <>
                    <p>用户名：{username}</p>
                    <button onClick={logout}>退出</button>
                </>
            ) : (
                <>
                    <input ref={ref} type="text" />
                    <button onClick={() => login(ref.current.value)}>登录</button>
                </>
            )}
        </div>
    );
})

export default User;