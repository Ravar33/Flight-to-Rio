/*
* 
* 	End.js
* 
* 	Created by Dries Van Schevensteen on 26/02/15.
*
*/

$(function(){

	console.log('End loaded');

	$("#player").delay(800).animate({ bottom: "20px"}, 1200);

	var level = parseInt(getUrlVars()['level']);
	var imgLink = "img/Aalst.png";
	var subInfo = "You made it from home to Aalst successfully, but… you're not quite there yet!";

	switch(level) {
		case 2:
			imgLink = "img/Airport.png";
			subInfo = "You made it from Aalst to the Airport, off to Rio de Janeiro!";
			break;
		case 3:
			imgLink = "img/crash.png";
			subInfo = "Whoooow, crazy storm out there! You crashed! Get back up and get to Rio!";
			break;
		case 4:
			imgLink = "img/Rio.png";
			subInfo = "JIHAAAAAAAAH! You've made it! Let's party!"
			break;
	}

	$("#levelImg").attr("src", imgLink);

	$("#info").html("Nice, finished level " + getUrlVars()['level'] + ", your score is: " + getUrlVars()['score']);
	$("#subInfo").html(subInfo);

	// console.log(getUrlVars()['level']);

	playSound(woohoo);
	
	function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}
});