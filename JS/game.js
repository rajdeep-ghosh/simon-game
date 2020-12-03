var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
});

function nextSequence () {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColourChooser = buttonColours[randomNumber];
    gamePattern.push(randomColourChooser);

    $("#" + randomColourChooser).fadeOut(150).fadeIn(150);

    playSound(randomColourChooser);
}

function playSound (name) {
    var buttonAudio = new Audio('sounds/' + name + '.mp3');
    buttonAudio.play();
}

nextSequence();