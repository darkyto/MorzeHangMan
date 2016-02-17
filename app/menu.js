console.log("in menu.js");

var view = require("ui/core/view");
var sound = require("nativescript-sound");
var observableModule = require("data/observable-array");

var _dot;
var _slash;

function onLoad(args) {
    var page = args.object;

    _dot = sound.create("~/res/morse-dot.wav");
    _slash = sound.create("~/res/morse-slash.wav");

    var _morseAlphabetLabel = view.getViewById(page, "morseAlphabetLabel");
    var _morseAlphabetListView = view.getViewById(page, "morseAlphabetListView");

    // _morseAlphabetListView.items = ["A	.-   ", "B	-... ", "C	-.-. ", "D	-..  ", "E	.    ", "F	..-. ", "G	--.  ", "H	.... ", "I	..   ", "J	.--- ", "K	-.-  ", "L	.-.. ", "M	--   ", "N	-.   ", "O	---  ", "P	.--. ", "Q	--.- ", "R	.-.  ", "S	...  ", "T	-    ", "U	..-  ", "V	...- ", "W	.--  ", "X	-..- ", "Y	-.-- ", "Z	--.. ", "0	-----", "1	.----", "2	..---", "3	...--", "4	....-", "5	.....", "6	-....", "7	--...", "8	---..", "9	----."];

    var morseCodeArray = new observableModule.ObservableArray();

	morseCodeArray.push({letter: "LETTER", code: 'CODE'});

  	morseCodeArray.push({letter: "A", code: '.-'});
  	morseCodeArray.push({letter: "B", code: '-...'});
  	morseCodeArray.push({letter: "C", code: '-.-.'});
  	morseCodeArray.push({letter: "D", code: '-..'});
  	morseCodeArray.push({letter: "E", code: '.'});
  	morseCodeArray.push({letter: "F", code: '..-.'});
  	morseCodeArray.push({letter: "G", code: '--.'});
  	morseCodeArray.push({letter: "H", code: '....'});
  	morseCodeArray.push({letter: "I", code: '..'});
  	morseCodeArray.push({letter: "J", code: '.---'});

  	morseCodeArray.push({letter: "K", code: '-.-'});
  	morseCodeArray.push({letter: "L", code: '.-..'});
  	morseCodeArray.push({letter: "M", code: '--'});
  	morseCodeArray.push({letter: "N", code: '-.'});
  	morseCodeArray.push({letter: "O", code: '---'});
  	morseCodeArray.push({letter: "P", code: '.--.'});
  	morseCodeArray.push({letter: "Q", code: '--.-'});
  	morseCodeArray.push({letter: "R", code: '.-.'});
  	morseCodeArray.push({letter: "S", code: '...'});
  	morseCodeArray.push({letter: "T", code: '-'});

  	morseCodeArray.push({letter: "U", code: '..-'});
  	morseCodeArray.push({letter: "V", code: '...-'});
  	morseCodeArray.push({letter: "W", code: '.--'});
  	morseCodeArray.push({letter: "X", code: '-..-'});
  	morseCodeArray.push({letter: "Y", code: '-.--'});
  	morseCodeArray.push({letter: "Z", code: '--..'});

  	morseCodeArray.push({letter: "0", code: '-----'});
  	morseCodeArray.push({letter: "1", code: '.----'});
  	morseCodeArray.push({letter: "2", code: '..---'});
  	morseCodeArray.push({letter: "3", code: '...--'});
  	morseCodeArray.push({letter: "4", code: '....-'});
  	morseCodeArray.push({letter: "5", code: '.....'});
  	morseCodeArray.push({letter: "6", code: '-....'});
  	morseCodeArray.push({letter: "7", code: '--...'});
  	morseCodeArray.push({letter: "8", code: '---..'});
  	morseCodeArray.push({letter: "9", code: '----.'});

  	//_morseAlphabetListView.items = array;
  	page.bindingContext = {myMorseItems: morseCodeArray};

}

function onListViewTap() {
	console.log("List view tapped!");
    var _playMorseCode = playMorseCode("A");
}

function playMorseCode(args){
	_dot.play();
}

exports.onLoad = onLoad;
exports.onListViewTap = onListViewTap;