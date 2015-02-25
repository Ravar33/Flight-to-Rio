/*
* 
* 	Hud.js
* 
* 	Created by Dries Van Schevensteen on 24/02/15.
*
*/

(function() {

	function Hud(stageWidth, stageHeight) {

		this.Container_constructor();

		this.consts = {
			"stageWidth": stageWidth, 
			"stageHeight": stageHeight
		};

		this.setup();
	}

	var p = createjs.extend(Hud, createjs.Container);

	p.setup = function() {

		this.bg = new createjs.Shape();
		this.bg.graphics.beginFill("indianred").drawRect(0, 0, 220, 40);

		this.score = new createjs.Text("Score: 0", "15px HelveticaNeue", "white");

		this.redBull = new createjs.Text("RedBull: 0", "15px HelveticaNeue", "white");

		this.addChild(this.bg, this.redBull, this.score);

		this.restart();
	};

	p.restart = function() {
		this.bg.x = this.consts.stageWidth - 230;
		this.bg.y = 10;

		this.score.x = this.consts.stageWidth - 210;
		this.score.y = 19;

		this.redBull.x = this.consts.stageWidth - 105;
		this.redBull.y = 19;
	};

	window.Hud = createjs.promote(Hud, "Container");

}());