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
        case "Upgrade 1":
            explanation = "Some explanation about Upgrade 1";
            break;
        case "Upgrade 2":
            explanation = "Some bla bla bla bla about Upgrade 2";
            break;
        case "Upgrade 3":
            explanation = " Blaa blaa about Upgrade 3";
            break;  
        default:
            explanation = "No information";
            break;
    }

    upgradeExplanation.innerHTML = explanation;
});

closeDescription.addEventListener("click", function()
{
    openDescription.style.visibility = "hidden";
});

app.initialize();