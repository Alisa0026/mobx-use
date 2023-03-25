import React from 'react';
import { makeAutoObservable } from 'mobx';
import { useObserver } from './mobx-react';

class Store {
    number = 1
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    add() {
        this.number++;
    }
}
let store = new Store();

export default function () {
    return useObserver(() => (
        <div>
            <p>{store.number}</p>
            <button onClick={store.add}>+</button>
        </div>
    ));
};