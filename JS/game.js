var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkSequence(userClickedPattern.length-1);
});

$(document).keydown(function () {
    if (!started) {
        started = true;
        nextSequence();
    }
});

function nextSequence () {
    userClickedPattern = [];
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColourChooser = buttonColours[randomNumber];
    gamePattern.push(randomColourChooser);

    $("#" + randomColourChooser).fadeOut(150).fadeIn(150);

    playSound(randomColourChooser);

    level++;
    $("#level-title").text("Level " + level);
}

function checkSequence (idx) {
    if (gamePattern[idx] == userClickedPattern[idx]) {
        console.log("success");
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
    else {
        console.log("wrong");
    }
}

function playSound (name) {
    var buttonAudio = new Audio('sounds/' + name + '.mp3');
    buttonAudio.play();
}

function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 80);
}

// nextSequence();