/*
* 
* 	game.js
* 
* 	Created by Dries Van Schevensteen on 23/02/15.
*
*/

(function() {

	var multiplier, cannon;

	function init() {

		console.log('init CreateJS');

		stage = new createjs.Stage("gameCanvas");

		createjs.Ticker.on("tick", tick);
		createjs.Ticker.setFPS(30);

		createjs.Touch.enable(stage);

		stage.on("stagemousemove", mouseMove);
		stage.on("stagemouseup", stageMouseUp);

		stage.canvas.width = $(window).width();
		stage.canvas.height = $(window).height();
		console.log(stage.canvas.height, stage.canvas.width);

		multiplier = new Multiplier(stage.canvas.width, stage.canvas.height, 10, 20, 30); 
		/* PARAMS MULTIPLIER: stageWidth, stageHeight, xOffset, barWidth, maxPercentage */

		cannon = new Cannon(stage.canvas.width, stage.canvas.height, 50, 10);
		/* PARAMS CANNON: stageWidth, stageHeight, xOffset, yBottomOffset */

		stage.addChild(multiplier, cannon);
	}

	function tick(event) {
		stage.update(event);
	}

	function mouseMove(event) {
		console.log("Finger, move");

		/** Rotate if angle not set yet **/
		if (cannon.canSetAngle) {
			var fingerLocation = {
				"x": event.stageX,
				"y": event.stageY
			}
			var angle = cannon.calculateShootingAngleWithPoint(fingerLocation);
			cannon.rotateShooter(angle, -80, -10);
		};
	}

	function stageMouseUp(event) {

		/** Start or lock multiplier **/
		cannon.canSetAngle = false;
		if (!multiplier.isStarted) multiplier.start();
		else {
			if (!multiplier.isLocked) {
				/* !!SHOOT VOILJANET HERE!! */
				console.log("SHOOT VOILJANET");
				multiplier.lock();
			}
		}

		console.log("Finger, touch up");
	}

	/** Restart to shoot again **/
	function restart() {

		cannon.canSetAngle = true;
		multiplier.restart();
	}

	var app = {

	    initialize: function() {
	        this.bindEvents();

	        console.log("game.js");
	    },

	    bindEvents: function() {
	        document.addEventListener('deviceready', this.onDeviceReady, false);
	    },

	    onDeviceReady: function() {
	        app.receivedEvent('deviceready');
	        console.log("Device is ready!");
	        init();
	    },

	    receivedEvent: function(id) {
	    }
	};

	app.initialize();

}());