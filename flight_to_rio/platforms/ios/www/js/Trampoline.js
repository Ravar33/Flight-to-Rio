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

		this.trampoline = new createjs.Shape();
		this.trampoline.graphics.beginFill("blue").drawRect(this.consts.x, this.consts.y, this.consts.width, this.consts.height);
		this.trampoline.regX = this.consts.width/2;
		this.trampoline.regY = this.consts.height/2;

		var scaleFactor = Math.min(this.consts.width/115, this.consts.height/22);

		this.bitmap = new createjs.Bitmap("img/Trampoline.png");
		
		// this.bitmap.scaleY = this.consts.height/45;
		this.bitmap.regX = 0;
		this.bitmap.regY = this.consts.height/2;
		this.bitmap.x = this.consts.x - this.consts.width/2;
		this.bitmap.y = this.consts.y;
		this.bitmap.scaleX = this.bitmap.scaleY = scaleFactor;

		this.addChild(this.trampoline);
		this.addChild(this.bitmap);
	};

	window.Trampoline = createjs.promote(Trampoline, "Container");

}());