/*
* 
* 	Cannon.js
* 
* 	Created by Dries Van Schevensteen on 23/02/15.
*
*/

(function() {

	var shooter, shooterHandle, shooterBitmap;

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

		var bitmapBase = new createjs.Bitmap("img/cannon_wheel.png");
		bitmapBase.regX = 0;
		bitmapBase.regY = 0;
		bitmapBase.x = this.consts.xOffset;
		bitmapBase.y = this.consts.stageHeight - this.consts.yBottomOffset - 44;
		bitmapBase.scaleX = bitmapBase.scaleY = 1;

		shooter = new createjs.Shape();
		shooter.graphics.beginFill("blue").drawRect(0, -10, 90, 20);
		shooter.rotation = -45;
		shooter.regX = 0; 
		shooter.regY = 0;
		shooter.x = this.consts.xOffset + 20;
		shooter.y = this.consts.stageHeight - this.consts.yBottomOffset - 20;
		
		shooterBitmap = new createjs.Bitmap("img/cannon_body.png");
		shooterBitmap.regX = 32;
		shooterBitmap.regY = 164;
		shooterBitmap.rotation = 45;
		shooterBitmap.x = this.consts.xOffset + 20;
		shooterBitmap.y = this.consts.stageHeight - this.consts.yBottomOffset - 20;
		shooterBitmap.scaleX = shooterBitmap.scaleY = .5;

		shooterHandle = {
			"x": shooter.x,
			"y": shooter.y
		}

		this.addChild(bitmapBase, shooterBitmap);
	};

	p.rotateShooter = function(angle, min, max) {

		if (angle >= min && angle <= max) {
			shooter.rotation = angle;
			shooterBitmap.rotation = angle + 90;
			
		} else if (angle > max) {
			shooter.rotation = max;
			shooterBitmap.rotation = max;
		} else {
			shooter.rotation = min;
			shooterBitmap.rotation = min;
		}
	};

	/** Caculates the angle from an input point with the base point of the cannon **/
	p.calculateShootingAngleWithPoint = function(point, min, max) {

		deltaY = point.y - shooterHandle.y;
		deltaX = point.x - shooterHandle.x;
		var angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
		
		if (angle > max) angle = max;
		else if (angle < min) angle = min;

		return angle;
	};

	p.getLocationToShootFrom = function(){
		var x = shooter.x;
		var y = shooter.y;
		return {
			"x": x, 
			"y": y
		};
	};

	window.Cannon = createjs.promote(Cannon, "Container");

}());

