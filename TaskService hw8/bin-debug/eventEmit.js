var eventEmit = (function () {
    function eventEmit() {
        this.ObserverList = []; //观察者列表
        this.taskList = {}; //任务列表
    }
    var d = __define,c=eventEmit,p=c.prototype;
    p.notify = function () {
    };
    p.addObserver = function (observer) {
    };
    p.addTask = function (task) {
    };
    return eventEmit;
}());
egret.registerClass(eventEmit,'eventEmit');
//# sourceMappingURL=eventEmit.js.map