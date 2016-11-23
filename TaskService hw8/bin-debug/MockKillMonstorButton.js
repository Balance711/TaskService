var MockKillMonstorButton = (function (_super) {
    __extends(MockKillMonstorButton, _super);
    function MockKillMonstorButton(Monster, _sceneService, monsternumber) {
        var _this = this;
        _super.call(this);
        this._rule = function (taskList) {
            for (var taskid in taskList) {
                if (taskList[taskid].status == TaskStatus.DURING && taskList[taskid].monsterNumber == _this.monsterNumber) {
                    return taskList[taskid];
                }
            }
            return null;
        };
        var i = 0;
        this.Monster = Monster;
        this.Monster.touchEnabled = true;
        this.Monster.x = 800;
        this.Monster.y = 250;
        this.x = 800;
        this.y = 250;
        this.sceneService = _sceneService;
        this.monsterNumber = monsternumber;
        this.textField = new egret.TextField();
        this.textField.y = -200;
        this.addChild(this.textField);
        this.Monster.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var task = SceneService.sceneService.getTaskbyCustomRole(_this._rule);
            if (task != null) {
                task.condition.onAccept(task);
                i++;
                _this.textField.text = "怪物已经被杀死" + i;
                _this.textField.textColor = 0xff0000;
                _this.textField.textAlign = egret.HorizontalAlign.CENTER;
                _this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
                _this.sceneService.notify();
            }
        }, this);
    }
    var d = __define,c=MockKillMonstorButton,p=c.prototype;
    return MockKillMonstorButton;
}(egret.DisplayObjectContainer));
egret.registerClass(MockKillMonstorButton,'MockKillMonstorButton');
//# sourceMappingURL=MockKillMonstorButton.js.map