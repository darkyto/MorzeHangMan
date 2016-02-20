/* jshint node: true */
/*jshint sub:true*/
"use strict";

var observableModule = require("data/observable-array");
var observableModel = require("data/observable");
var viewModule = require("ui/core/view");
var colorModule = require("color");

var sound = require("nativescript-sound");
var timer = require("timer");
var vibrator = require("nativescript-vibrate");
var http = require("http");
var email = require("nativescript-email");
var applicationSettings = require("application-settings");
var dialogs = require("ui/dialogs");
//var tnsfx = require('nativescript-effects');

var page;
var _dot;
var _slash;
var _morseCodeArray;
var _decodedMorseArray;
var morseDelay = 600;
var model;
var codes = {};
codes["a"] = '.-';
codes["b"] = '-...';
codes["c"] = '-.-.';
codes["d"] = '-..';
codes["e"] = '.';
codes["f"] = '..-.';
codes["g"] = '--.';
codes["h"] = '....';
codes["i"] = '..';
codes["j"] = '.---';
codes["k"] = '-.-';
codes["l"] = '.-..';
codes["m"] = '--';
codes["n"] = '-.';
codes["o"] = '---';
codes["p"] = '.--.';
codes["q"] = '--.-';
codes["r"] = '.-.';
codes["s"] = '...';
codes["t"] = '-';
codes["u"] = '..-';
codes["v"] = '...-';
codes["w"] = '.--';
codes["x"] = '-..-';
codes["z"] = '-.--';
codes["y"] = '--..';
codes["0"] = '-----';
codes["1"] = '.----';
codes["2"] = '..---';
codes["3"] = '...--';
codes["4"] = '....-';
codes["5"] = '.....';
codes["6"] = '-....';
codes["7"] = '--...';
codes["8"] = '---..';
codes["9"] = '----.';

function onLoad(args) {
	page = args.object;
	page.addCssFile("~/styles/menu.css");

	var myTab = page.getViewById('tabNavigation');		
	myTab.scaleX = 0.1;
    myTab.scaleY = 0.1;
    myTab.animate({
    	scale: { x: 1, y: 1},
    	duration: 1000
    });	

	_dot = sound.create("~/res/morse-dot.mp3");
	_slash = sound.create("~/res/morse-slash.mp3");

	model = new observableModel.Observable({
		"sliderDelayMinValue": morseDelay,
		"sliderDelayMaxValue": 3 * morseDelay,
		"sliderDelayCurrentValue": morseDelay,
		"sliderVolumeMinValue": 0,
		"sliderVolumeMaxValue": 100,
		"sliderVolumeCurrentValue": 70,
		"textToMorse" : "SOS",
		"morseToText" : "... --- ...",
		"randomWordForTextLabel" : "obduscated",
		"maskedRandomWordForTextLabel" : "obfuscated",
		"userDecodedWordAttempt" : "",
		"userDecodedWordResult" : "DECODED RESULT: DIFFERENT!",
		"lightCodeColor" : "#FFFF00"
	});

	generateMorseObservableArray();

	model.set("myMorseItems", _morseCodeArray);
	page.bindingContext = model;	
}
function simulateDotLight() {

	var mainContainer = viewModule.getViewById(page, "menuContainer");
	console.log("dot light");
    mainContainer.animate({
    	backgroundColor: new colorModule.Color(model.lightCodeColor),
    	duration: 100
    }).then(function() { return mainContainer.animate({
    	backgroundColor: new colorModule.Color("#000000"),
    	duration: 100
    	});
	});	
}
function simulateDashLight() {

	var mainContainer = viewModule.getViewById(page, "menuContainer");

	console.log("dash light");
    mainContainer.animate({
    	backgroundColor: new colorModule.Color(model.lightCodeColor),
    	duration: 300
    }).then(function() { return mainContainer.animate({
    	backgroundColor: new colorModule.Color("#000000"),
    	duration: 300
    	});
	});	
}

