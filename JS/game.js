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
        if (gamePattern.length === userClickedPattern.length) {
            console.log("success");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound (name) {
    var buttonAudio = new Audio('sounds/' + name + '.mp3');
    buttonAudio.load();
    buttonAudio.play();
}

function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 80);
}

// nextSequence();