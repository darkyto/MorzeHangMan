
var observableModule = require("data/observable");

var segmentedBarModule = require("ui/segmented-bar");
var viewModule = require("ui/core/view");

var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var pageModules = (function() {

	var segmentedBar;
	var page;
	var testLabel;

	var pageModules = {

		pageLoaded:function (args) {
		    page = args.object;
		    segmentedBar = viewModule.getViewById(page, "segmentedBar");
		    testLabel = viewModule.getViewById(page, "testLabel");


			segmentedBar.on(observableModule.Observable.propertyChangeEvent, function(propertyChangeData){
			  	//console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
			  	if (segmentedBar.selectedIndex == 0){
			  		topmost.navigate("help-page");
			  	}
			  	else if (segmentedBar.selectedIndex == 1){
			  		topmost.navigate("morsify-page");
			  	}
			  	else if (segmentedBar.selectedIndex == 2){
			  		topmost.navigate("quiz-page");
			  	}

			  	//testLabel.set("text", "propertyChangeData.value");
			})

		    console.log(segmentedBar.selectedIndex);
		}
	}

	return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;