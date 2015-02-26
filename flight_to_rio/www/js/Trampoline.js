/*
* 
* 	Trampoline.js
* 
* 	Created by Dries Van Schevensteen on 24/02/15.
*
*/

(function() {

	function Trampoline(x, y, width, height) {

		this.Container_constructor();

		this.consts = {
			"x": x, 
			"y": y,
			"width": width,
			"height": height
		};

		this.setup();
	}

	var p = createjs.extend(Trampoline, createjs.Container);

	p.setup = function() {

		// this.trampoline = new createjs.Shape();
		// this.trampoline.graphics.beginFill("blue").drawRect(this.consts.x, this.consts.y, this.consts.width, this.consts.height);
		// this.trampoline.regX = this.consts.width/2;
		// this.trampoline.regY = this.consts.height/2;

		var scaleFactor = Math.min(this.consts.width/115, this.consts.height/22);
		
		this.trampoline = new createjs.Bitmap("img/Trampoline.png");
		this.trampoline.regX = 0;
		this.trampoline.regY = this.consts.height/2;
		this.trampoline.x = this.consts.x - this.consts.width/2 - 10;
		this.trampoline.y = this.consts.y;
		this.trampoline.scaleX = this.trampoline.scaleY = .5;
		
		this.addChild(this.trampoline);
	};

	window.Trampoline = createjs.promote(Trampoline, "Container");

}());