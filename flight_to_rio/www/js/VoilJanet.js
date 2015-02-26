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

		this.player = new createjs.Bitmap("img/player.png");
		this.player.regX = 20;
		this.player.regY = 70;
		this.player.x = 0;
		this.player.y = 0;
		this.player.scaleX = this.player.scaleY = 1.0;

		this.addChild(this.player);
	};

	window.VoilJanet = createjs.promote(VoilJanet, "Container");

}());

