


var gunpowderLevel = window.localStorage.getItem("GunPowderUpgradeLevel");
var redBullLevel = window.localStorage.getItem("RedBullUpgradeLevel");
var powerbarLevel = window.localStorage.getItem("PowerbarUpgradeLevel");
var amountOfMoney = window.localStorage.getItem("Money");
var werkthet = 0;

console.log("gunpowderLevel " + gunpowderLevel);

if(gunpowderLevel == undefined || gunpowderLevel == NaN){
	gunpowderLevel = 1;
	 window.localStorage.setItem("GunPowderUpgradeLevel", gunpowderLevel);
};

if(redBullLevel == undefined || redBullLevel == NaN){
	redBullLevel = 1;
	 window.localStorage.setItem("RedBullUpgradeLevel", redBullLevel);
};

if(powerbarLevel == undefined || powerbarLevel == NaN){
	powerbarLevel = 1; 
	window.localStorage.setItem("PowerbarUpgradeLevel", powerbarLevel);
};

if(amountOfMoney == undefined || amountOfMoney == NaN){
	 amountOfMoney = 0;
	window.localStorage.setItem("Money", amountOfMoney);
};
function ShowForStore(){
	document.getElementById("powerbarlevelshower").innerHTML = "Niveau: " + powerbarLevel;
	document.getElementById("gunpowderlevelshower").innerHTML = "Niveau: " + gunpowderLevel;
	document.getElementById("redbulllevelshower").innerHTML = "Niveau: " + redBullLevel;
	document.getElementById("amountofmoneyshower").innerHTML = "Money: " + amountOfMoney;
};

 
function Upgrade(WhatToUpgrade){
	   switch(WhatToUpgrade)
    {
        case 1:
			if(gunpowderLevel < 4 && parseInt(amountOfMoney) > 10000){
	        gunpowderLevel ++; 
			amountOfMoney = parseInt(amountOfMoney) - 10000;
			window.localStorage.setItem("GunPowderUpgradeLevel", gunpowderLevel);
			window.localStorage.setItem("Money", amountOfMoney);
			console.log("gunpowderlevel = " + window.localStorage.getItem("GunPowderUpgradeLevel"));
			
			}
			else { console.log("Upgrade can't exceed level 3"); }
			playSound(cannon_sound);
			console.log("GunPowderUpgradeLevel = " + gunpowderLevel);
			document.getElementById("gunpowderlevelshower").innerHTML = "Niveau: " + gunpowderLevel;
			document.getElementById("amountofmoneyshower").innerHTML = "Money: " + amountOfMoney;
            break;
        case 2:
			if(redBullLevel < 4 && parseInt(amountOfMoney) > 20000){
				redBullLevel ++;
				amountOfMoney = parseInt(amountOfMoney) - 20000;
            window.localStorage.setItem("RedBullUpgradeLevel", redBullLevel);
			window.localStorage.setItem("Money", amountOfMoney);
			console.log("RedBullUpgradeLevel = " + window.localStorage.getItem("RedBullUpgradeLevel"));
			
			
			}
			else { console.log("Upgrade can't exceed level 3"); }
			playSound(redbull_belch);
			console.log("RedBullUpgradeLevel = " + redBullLevel);
			document.getElementById("redbulllevelshower").innerHTML = "Niveau: " + redBullLevel;
			document.getElementById("amountofmoneyshower").innerHTML = "Money: " + amountOfMoney;
			
            break;
        case 3:
			if(powerbarLevel < 4 && parseInt(amountOfMoney) > 30000){
				powerbarLevel ++;
				amountOfMoney = parseInt(amountOfMoney) - 30000;
            window.localStorage.setItem("PowerbarUpgradeLevel", powerbarLevel);
			window.localStorage.setItem("Money", amountOfMoney);
			console.log("PowerbarUpgradeLevel = " + window.localStorage.getItem("PowerbarUpgradeLevel"));
			
			}
			else { console.log("Upgrade can't exceed level 3"); }
			playSound(scream_falsetto);
			console.log("PowerbarUpgradeLevel = " + powerbarLevel);
			document.getElementById("powerbarlevelshower").innerHTML = "Niveau: " + powerbarLevel;
			document.getElementById("amountofmoneyshower").innerHTML = "Money: " + amountOfMoney;

			
            break;  
        default:
           console.log("Upgrading Error");
            break;
    }

};

function postMoney(HowMuchMoneyToAdd){
	amountOfMoney = parseInt(amountOfMoney) + parseInt(HowMuchMoneyToAdd);
	window.localStorage.setItem("Money", amountOfMoney);
	//window.localStorage.removeItem("Money");
	
	console.log("amount of money = "  + amountOfMoney);
};
function getMoney(){
	return amountOfMoney;
};

function resetall() {
	window.localStorage.setItem("GunPowderUpgradeLevel", 1);
    window.localStorage.setItem("RedBullUpgradeLevel", 1);
	window.localStorage.setItem("PowerbarUpgradeLevel", 1);
	window.localStorage.setItem("Money", 0);
	document.getElementById("powerbarlevelshower").innerHTML = "Niveau: " + powerbarLevel;
	document.getElementById("gunpowderlevelshower").innerHTML = "Niveau: " + gunpowderLevel;
	document.getElementById("redbulllevelshower").innerHTML = "Niveau: " + redBullLevel;
	document.getElementById("amountofmoneyshower").innerHTML = "Money: " + amountOfMoney;	
};
function givemoney() {
	postMoney(10000);
	document.getElementById("amountofmoneyshower").innerHTML = "Money: " + amountOfMoney;
}
	
	console.log("gunpowderlevel = " + window.localStorage.getItem("GunPowderUpgradeLevel"));
	console.log("RedBullUpgradeLevel = " + window.localStorage.getItem("RedBullUpgradeLevel"));
	console.log("PowerbarUpgradeLevel = " + window.localStorage.getItem("PowerbarUpgradeLevel"));






