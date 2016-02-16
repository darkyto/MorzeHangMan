
var segmentModule = require("ui/segmented-bar");
var observableModule = require("data/observable");

var pageModules = (function() {

	var pageModules = {

		pageLoaded:function (args) {
		    var page = args.object;
		}		
	}
	

	return pageModules;
})();

exports.pageLoaded = pageModules.pageLoaded;
