/*function loadSound() {
	createjs.Sound.registerSound("../sounds/screams/scream_falsetto.mp3", "scream_falsetto");
	createjs.Sound.registerSound("../sounds/screams/crowdaahh.mp3", "crowdaahh");
	console.log("sound loaded");
}

function playSound(soundID) {
	createjs.Sound.play(soundID);
	console.log("sound played");
}*/



function playSound(soundID) {
  //createjs.Sound.play(soundID);
  document.getElementById(soundID).load();
  document.getElementById(soundID).play();
  
  console.log("sound played");
}

