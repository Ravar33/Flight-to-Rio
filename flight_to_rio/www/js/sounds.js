

var samba_rio = new Audio("sounds/sambas/samba_in_game.mp3");
var scream_falsetto = new Audio("sounds/screams/scream_falsetto.mp3");
var crowdaahh = new Audio("sounds/screams/crowdaahh.mp3");
var redbull_belch = new Audio("sounds/other/redbull_belch.mp3");
var samba_side_menu = new Audio("sounds/sambas/samba_side_menus.mp3");
var samba_main_menu = new Audio("sounds/sambas/samba_main_menu.mp3");
var cannon_sound = new Audio("sounds/other/cannon.mp3");
var woohoo = new Audio("sounds/screams/woohoohoo.mp3");
var pain = new Audio("sounds/screams/pain.mp3");

samba_main_menu.loop = true;
samba_rio.loop = true;
samba_side_menu.loop = true;

               
               
function playSound(soundID) {
  soundID.play();
  console.log(soundID + " sound played");
};



