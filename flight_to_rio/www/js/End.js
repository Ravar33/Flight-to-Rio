/*
* 
* 	End.js
* 
* 	Created by Dries Van Schevensteen on 26/02/15.
*
*/

$(function(){
	console.log('End loaded');

	$("#player").delay(800).animate({ bottom: "20px"}, "slow");

	$("#info").html("Nice, finished level " + getUrlVars()['level'] + ", your score is: " + getUrlVars()['score']);

	console.log(getUrlVars()['level']);
	playSound(woohoo);
	function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}
	
});