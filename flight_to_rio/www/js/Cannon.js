/*
* 
* 	Cannon.js
* 
* 	Created by Dries Van Schevensteen on 23/02/15.
*
*/

(function() {

	var shooter, shooterHandle;

	function Cannon(stageWidth, stageHeight, xOffset, yBottomOffset) {

		this.Container_constructor();

		this.canSetAngle = true;

		this.consts = {
			"stageWidth": stageWidth,
			"stageHeight": stageHeight,
			"xOffset": xOffset, 
			"yBottomOffset": yBottomOffset
		};

		this.setup();
	}

	var p = createjs.extend(Cannon, createjs.Container);

	p.setup = function() {

		var base = new createjs.Shape();
		base.graphics.beginFill("blue").drawRect(this.consts.xOffset, this.consts.stageHeight - this.consts.yBottomOffset, 30, -30);

		shooter = new createjs.Shape();
		shooter.graphics.beginFill("blue").drawRect(0, -10, 90, 20);
		shooter.rotation = -45;
		shooter.regX = 0; 
		shooter.regY = 0;
		shooter.x = this.consts.xOffset + 20;
		shooter.y = this.consts.stageHeight - this.consts.yBottomOffset - 20;

		shooterHandle = {
			"x": shooter.x,
			"y": shooter.y
		}

		this.addChild(base, shooter);
	};

	p.rotateShooter = function(angle, min, max) {

		if (angle >= min && angle <= max) shooter.rotation = angle;
		else if (angle > max) shooter.rotation = max;
		else shooter.rotation = min;
	};

	/** Caculates the angle from an input point with the base point of the cannon **/
	p.calculateShootingAngleWithPoint = function(point) {

		deltaY = point.y - shooterHandle.y;
		deltaX = point.x - shooterHandle.x;
		var angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
		console.log("calculateShootingAngleWithPoint: " + angle);
		return angle;
	};

	window.Cannon = createjs.promote(Cannon, "Container");

}());

