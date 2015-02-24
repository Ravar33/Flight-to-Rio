/*
* 
* 	VoilJanet.js
* 
* 	Created by Dries Van Schevensteen on 24/02/15.
*
*/

(function() {

	function VoilJanet() {

		this.Container_constructor();

		this.consts = {
		};

		this.setup();
	}

	var p = createjs.extend(VoilJanet, createjs.Container);

	p.setup = function() {

		// this.addChild();
	};

	window.VoilJanet = createjs.promote(VoilJanet, "Container");

}());

