import { getNextId } from './utils';
import { Reaction } from './reaction';

// view 是传入的函数,里面可能会渲染组件
function autorun(view) {
    const name = "Autorun@" + getNextId();

    // 每次antorun时，会自动创建一个响应
    const reaction = new Reaction(
        name,
        function () {// 响应触发时执行的函数，里面调用view方法
            // view();
            // 这里不直接调用view，用this.track 跟踪view执行，跟踪view用到的可观察变量
            this.track(view)
        }
    )
    // 进行调度，准备执行一次
    reaction.schedule()
}
export default autorun;