var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStart = false;

$(document).keypress(function () {
  if (gameStart === false) {
    gameStart = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("SUCCESS");
    if(userClickedPattern.length === gamePattern.length ) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else { // wrong color selected
    playSound("wrong");
    console.log("WRONG");
    animateGameOver();
    startOver();
  }
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function animateGameOver() {
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  gameStart = false;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}