function setBackOpacity() {
	var mainTab = viewModule.getViewById(page, "tabNavigation");
	var mainContainer = viewModule.getViewById(page, "menuContainer");

	mainTab.opacity = 1;
	mainContainer.backgroundColor = new colorModule.Color("#FFFFFF");
}

function onCreateLightTap(args) {
	page = args.object.page;
	var mainTab = viewModule.getViewById(page, "tabNavigation");
	mainTab.opacity = 0.1;

	var stringFromApp = applicationSettings.getString("morse-data");
	for (var i = 0; i < stringFromApp.length; i++) {
		if (stringFromApp[i] === "-") {
			timer.setTimeout(simulateDashLight, 600 * (i + 1));
		} else if (stringFromApp[i] === ".") {
			timer.setTimeout(simulateDotLight, 600 * (i + 1));
		}

		if (i == stringFromApp.length - 1) {
			timer.setTimeout(setBackOpacity, 600 * (i + 2));
		}
	}
}

function onSendFileViaMailTap() {
	var stringFromApp = applicationSettings.getString("morse-data");
	var receiver = "test@test.com";
	dialogs.prompt({
	  title: "Send morse code mail",
	  message: "Enter receiver email",
	  okButtonText: "Send Now!",
	  cancelButtonText: "Cancel",
	  defaultText: "sample-mail@mail.com",
	  inputType: dialogs.inputType.text
	}).then(function (r) {
	  console.log("Dialog result: " + r.result + ", text: " + r.text);
	  receiver = r.text;
	});
	// console.log("RECEIVER: "+receiver);

	email.available().then(function(avail) {
      console.log("Email available? " + avail);
      if (avail) {
  	    email.compose({
		    subject: "Morse code mail",
		    body: stringFromApp,
		    to: [receiver]
		}).then(function(r) {
			if (r){
				//do the stuff with the response
			}
			dialogs.alert("Mail send").then(function() {
			    console.log("Dialog closed!");
			});
		    console.log("Email composer closed");
		});
      }
  	});
}


function onCreateFileTap() {
	var textInput = model.get("textToMorse");
	var resultOutput = decodeTextToMorse(textInput);

	applicationSettings.setString("morse-data", resultOutput);

	dialogs.action({
	    message: "File Successfully Saved!",
	    cancelButtonText: "OK",
	    actions: ["Send file via email", "Delete file"]
	}).then(function (result) {
	    // console.log("Dialog result: " + result);
	    if (result === "Send file via email") {
	    	onSendFileViaMailTap();
	    	console.log("send file option from dialog!");
	    } else if (result === "Delete file") {
    		applicationSettings.setString("morse-data", "");
	    }
	});

}

function onEncodeButtonTap() {
	//var page = args.object.page;
	var textInput = model.get("textToMorse");
	var resultOutput = decodeTextToMorse(textInput);

	model.set("morseToText", resultOutput);
}

function onListViewTap(args) {
	var itemIndex = args.index;

	var currentItem = _morseCodeArray.getItem(itemIndex);
	var codeString = currentItem['code'];
	console.log(codeString);

	for (var i = 0, len = codeString.length; i < len; i++) {
		if (codeString[i] === "-") {
			timer.setTimeout(playSlashMorseCode, model.sliderDelayCurrentValue * (i + 1));
		} else if (codeString[i] === ".") {
			timer.setTimeout(playDotMorseCode, model.sliderDelayCurrentValue * (i + 1));
		}
	}
}

function playSlashMorseCode() {
	_slash.play();
	if (vibrator !== null){
		console.log("Trying to vibrate for 500ms");
		vibrator.vibration(500);
	} else {
		console.log("Vibration not available on emulator!");
	}
	
}

function playDotMorseCode() {
	_dot.play();
	if (vibrator !== null){
		console.log("Trying to vibrate for 250ms");
		vibrator.vibration(250);
	} else {
		console.log("Vibration not available on emulator!");
	}
}

