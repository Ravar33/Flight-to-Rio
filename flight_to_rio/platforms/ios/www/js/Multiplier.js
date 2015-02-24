/*
* 
* 	Multiplier.js
* 
* 	Created by Dries Van Schevensteen on 23/02/15.
*
*/

(function() {

	var moverCommand;

	function Multiplier(stageWidth, stageHeight, xOffset, barWidth, maxPercentage) {

		this.Container_constructor();

		this.setupVars();

		var min = stageHeight - 12;

		this.consts = {
			"stageWidth": stageWidth,
			"stageHeight": stageHeight,
			"xOffset": xOffset,
			"barWidth": barWidth,
			"maxPercentage": maxPercentage,
			"mover": {
				"min": min,
				"max": (((stageHeight - 12) - 12) / 100 * maxPercentage)
			}
		};

		console.log(this.consts.mover.min, this.consts.mover.max);

		this.setup();
	}

	var p = createjs.extend(Multiplier, createjs.Container);

	p.setupVars = function() {

		this.isStarted = false;
		this.isLocked = false;
	}

	p.restart = function() {

		this.setupVars();

		moverCommand.h = -1;
	}

	p.setup = function() {

		var bg = new createjs.Shape();
		bg.graphics.beginFill("white").drawRect(this.consts.xOffset, 10, this.consts.barWidth, this.consts.stageHeight - 20);

		var mover = new createjs.Shape();
		mover.graphics.beginFill("indianred")
		moverCommand = mover.graphics.drawRect(this.consts.xOffset + 2, this.consts.mover.min, this.consts.barWidth - 4, -1 /*-this.consts.mover.max*/).command;

		this.addChild(bg, mover);
	};

	/** Start moving the multiplier **/
	p.start = function() {

		this.isStarted = true;

		createjs.Tween.get(moverCommand, { loop: true })
			.to({ h: -this.consts.mover.max }, 900, createjs.Ease.getPowInOut(1))
			.to({ h: -1 }, 1000, createjs.Ease.getPowInOut(1));
	}

	/** Lock multiplier value to current value **/
	p.lock = function() {

		this.isLocked = true;

		var currentHeight = moverCommand.h;
		createjs.Tween.removeTweens(moverCommand);
		moverCommand.h = currentHeight;
		return Math.abs(currentHeight);
	};

	window.Multiplier = createjs.promote(Multiplier, "Container");

}());