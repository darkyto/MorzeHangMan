
var observableModule = require("data/observable");

var segmentedBarModule = require("ui/segmented-bar");
var viewModule = require("ui/core/view");

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
			  	console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);

			  	testLabel.set("text", propertyChangeData.value);
			})

		    console.log(segmentedBar.selectedIndex);
		}
	}

	return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;

