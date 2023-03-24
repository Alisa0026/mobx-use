import {isObject} from './utils';
import {object} from './observableobject';

// 这里类型可能是数组，map，set，每种数据类型代理的方式不一样，所以这里需要判断类型
function createObservable(v) {
    // 先实现对象的
    if (isObject(v)) {
        return object(v)
    }
}
export default createObservable;