function generateMorseObservableArray() {

	_morseCodeArray = new observableModule.ObservableArray();

	_morseCodeArray.push({
		letter: "LETTER",
		code: 'CODE'
	});

	for (var key in codes) {
 		_morseCodeArray.push({
		letter: key,
		code: codes[key]
		});
	}
}

function decodeTextToMorse(text) {

	_decodedMorseArray = new observableModule.ObservableArray();

	text = text.toLowerCase();

	for (var i = 0, len = text.length; i < len; i++) {
		for (var y = 0; y < _morseCodeArray.length; y++) {
			var currentItem = _morseCodeArray.getItem(y);
			var currentLetter = currentItem['letter'];

			if (text[i] === currentLetter) {
				_decodedMorseArray.push(currentItem['code']);
				_decodedMorseArray.push(" ");
			} else if (text[i] === " ") {
				_decodedMorseArray.push(" ");
			}
		}
	}
	var result = _decodedMorseArray.join('');
	result = result.replace(/\s\s+/g, '\n');

	return result;
}

function fetchRandomWordFromApi(){
	console.log('fetcher clicked!');

    http.getJSON("http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5").then(function (r) {
    	try{
    		var result = JSON.stringify(r);
    		var parsed = JSON.parse(result);
    		//console.log(parsed[0]["word"]);
    		model.randomWordForTextLabel = parsed[0]["word"];
    		shuffleWord();
    		model.userDecodedWordResult = "DECODED RESULT: DIFFERENT!";
    	}
    	catch (e){
    		console.log(e.message);
    	}
	}, function (e) {
    	console.log("encountered an error while fetching the word!");
    	console.log(e);
	});
}

function checkDecodedWord(){
	if (model.randomWordForTextLabel === model.userDecodedWordAttempt){
		console.log("the same");
		model.userDecodedWordResult = "YOU DID IT. TRY ANOTHER WORD!";
	}
	else{
		console.log("different: your: " + model.userDecodedWordAttempt + ", correct: " + model.randomWordForTextLabel);
	}
}

function shuffleWord(){
	var wordString = (model.randomWordForTextLabel).split(""),
        wordLength = wordString.length;

    for(var i = wordLength - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = wordString[i];
        wordString[i] = wordString[j].toLowerCase();
        wordString[j] = tmp;
    }

    model.maskedRandomWordForTextLabel = wordString.join("");
}

function unmaskWord(){
	model.maskedRandomWordForTextLabel = model.randomWordForTextLabel;
}

function playMaskedWord(){
	var encodedString = "";
	for (var i = 0, lenI = model.randomWordForTextLabel.length; i < lenI; i++) {
		console.log(model.randomWordForTextLabel[i].toLowerCase() + " : " + codes[(model.randomWordForTextLabel[i]).toLowerCase()]);
		encodedString = encodedString + codes[(model.randomWordForTextLabel[i]).toLowerCase()];
		encodedString = encodedString + "?";
	}

	var codeString = encodedString;
	for (var j = 0, lim = codeString.length; j < lim; j++) {
			if (codeString[j] === "-") {
				timer.setTimeout(playSlashMorseCode, model.sliderDelayCurrentValue * (j + 1));
			} else if (codeString[j] === ".") {
				timer.setTimeout(playDotMorseCode, model.sliderDelayCurrentValue * (j + 1));
			}
	}	

	console.log(encodedString);
}

exports.onLoad = onLoad;
exports.onListViewTap = onListViewTap;
exports.onEncodeButtonTap = onEncodeButtonTap;
exports.fetchRandomWordFromApi = fetchRandomWordFromApi;
exports.checkDecodedWord = checkDecodedWord;
exports.unmaskWord = unmaskWord;
exports.playMaskedWord = playMaskedWord;
exports.onCreateFileTap = onCreateFileTap;
exports.onSendFileViaMailTap = onSendFileViaMailTap;
exports.onCreateLightTap = onCreateLightTap;