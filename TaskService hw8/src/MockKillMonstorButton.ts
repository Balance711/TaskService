class MockKillMonstorButton extends egret.DisplayObjectContainer {
	private Monster: egret.Bitmap;
	public _stage: any;
	private sceneService: SceneService;
	private monsterNumber: number;
	private textField: egret.TextField;
	
	public constructor(Monster: egret.Bitmap, _sceneService: SceneService, monsternumber: number) {
		super();
		var i: number = 0;
		this.Monster = Monster
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
		this.Monster.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			var task = SceneService.sceneService.getTaskbyCustomRole(this._rule);
			if (task != null) {
				task.condition.onAccept(task);
				i++;
				this.textField.text = "怪物已经被杀死" + i;
				this.textField.textColor = 0xff0000;
				this.textField.textAlign = egret.HorizontalAlign.CENTER;
                this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
				this.sceneService.notify();
			}
		}, this)
	}//
	public _rule = (taskList): Task => {
		for (let taskid in taskList) {
			if (taskList[taskid].status == TaskStatus.DURING && taskList[taskid].monsterNumber == this.monsterNumber) {
				return taskList[taskid];
			}
		}
		return null;
	}
}