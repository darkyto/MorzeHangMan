var view = require("ui/core/view");
var sound = require("nativescript-sound");
var observableModule = require("data/observable-array");
var observableModel = require("data/observable");
var timer = require("timer");
var vibrator = require("nativescript-vibrate");

var _dot;
var _slash;
var _morseCodeArray;
var morseDelay = 600;
var model;

function onLoad(args) {
	var page = args.object;
	page.addCssFile("~/styles/menu.css");

	_dot = sound.create("~/res/morse-dot.mp3");
	_slash = sound.create("~/res/morse-slash.mp3");

	model = new observableModel.Observable(
	{
	  "sliderDelayMinValue": morseDelay,
	  "sliderDelayMaxValue": 3 * morseDelay,
	  "sliderDelayCurrentValue": morseDelay,
	  "sliderVolumeMinValue": 0,
	  "sliderVolumeMaxValue": 100,
	  "sliderVolumeCurrentValue": 70
	}
	);

	var _morseAlphabetLabel = view.getViewById(page, "morseAlphabetLabel");
	var _morseAlphabetListView = view.getViewById(page, "morseAlphabetListView");

  	_morseCodeArray = new observableModule.ObservableArray();

	_morseCodeArray.push({letter: "LETTER", code: 'CODE'});

	_morseCodeArray.push({letter: "A", code: '.-'});
	_morseCodeArray.push({letter: "B", code: '-...'});
	_morseCodeArray.push({letter: "C", code: '-.-.'});
	_morseCodeArray.push({letter: "D", code: '-..'});
	_morseCodeArray.push({letter: "E", code: '.'});
	_morseCodeArray.push({letter: "F", code: '..-.'});
	_morseCodeArray.push({letter: "G", code: '--.'});
	_morseCodeArray.push({letter: "H", code: '....'});
	_morseCodeArray.push({letter: "I", code: '..'});
	_morseCodeArray.push({letter: "J", code: '.---'});

	_morseCodeArray.push({letter: "K", code: '-.-'});
	_morseCodeArray.push({letter: "L", code: '.-..'});
	_morseCodeArray.push({letter: "M", code: '--'});
	_morseCodeArray.push({letter: "N", code: '-.'});
	_morseCodeArray.push({letter: "O", code: '---'});
	_morseCodeArray.push({letter: "P", code: '.--.'});
	_morseCodeArray.push({letter: "Q", code: '--.-'});
	_morseCodeArray.push({letter: "R", code: '.-.'});
	_morseCodeArray.push({letter: "S", code: '...'});
	_morseCodeArray.push({letter: "T", code: '-'});

	_morseCodeArray.push({letter: "U", code: '..-'});
	_morseCodeArray.push({letter: "V", code: '...-'});
	_morseCodeArray.push({letter: "W", code: '.--'});
	_morseCodeArray.push({letter: "X", code: '-..-'});
	_morseCodeArray.push({letter: "Y", code: '-.--'});
	_morseCodeArray.push({letter: "Z", code: '--..'});

	_morseCodeArray.push({letter: "0", code: '-----'});
	_morseCodeArray.push({letter: "1", code: '.----'});
	_morseCodeArray.push({letter: "2", code: '..---'});
	_morseCodeArray.push({letter: "3", code: '...--'});
	_morseCodeArray.push({letter: "4", code: '....-'});
	_morseCodeArray.push({letter: "5", code: '.....'});
	_morseCodeArray.push({letter: "6", code: '-....'});
	_morseCodeArray.push({letter: "7", code: '--...'});
	_morseCodeArray.push({letter: "8", code: '---..'});
	_morseCodeArray.push({letter: "9", code: '----.'});

	model.set("myMorseItems", _morseCodeArray);
	page.bindingContext = model;
}

function onListViewTap(args) {
  var itemIndex = args.index;

	var currentItem = _morseCodeArray.getItem(itemIndex);
	var codeString = currentItem['code'];
	console.log(codeString);

	for (var i = 0, len = codeString.length; i < len; i++) {
  	if (codeString[i] === "-") {
      timer.setTimeout(
        function playMorseCode(){
          _slash.play();
          //TODO: Fix permissions prior to use!
          console.log("Trying to vibrate for 500ms");
          vibrator.vibration(500);
          console.log(model.sliderCurrentValue);
          
        }
        , model.sliderDelayCurrentValue * (i + 1));
  	} else if (codeString[i] === ".") {
      timer.setTimeout(
        function playMorseCode(){
          _dot.play();
          //TODO: Fix permissions prior to use!
          console.log("Trying to vibrate for 250ms");

          vibrator.vibration(250);
          console.log(model.sliderCurrentValue);
        }
        , model.sliderDelayCurrentValue * (i + 1));
  	}
	}
}

exports.onLoad = onLoad;
exports.onListViewTap = onListViewTap;