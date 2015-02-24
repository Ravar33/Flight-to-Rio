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
			"location": location
		};

		this.setup();
	}

	var p = createjs.extend(Hud, createjs.Container);

	p.setup = function() {

		// this.player = new createjs.Shape();
		// this.player.graphics.beginFill("orange").drawRect(0, 0, 20, 20);
		// this.player.regX = 10;
		// this.player.regY = 10;

		// this.addChild(this.player);
	};

	window.Hud = createjs.promote(Hud, "Container");

}());