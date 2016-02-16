
var frameModule = require("ui/frame");

var topmost;


function pageLoaded(args) {
    var page = args.object;

    topmost = frameModule.topmost();
}

function navToMenu() {
	topmost.navigate("./menu");
}

exports.pageLoaded = pageLoaded;
exports.navToMenu = navToMenu;