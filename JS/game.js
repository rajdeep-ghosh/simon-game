// Game button colours present
var buttonColours = ["red", "green", "blue", "yellow"];

// Random game pattern array 
var gamePattern = [];

// User input pattern 
var userClickedPattern = [];

// Current level 
var level = 0;

// Game start flag
var started = false;

// Function to listen for button clicks 
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkSequence(userClickedPattern.length-1);
});

// Function to listen for Keyboard key press 
$(document).keydown(function () {
    if (!started) {
        started = true;
        nextSequence();
    }
});

// Function to generate ramdom game patterns and change level title
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

// Function to check for user input pattern against genarated pattern 
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

// Function to reset 
function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}

// Function to play sounds  
function playSound (name) {
    var buttonAudio = new Audio('sounds/' + name + '.mp3');
    buttonAudio.play();
}

// Function to animate button press 
function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 80);
}