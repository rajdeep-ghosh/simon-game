// Available game button colours
var buttonColours = ["red", "green", "blue", "yellow"];

// Random game pattern array 
var gamePattern = [];

// User input pattern 
var userClickedPattern = [];

// Current level 
var level = 0;

// Game start flag
var started = false;

// Function to listen for mouse clicks on buttons 
$(".btn").click(function () {

    // Retrive the 'id' of the current button object 
    // and store it in userChosenColour and push it into userClickedPattern array 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    // Call the playSound and animatePress functions 
    // and pass in the buttoon id 
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Call checkSequence function to check the
    // game pattern against user clicked pattern and 
    // pass the userClickedPattern array length 
    checkSequence(userClickedPattern.length-1);
});

// Function to listen for Keyboard key press 
$(document).keydown(function () {

    // Check if game has started 
    if (!started) {

        // Set started to true and call nextSequence to
        // generate random pattern 
        started = true;
        nextSequence();
    }
});

// Function to generate ramdom game patterns and change level title
function nextSequence () {

    // Clear userClickedPattern array 
    userClickedPattern = [];

    // Generate a random number in the range 0-3 
    var randomNumber = Math.floor(Math.random() * 4);

    // Choose a colour from the available colours present 
    // in the buttonColours array and add it to gamePattern array 
    var randomColourChooser = buttonColours[randomNumber];
    gamePattern.push(randomColourChooser);

    // Make the buttons fade out and fade in for effect 
    $("#" + randomColourChooser).fadeOut(150).fadeIn(150);

    // Play particular button sound 
    playSound(randomColourChooser);

    // Increment level and display it in title
    level++;
    $("#level-title").text("Level " + level);
}

// Function to check for user input pattern against genarated pattern 
function checkSequence (idx) {

    // Check for same buttons pressed 
    if (gamePattern[idx] == userClickedPattern[idx]) {

        // Check for array lengths 
        if (gamePattern.length === userClickedPattern.length) {
            console.log("success");

            // Set a timeout to call nextSequence() function after 1 sec 
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");

        // Play wrong.mp3 sound for wrong answer 
        playSound("wrong");

        // Change title to "Game over"
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Steps to animate wrong answer background colour 
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Reset game 
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