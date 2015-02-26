var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("Device is ready!");
    },

    receivedEvent: function(id) {
    }

};


var clickedObject = document.getElementById("upgrade");
var openDescription = document.getElementById("upgradeDescription");
var closeDescription = document.getElementById("closeDescription");

clickedObject.addEventListener("click", function(evt)
{
    var upgradeTitle = document.getElementById("upgradeTitle");
    var upgradeExplanation = document.getElementById("upgradeExplanation");
    var description;

    upgradeTitle.innerHTML = evt.target.alt;
    openDescription.style.visibility = "visible";

    var explanation;
    switch(evt.target.alt)
    {
       case "GunPowder":
            if(gunpowderLevel < 4 && parseInt(amountOfMoney) > 10000){
                explanation = "Gun Powder upgraded to level: " + gunpowderLevel;
            }
            else{explanation = "You have achieved the maximum level of 4 or you do not have 10000 money"}
            break;
        case "PowerBar":
            if(powerbarLevel < 4 && parseInt(amountOfMoney) > 30000){
                explanation = "PowerBar upgraded to level: " + powerbarLevel;
            }
            else{explanation = "You have achieved the maximum level of 4 or you do not have 30000 money"}
            break;
        case "RedBull":
            if(redBullLevel < 4 && parseInt(amountOfMoney) > 20000){
                explanation = "RedBull upgraded to level: " + redBullLevel;
            }
           else{explanation = "You have achieved the maximum level of 4 or you do not have 20000 money"}
            break;  
        default:
            explanation = "Nothing to see here";
            break;
    }

    upgradeExplanation.innerHTML = explanation;
});

closeDescription.addEventListener("click", function()
{
    openDescription.style.visibility = "hidden";
});

app.initialize();