// console.log("menu.js started");

// var observableModule = require("data/observable");

// //var segmentedBarModule = require("ui/segmented-bar");
// var viewModule = require("ui/core/view");

// var frameModule = require("ui/frame");
// var topmost = frameModule.topmost();

// var pageModules = (function() {

// 	//var segmentedBar;
// 	var page;
// 	var testLabel;

// 	var pageModules = {
// 		pageLoaded:function (args) {
// 			console.log("pageLoaded:function started");
// 		    page = args.object;
// 		    //segmentedBar = viewModule.getViewById(page, "segmentedBar");
// 		    quizLabel = viewModule.getViewById(page, "quizLabel");
// 			console.log("quizLabel chaged?");
// 		    quizLabel.set("text", "i'm here!");

// 			morseAlphabetListPicker = viewModule.getViewById(page, "morseAlphabetListPicker");
// 			morseAlphabetListPicker.items = ["1", "2"];

// 			// segmentedBar.on(observableModule.Observable.propertyChangeEvent, function(propertyChangeData){
// 			//   	//console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
// 			//   	if (segmentedBar.selectedIndex == 0){
// 			//   		topmost.navigate("help-page");
// 			//   	}
// 			//   	else if (segmentedBar.selectedIndex == 1){
// 			//   		topmost.navigate("morsify-page");
// 			//   	}
// 			//   	else if (segmentedBar.selectedIndex == 2){
// 			//   		topmost.navigate("quiz-page");
// 			//   	}

// 			//   	
// 			// })

// 		    //console.log(segmentedBar.selectedIndex);
// 		}
// 	}

// 	return pageModules;
// })();

// exports.pageLoaded = pageModules.pageLoaded;

console.log("in menu.js");

var view = require("ui/core/view");

function onLoad(args) {
    var page = args.object;

    console.log("in menu.js @ onLoad");

    var _morseAlphabetLabel = view.getViewById(page, "morseAlphabetLabel");
    var _morseAlphabetListView = view.getViewById(page, "morseAlphabetListView");

    //_morseAlphabetLabel.text = "OK!";
    _morseAlphabetListView.items = ["A	.-   ", "B	-... ", "C	-.-. ", "D	-..  ", "E	.    ", "F	..-. ", "G	--.  ", "H	.... ", "I	..   ", "J	.--- ", "K	-.-  ", "L	.-.. ", "M	--   ", "N	-.   ", "O	---  ", "P	.--. ", "Q	--.- ", "R	.-.  ", "S	...  ", "T	-    ", "U	..-  ", "V	...- ", "W	.--  ", "X	-..- ", "Y	-.-- ", "Z	--.. ", "0	-----", "1	.----", "2	..---", "3	...--", "4	....-", "5	.....", "6	-....", "7	--...", "8	---..", "9	----."];
}

exports.onLoad = onLoad;