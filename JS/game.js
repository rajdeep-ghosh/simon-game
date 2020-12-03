var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];

function nextSequence () {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColourChooser = buttonColours[randomNumber];
    gamePattern.push(randomColourChooser);

    $("#" + randomColourChooser).fadeOut(150).fadeIn(150);

    var buttonAudio = new Audio('sounds/' + randomColourChooser + '.mp3');
    buttonAudio.play();
}

nextSequence();