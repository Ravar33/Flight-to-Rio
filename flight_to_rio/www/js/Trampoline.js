/*
* 
* 	Trampoline.js
* 
* 	Created by Dries Van Schevensteen on 24/02/15.
*
*/

(function() {

	function Trampoline(stageWidth, stageHeight) {

		this.Container_constructor();

		this.consts = {
			"stageWidth": stageWidth, 
			"stageHeight": stageHeight
		};

		this.setup();
	}

	var p = createjs.extend(Trampoline, createjs.Container);

	p.setup = function() {

		this.trampoline = new createjs.Shape();
		this.trampoline.graphics.beginFill("gray").drawRect(this.consts.stageWidth + 100, this.consts.stageHeight - 40, 100, 40);

		this.addChild(this.trampoline);
	};

	p.move = function(length, moveLeft) {
		this.trampoline.x = (moveLeft) ? this.trampoline.x - length : this.trampoline.x + length;
	}

	window.Trampoline = createjs.promote(Trampoline, "Container");

}());