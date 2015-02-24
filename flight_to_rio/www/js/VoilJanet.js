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

		console.log(this.player);

		this.addChild(this.player);

		// this.addChild();
	};

	window.VoilJanet = createjs.promote(VoilJanet, "Container");

}());

