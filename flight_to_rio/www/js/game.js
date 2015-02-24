/*
* 
* 	game.js
* 
* 	Created by Dries Van Schevensteen on 23/02/15.
*
*/

(function() {

	var physics, multiplier, cannon, scale, voilJanet, b2voilJanet, angle;

	function init() {

		console.log('init CreateJS');

		var canvas = document.getElementById("gameCanvas");
		canvas.width = $(window).width();
		canvas.height = $(window).height();
		console.log($(window).width(), $(window).height());

	    physics = window.physics = new Physics(canvas);
		
		//physics.debug();

		scale = physics.scale;
		console.log("Scale: " + scale);

	 	physics.stage = new createjs.Stage(canvas);

	 	physics.stage.on("stagemousemove", mouseMove);
		physics.stage.on("stagemouseup", stageMouseUp);

		console.log("Width: " + physics.stage.canvas.width  + " Height: " + physics.stage.canvas.height);

		createjs.Touch.enable(physics.stage);

		// createjs.Ticker.on("tick", tick);
		// createjs.Ticker.setFPS(30);

	    new Body(physics, { type: "static", x: canvas.width/2/scale, y: canvas.height/scale, height: 10/scale,  width: canvas.width/scale , name:"floor" });
	    new Body(physics, { type: "static", x: 0, y: canvas.height/2/scale, height: canvas.height/scale,  width: 10/scale , name:"left_wall" });

		// var test = new Body(physics, { x: 260/scale, y: 160/scale, shape: "circle", radius: 15/scale, name:"ball" });
		// test.CreateFixture({"density" : 100});

		multiplier = new Multiplier(physics.stage.canvas.width, physics.stage.canvas.height, 10, 20, 30); 
		// PARAMS MULTIPLIER: stageWidth, stageHeight, xOffset, barWidth, maxPercentage 

		cannon = new Cannon(physics.stage.canvas.width, physics.stage.canvas.height, 50, 10);
		// PARAMS CANNON: stageWidth, stageHeight, xOffset, yBottomOffset 

		physics.stage.addChild(multiplier, cannon);

		requestAnimationFrame(gameLoop);
	}

	function mouseMove(event) {
		console.log("Finger, move");

		/** Rotate if angle not set yet **/
		if (cannon.canSetAngle) {
			var fingerLocation = {
				"x": event.stageX,
				"y": event.stageY
			}
			angle = cannon.calculateShootingAngleWithPoint(fingerLocation);
			cannon.rotateShooter(angle, -80, -10);
		};
		if (!multiplier.isStarted) multiplier.start();
	}

	function stageMouseUp(event) {

		// console.log(event);

		/** Start or lock multiplier **/
		cannon.canSetAngle = false;
		if (!multiplier.isStarted) multiplier.start();
		else {
			if (!multiplier.isLocked) {

				var location = cannon.getLocationToShootFrom();
				console.log(location);

				voilJanet = new VoilJanet(location);

				physics.stage.addChild(voilJanet);

							
				b2voilJanet = new Body(physics, { x: location.x/scale, y: location.y/scale, shape: "block", name:"ball" , width: 8, height: 3 });				
				
				var Shootingpower = multiplier.ReturnPowerLevel(10); //Function variable multiplies current height of powerbar with the number (in dit geval maal 10)
				console.log("shootingpower = " + Shootingpower);
				//console.log(event.stageX/scale);
				
				b2voilJanet.body.ApplyImpulse(new b2Vec2(Math.cos(angle * (Math.PI / 180)) * Shootingpower,Math.sin(angle * (Math.PI / 180)) * Shootingpower),b2voilJanet.body.GetWorldCenter());
				
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

	/* Box2D */

	Physics.prototype.step = function(dt) {

		// console.log("step");

		this.dtRemaining += dt;

	    while (this.dtRemaining > this.stepAmount) {
	        this.dtRemaining -= this.stepAmount;
	        this.world.Step(this.stepAmount, 8 /*velocity iterations*/, 3 /*position iterations*/);
	    }

		if (this.debugDraw) this.world.DrawDebugData();
		else { 
		    var obj = this.world.GetBodyList();
		    while (obj) {
		    	body = obj.GetUserData();
		        if (body) body.draw(this.context);
		        obj = obj.GetNext();
		    }
		    physics.stage.update();
		}

		if (voilJanet) {
			voilJanet.player.x = b2voilJanet.body.m_xf.position.x*scale;
			voilJanet.player.y = b2voilJanet.body.m_xf.position.y*scale;

			//console.log(voilJanet.player.x, b2voilJanet.body.m_xf.position.x);
		}

	};

	Body.prototype.draw = function(context) {

		// console.log("draw");
	};

	var lastFrame = new Date().getTime();
	
	window.gameLoop = function() {

	    var time = new Date().getTime();

	    var dt = (time - lastFrame) / 1000;
	    if(dt > 1/15) dt = 1/15;

	    requestAnimationFrame(gameLoop);
	    physics.step(dt);

	    lastFrame = time;
	};

	/* End of Box2D */

	var app = {

	    initialize: function() {
	        
	        this.bindEvents();

	        // init();

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
	
	init();

}());