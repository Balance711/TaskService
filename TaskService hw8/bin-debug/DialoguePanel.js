var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(npcId, _stage) {
        var _this = this;
        _super.call(this);
        //	priate
        this.height = 400;
        this.width = 400;
        this.Button_height = 100;
        this.Button_width = 200;
        this._rule = function (taskList) {
            for (var taskid in taskList) {
                if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].condition.fromNpcId == _this.NPCId || taskList[taskid].condition.toNpcId == _this.NPCId)) ||
                    (taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].condition.fromNpcId == _this.NPCId || taskList[taskid].condition.toNpcId == _this.NPCId)) ||
                    taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].condition.fromNpcId == _this.NPCId || taskList[taskid].condition.toNpcId == _this.NPCId)) {
                    console.log("Fromid: " + taskList[taskid].condition.fromNpcId + " toId: " + taskList[taskid].condition.toNpcId);
                    return taskList[taskid];
                }
            }
            return null;
        };
        this._stage = _stage;
        this.wordPanel = new egret.Shape();
        this.wordPanel.graphics.beginFill(0x000000, 0.5);
        this.wordPanel.graphics.drawRect(0, 0, this.width, this.height);
        this.wordPanel.graphics.endFill();
        this.addChild(this.wordPanel);
        this.Button = new egret.TextField();
        this.Button.x = (this.wordPanel.width - this.Button.width) / 2;
        this.Button.y = (this.wordPanel.height - this.Button.height) / 2;
        this.Button.text = "继续";
        this.addChild(this.Button);
        this.textField = new egret.TextField();
        this.textField.y = 100;
        this.addChild(this.textField);
        this.taskField = new egret.TextField();
        this.taskField.y = 20;
        this.addChild(this.taskField);
        this.Button.touchEnabled = true;
        this.NPCId = npcId;
        this.Button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onButtonClick();
        }, this);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.onButtonClick = function () {
        var task = TaskService.taskService.getTaskbyCustomRole(this._rule); //找到当前任务
        var Service = TaskService;
        if (task == null || task.status == TaskStatus.SUBMITTED) {
            task = SceneService.sceneService.getTaskbyCustomRole(this._rule);
            Service = SceneService;
            if (task == null) {
                console.log("没有任务");
            }
        }
        this.onChange(task);
        if (task == null) {
        }
        else if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this.NPCId) {
            if (Service == SceneService) {
                SceneService.sceneService.accept(task.id);
                SceneService.sceneService.notify();
            }
            else if (Service == TaskService) {
                TaskService.taskService.accept(task.id);
                TaskService.taskService.notify();
            }
        }
        else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this.NPCId) {
            if (Service == SceneService) {
                SceneService.sceneService.notify();
            }
            else if (Service == TaskService) {
                console.log("调用taskservice");
                task.condition.onAccept(task);
                TaskService.taskService.notify();
            }
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this.NPCId) {
            task.condition.onSubmit(task);
        }
        this._stage.removeChild(this);
    };
    p.setTextField = function (text) {
        this.textField.text = text;
    };
    p.setTaskFiled = function (text) {
        this.taskField.text = text;
    };
    p.onChange = function (task) {
        if (task.status == TaskStatus.UNACCEPTABLE) {
            return;
        }
        else if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this.NPCId) {
            this.textField.text = "任务可接受，是否接受？";
            this.Button.text = "接受";
            return 0;
        }
        else if (task.status == TaskStatus.DURING && task.condition.fromNpcId == this.NPCId) {
            this.textField.text = "任务正在进行中，不可交";
            this.Button.text = "退出";
            return 0;
        }
        else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this.NPCId) {
            this.textField.text = "任务正在进行中，可完成";
            this.Button.text = "完成";
            return 0;
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this.NPCId) {
            this.textField.text = "任务正在进行中，可交付";
            this.Button.text = "交付";
            return 0;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this.textField.text = "已完成的任务";
            this.Button.text = "退出";
            return 0;
        }
    };
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel',["Observer"]);
//# sourceMappingURL=DialoguePanel.js.map