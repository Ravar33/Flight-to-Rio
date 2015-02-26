/*
* 
* 	game.js
* 
* 	Created by Dries Van Schevensteen on 23/02/15.
*
*/

(function() {

	var physics, multiplier, cannon, hud, scale, voilJanet, b2voilJanet, angle, frameNeedsToMove, gameOver, gameOverTxt, restartBtn, redBull, currentScore, scaleFactor;

	var degToRad = Math.PI / 180;

	function init() {

		frameNeedsToMove = false;
		gameOver = false;
		currentScore = 0;

		redBull = 5;

		var canvas = document.getElementById("gameCanvas");
		canvas.width = $(window).width();
		canvas.height = $(window).height();

	    physics = window.physics = new Physics(canvas);
		
		// physics.debug();

		scale = physics.scale;
		// console.log("Scale: " + scale);

	 	physics.stage = new createjs.Stage(canvas);

	 	physics.stage.on("stagemousemove", mouseMove);
		physics.stage.on("stagemouseup", stageMouseUp);

		// console.log("WINDOW Width: " + $(window).width()  + " Height: " + $(window).height());
		// console.log("STAGE CANVAS Width: " + physics.stage.canvas.width  + " Height: " + physics.stage.canvas.height);

		if ( createjs.Touch.isSupported() ) createjs.Touch.enable(physics.stage);

		new Body(physics, { type: "static", x: canvas.width/2/scale, y: -10/scale, height: 10/scale,  width: canvas.width*10, name:"ceiling" });
	    var ground = new Body(physics, { type: "static", x: canvas.width/2/scale, y: canvas.height/scale, height: 10/scale,  width: canvas.width*10, name:"floor" });
	    ground.body.name = "ground";
	    	/** Cranked up width to prevent voilJanet hitting no ground on an large throw **/
	    new Body(physics, { type: "static", x: 0, y: canvas.height/2/scale, height: canvas.height/scale, width: 10/scale, name: "left_wall" });

		multiplier = new Multiplier(physics.stage.canvas.width, physics.stage.canvas.height, 10, 20, 40); 
			// PARAMS MULTIPLIER: stageWidth, stageHeight, xOffset, barWidth, maxPercentage 

		cannon = new Cannon(physics.stage.canvas.width, physics.stage.canvas.height, 50, 10);
			// PARAMS CANNON: stageWidth, stageHeight, xOffset, yBottomOffset 

		hud = new Hud(physics.stage.canvas.width, physics.stage.canvas.height);
		hud.redBull.text = "RedBull: " + redBull;

		scaleFactor = physics.stage.canvas.height/1242;
		addBackground(10, ["img/Home.png", "img/Levels.png", "img/defaultBG.png", "img/Home.png"]);
		
		physics.stage.addChild(multiplier, cannon, hud);
		playSound("samba_rio");
		
		multiplier.start();

		requestAnimationFrame(gameLoop);
	}

	var bgSize = {
		"width": 2258,
		"height": 1242,
	}

	function addBackground(quantity, imgPathArray) {
		for (var i = 0; i < quantity; i++) {
			var bitmap;
			if (i == 0) bitmap = new createjs.Bitmap(imgPathArray[0]);
			else {
				if (i == quantity - 1) {
					bitmap = new createjs.Bitmap(imgPathArray[imgPathArray.length-1]);
					var rightWall = new Body(physics, { type: "static", x: ((scaleFactor * 2258 * i - (20*i)) + physics.stage.canvas.width/2)/scale, y: physics.stage.canvas.height/2/scale, height: physics.stage.canvas.height/scale, width: 10/scale, name: "end_wall" });
					rightWall.body.name = "right_wall";
				}
				else {
					var randomImgPathIndex = Math.floor((Math.random() * (imgPathArray.length - 2)) + 1);
					bitmap = new createjs.Bitmap(imgPathArray[randomImgPathIndex]);
				}

				bitmap.x = scaleFactor * 2258 * i - (20*i);
			}
			bitmap.scaleX = bitmap.scaleY = scaleFactor;
			physics.stage.addChild(bitmap);	
		}
	}

	function mouseMove(event) {

		// console.log("Finger, move");

		/** Rotate if angle not set yet **/
		if (cannon.canSetAngle) {
			var fingerLocation = {
				"x": event.stageX,
				"y": event.stageY
			}
			angle = cannon.calculateShootingAngleWithPoint(fingerLocation, -80, -10);
			cannon.rotateShooter(angle, -80, -10);
		};
	}

	var prevPos = {
		"x": -1,
		"y": -1
	};

	function stageMouseUp(event) {

		// console.log("Finger, mouse up");

		var curPos = {
			"x": event.stageX,
			"y": event.stageY
		}

		/** Start or lock multiplier **/
		if (!multiplier.isLocked && (
			!createjs.Touch.isSupported() ||
			(createjs.Touch.isSupported() && curPos.x !== prevPos.x) ) ) {

			// console.log('SHOOT');

			multiplier.lock();
			cannon.canSetAngle = false;

			var location = cannon.getLocationToShootFrom();

			voilJanet = new VoilJanet(location);

			physics.stage.addChild(voilJanet);

			b2voilJanet = new Body(physics, { x:location.x/scale, y:location.y/scale, shape:"block", width:2, height:4, name:"ball", friction:0.1});				
			b2voilJanet.body.name = "player";
			
			/** Multiplies current height of powerbar with param **/
			var Shootingpower = multiplier.ReturnPowerLevel(40); 
			// console.log("Shootingpower: " + Shootingpower);
			
			b2voilJanet.body.ApplyImpulse( new b2Vec2(	Math.cos(angle * (Math.PI / 180)) * Shootingpower,
														Math.sin(angle * (Math.PI / 180)) * Shootingpower),
														b2voilJanet.body.GetWorldCenter() );

			b2voilJanet.setPreventRotation = true;
			b2voilJanet.body.SetFixedRotation(true);
			// console.log("Fixed loc: " + b2voilJanet.body.IsFixedRotation());
			
			playSound("scream_falsetto");

			
		} else {

			/** Extra boost **/
	 		console.log("RedBulls left: " + redBull);

			if (!gameOver && redBull !== 0) {
				console.log("Consumed Redbull!");

				doImpulseToPlayer();
				
				redBull --;

				hud.redBull.text = "RedBull: " + redBull;
			}
		}

		if (gameOver) restart();

		prevPos = {
			"x": event.stageX,
			"y": event.stageY
		};
	};

	function doImpulseToPlayer() {

		var angle = -20 * degToRad;
		var impulse = 3000;

		var vector = new b2Vec2( Math.cos(angle) * impulse, Math.sin(angle) * impulse );

		b2voilJanet.body.ApplyImpulse( vector, b2voilJanet.body.GetWorldCenter() );
	}

	/** Restart to shoot again **/
	function restart() {

		console.log('Restart Game');

		window.location.reload();
	}

	/* Box2D */

	Physics.prototype.step = function(dt) {

		// console.log("Physics, step");

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
	};

	var prevX = 0;

	Body.prototype.draw = function(context) {

		// console.log("Physics, draw");

		if (voilJanet) {

			voilJanet.player.x = b2voilJanet.body.m_xf.position.x*scale;
			voilJanet.player.y = b2voilJanet.body.m_xf.position.y*scale;

			currentX = voilJanet.player.x;

			if (frameNeedsToMove || shouldFrameMove(b2voilJanet.body.m_xf.position.x*scale, 30)) {
				
				frameNeedsToMove = true;

				var widthToSubtractFromCurrentStage = (currentX - prevX);

				if (prevX !== 0) {

					physics.stage.x -= widthToSubtractFromCurrentStage;
					hud.bg.x += widthToSubtractFromCurrentStage;
					hud.score.x += widthToSubtractFromCurrentStage;
					hud.redBull.x += widthToSubtractFromCurrentStage;

					if (restartBtn) restartBtn.x += widthToSubtractFromCurrentStage;
				}

				prevX = voilJanet.player.x;

				/** Adds trampoline only if stage is moving **/
				if ( !gameOver && Math.floor((Math.random() * 600) + 1) == 1) {
					// console.log("Add trampoline");

					// console.log("STAGE CANVAS Width: " + physics.stage.canvas.width  + " Height: " + physics.stage.canvas.height);

					var trampolineBounds = {
						"x": physics.stage.canvas.width + Math.abs(physics.stage.x),
						"y": physics.stage.canvas.height - 45/2,
						"width": 472/2,
						"height": 90/2
					};

					var b2trampoline = new Body(physics, { 
													type: "static", 
													x: trampolineBounds.x/scale,
													y: trampolineBounds.y/scale,
													width: trampolineBounds.width/scale,
													height: trampolineBounds.height/scale,
													name: "trampoline" 
												});
					b2trampoline.body.name = "trampoline";

					// console.log("physics.stage.x: " + Math.abs(physics.stage.x));
					// console.log(window.physics);
					// console.log("b2trampoline.width: " + b2trampoline.body.m_xf.position.x);

					var trampoline = new Trampoline( trampolineBounds.x, trampolineBounds.y, trampolineBounds.width, trampolineBounds.height);
					physics.stage.addChild(trampoline);
				}

				/** Adds obstacles to random places on screen **/
				if ( !gameOver && Math.floor((Math.random() * 3500) + 1) == 1) {
					// console.log("Add obstacle");

					// console.log("STAGE CANVAS Width: " + physics.stage.canvas.width  + " Height: " + physics.stage.canvas.height);

					var obstacleBounds = {
						"x": physics.stage.canvas.width + Math.abs(physics.stage.x),
						"y": Math.floor((Math.random() * (physics.stage.canvas.height - 50)) + 30),
						"width": 40,
						"height": 40
					};

					var b2Obstacle = new Body(physics, {
													type: "static", 
													x: obstacleBounds.x/scale,
													y: obstacleBounds.y/scale,
													width: obstacleBounds.width/scale,
													height: obstacleBounds.height/scale
												});
					b2Obstacle.body.name = "obstacle";

					var obstacle = new Obstacle(obstacleBounds.x, obstacleBounds.y, obstacleBounds.width, obstacleBounds.height);
					physics.stage.addChild(obstacle);
				}
			}

			if (!gameOver) hud.score.text = "Score: " + currentScore;

			currentScore = Math.round(voilJanet.player.x/10);


		}	
	};
	
	var shouldFrameMove = function(x, startMovingFromLeftOnXAxisInPercentage) {
		return (physics.stage.canvas.width / 100 * startMovingFromLeftOnXAxisInPercentage) <= x;
	}

	b2ContactListener.prototype.BeginContact = function (contact) {

	    var nameB = contact.GetFixtureB().GetBody().name;
	    var nameA = contact.GetFixtureA().GetBody().name;
	    
	    if (!gameOver) {
		    if ((nameA == "player" && nameB == "trampoline") || 
		    	(nameA == "trampoline" && nameB == "player") ) {

		        console.log("Jump on trampoline");
		    	
		    	doImpulseToPlayer();

		    } else if ((nameA == "player" && nameB == "ground") || 
		       		   (nameA == "ground" && nameB == "player") ||
		       		   (nameA == "player" && nameB == "obstacle") ||
		       		   (nameA == "obstacle" && nameB == "player")) {

		    	console.log("Game Over");
					
				gameOver = true;

				multiplier.isLocked = true;
				playSound("crowdaahh");
				postMoney(parseInt(currentScore));

				restartBtn = new createjs.Text("Game over!\n\nScore: " + currentScore + "\n\nTap anywhere to restart \n\nTotal Amount of money: " + amountOfMoney, "20px HelveticaNeue", "black");
				restartBtn.textAlign = "center";
				restartBtn.lineWidth = 400;
				restartBtn.x = physics.stage.canvas.width/2 + Math.abs(physics.stage.x);
				restartBtn.y = physics.stage.canvas.height/2 - restartBtn.getBounds().height/2;
				physics.stage.addChild(restartBtn);

				// console.log(physics.stage.canvas.width, Math.abs(physics.stage.x));

				hud.score.text = "Score: " + currentScore;
				

		    } else if ((nameA == "player" && nameB == "right_wall") || 
		    			(nameA == "right_wall" && nameB == "player") ) {
		    	console.log("PLAY END ANIMATION");
		    }
		}
	}

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

	        console.log("game.js");
	    },

	    bindEvents: function() {
	        document.addEventListener('deviceready', this.onDeviceReady, false);
	    },

	    onDeviceReady: function() {

	        app.receivedEvent('deviceready');
	        console.log("Device is ready!");
	        
	        // init();
	    },

	    receivedEvent: function(id) {
	    }
	};

	app.initialize();
	
	init();

}());