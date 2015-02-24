/*
* 
* 	VoilJanet.js
* 
* 	Created by Dries Van Schevensteen on 24/02/15.
*
*/

(function() {

	function VoilJanet(location) {

		this.Container_constructor();

		this.consts = {
			"location": location
		};

		this.setup();
	}

	var p = createjs.extend(VoilJanet, createjs.Container);

	p.setup = function() {

		this.player = new createjs.Shape();
		this.player.graphics.beginFill("orange").drawRect(0, 0, 20, 20);
		this.player.regX = 10;
		this.player.regY = 10;

		/*** JUST AS AN EXAMPLE ***/
		this.player.graphics.beginFill("black").drawRect(-5, 15, 30, 40);
		this.player.graphics.beginFill("black").drawRect(-5, 55, 10, 30);
		this.player.graphics.beginFill("black").drawRect(15, 55, 10, 30);
		this.player.graphics.beginFill("black").drawRect(-5, 15, -20, 10);
		this.player.graphics.beginFill("black").drawRect(25, 15, 20, 10);
		this.player.regY = 65;
		/*** JUST AS AN EXAMPLE ***/

		this.addChild(this.player);
	};

	window.VoilJanet = createjs.promote(VoilJanet, "Container");

}());

