var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var viewModule = require("ui/core/view");
var colorModule = require("color");

// testing purposes
var flashlight = require("nativescript-flashlight"); 
var viewModel = new observableModule.Observable();

var topmost;

var morseAlhabet = ["A", "B", "C"];

function pageLoaded(args) {
    var page = args.object;
	page.bindingContext = viewModel;
    topmost = frameModule.topmost();

    var model = new observableModule.Observable({
        "morseAlhabet": ["A", "B", "C"],
    });

    // this will animate the logo on initial load
    var img = viewModule.getViewById(page, "logoImage");
    img.scaleX = 0.1;
    img.scaleY = 0.1;
    img.animate({
    	scale: { x: 1, y: 1},
    	rotate: 360,
    	duration: 3000
    });
}


function navToMenu() {
	topmost.navigate("./menu");
}

viewModel.set("flashlightState", "Turn on");
viewModel.toggleFlashlight = function() {
	if (flashlight.isAvailable()) {
        flashlight.toggle();
        viewModel.set("flashlightState", (flashlight.isOn() ? "Turn off" : "Turn on"));
    } else {
        alert("A flashlight is not available on your device.");
    }
};

exports.pageLoaded = pageLoaded;
exports.navToMenu = navToMenu;