/*
* 
* 	Obstacle.js
* 
* 	Created by Dries Van Schevensteen on 24/02/15.
*
*/

(function() {

	function Obstacle(x, y, width, height) {

		this.Container_constructor();

		this.consts = {
			"x": x, 
			"y": y,
			"width": width,
			"height": height
		};

		this.setup();
	}

	var p = createjs.extend(Obstacle, createjs.Container);

	p.setup = function() {

		/*this.obstacle = new createjs.Shape();
		this.obstacle.graphics.beginFill("red").drawRect(this.consts.x, this.consts.y, this.consts.width, this.consts.height);
		this.obstacle.regX = this.consts.width/2;
		this.obstacle.regY = this.consts.height/2;*/

		
		
		this.obstacle = new createjs.Bitmap("img/Rock.png");
		this.obstacle.x = this.consts.x -20;
		this.obstacle.y = this.consts.y -20;
		this.obstacle.width = this.consts.width/2;
		this.obstacle.height = this.consts.height/2;
		this.obstacle.regX = this.consts.width/2;
		this.obstacle.regY = this.consts.height/2;
		
		this.addChild(this.obstacle);
	};

	window.Obstacle = createjs.promote(Obstacle, "Container");

}());