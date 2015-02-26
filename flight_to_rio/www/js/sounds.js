/*function loadSound() {
	createjs.Sound.registerSound("../sounds/screams/scream_falsetto.mp3", "scream_falsetto");
	createjs.Sound.registerSound("../sounds/screams/crowdaahh.mp3", "crowdaahh");
	console.log("sound loaded");
}

function playSound(soundID) {
	createjs.Sound.play(soundID);
	console.log("sound played");
}*/


var samba_rio = new Audio("sounds/sambas/samba_in_game.mp3");
var scream_falsetto = new Audio("sounds/screams/scream_falsetto.mp3");
var crowdaahh = new Audio("sounds/screams/crowdaahh.mp3");
var redbull_belch = new Audio("sounds/other/redbull_belch.mp3");
var samba_side_menu = new Audio("sounds/sambas/samba_side_menus.mp3");
var samba_main_menu = new Audio("sounds/sambas/samba_main_menu.mp3");

samba_main_menu.loop = true;
samba_rio.loop = true;
samba_side_menu.loop = true;

               
               
function playSound(soundID) {
  /*//createjs.Sound.play(soundID);
  document.getElementById(soundID).load();
  document.getElementById(soundID).play();
  
  console.log("sound played");*/
  soundID.play();
};



