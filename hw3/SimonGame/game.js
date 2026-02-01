var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// "classic" = replay full pattern, "hard" = only show newest
var mode = "classic";
var isShowingPattern = false;

$("#start-btn").click(function () {
  if (!started && !isShowingPattern) {
    startGame();
  }
});
// Classic mode button
$("#classic-btn").click(function () {
  mode = "classic";
  $("#classic-btn").addClass("active");
  $("#hard-btn").removeClass("active");
  updateTitleForMode();
});
// Hard mode button
$("#hard-btn").click(function () {
  mode = "hard";
  $("#hard-btn").addClass("active");
  $("#classic-btn").removeClass("active");
  updateTitleForMode();
});
// Button click handler
$(".btn").click(function () {
  if (!started || isShowingPattern) return;
// Gets the ID of the clicked button
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
// Plays sound and animates button press
  playSound(userChosenColour);
  animatePress(userChosenColour);
// Checks the user's answer
  checkAnswer(userClickedPattern.length - 1);
});
// Function to start the game
function startGame() {
  started = true;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];

  $("#start-btn").prop("disabled", true);
  nextSequence();
}
// Updates the title to reflect the mode currently selected
function updateTitleForMode() {
  if (!started) return;
  $("#level-title").text("Level " + level + " (" + mode.toUpperCase() + ")");
}
// Checks the user's answer compared to the game's pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
// Removes the game-over class after a short delay
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}
// Generates the next sequence in the pattern
function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level + " (" + mode.toUpperCase() + ")");

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
// Plays the pattern based on the selected mode, if Classic it plays full pattern, if Hard it plays only the newest color
  if (mode === "classic") {
    playFullPattern();
  } else {
    playSingleStep(randomChosenColour);
  }
}

// Classic mode: replay from beginning
function playFullPattern() {
  isShowingPattern = true;

  var i = 0;
  var interval = setInterval(function () {
    playSingleStep(gamePattern[i]);
    i++;

    if (i >= gamePattern.length) {
      clearInterval(interval);
      // small buffer so last flash finishes before user clicks
      setTimeout(function () {
        isShowingPattern = false;
      }, 250);
    }
  }, 600);
}

// Hard mode: only show the newest color
function playSingleStep(colour) {
  $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(colour);
}
// Animates button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
// Plays sound corresponding to the button color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// Resets the game variables to start over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  isShowingPattern = false;
// Re-enables the start button
  $("#start-btn").prop("disabled", false);
}
