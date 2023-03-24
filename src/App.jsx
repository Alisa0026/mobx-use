import React from "react";
import store from "./store";//仓库可以有多个
import StoreContext from './context';
import User from './components/User';
import Todos from './components/Todos';

const App = () => {
    return (
        <StoreContext.Provider value={store}>
            <User />
            <hr />
            <Todos />
        </StoreContext.Provider>
    );
};
export default App;