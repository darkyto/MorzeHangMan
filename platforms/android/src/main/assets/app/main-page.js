
var frameModule = require("ui/frame");
var observableModule = require("data/observable");

// testing purposes
var flashlight = require("nativescript-flashlight"); 
var viewModel = new observableModule.Observable();

var topmost;

function pageLoaded(args) {
    var page = args.object;
	page.bindingContext = viewModel;
    topmost = frameModule.topmost();
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
}

exports.pageLoaded = pageLoaded;
exports.navToMenu = navToMenu;
