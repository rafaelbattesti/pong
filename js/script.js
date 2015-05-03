var xSpeed          = 3;
var ySpeed          = 3;
var leftScoreCount  = 0;
var rightScoreCount = 0;
var rallyCount      = 0;

function moveBall() {

  var ball           = document.getElementById("ball");
  var bodyWidth      = document.body.offsetWidth;
  var bodyHeight     = document.body.offsetHeight;
  var leftBar        = document.getElementById("leftBar");
  var rightBar       = document.getElementById("rightBar");
  var leftScore      = document.getElementById("leftScore");
  var rightScore     = document.getElementById("rightScore");
  var hitBarSound    = document.getElementById("hitBarSound");
  var hitWallSound   = document.getElementById("hitWallSound");
  var ballLeft       = ball.offsetLeft;
  var ballTop        = ball.offsetTop;
  var ballWidth      = ball.offsetWidth;
  var ballHeight     = ball.offsetHeight;
  var leftBarLeft    = leftBar.offsetLeft;
  var leftBarTop     = leftBar.offsetTop;
  var leftBarHeight  = leftBar.offsetHeight;
  var leftBarWidth   = leftBar.offsetWidth;
  var rightBarLeft   = rightBar.offsetLeft;
  var rightBarTop    = rightBar.offsetTop;
  var rightBarHeight = rightBar.offsetHeight;
  var rightBarWidth  = rightBar.offsetWidth;

  if (((ballTop > leftBarTop - ballHeight && ballTop < leftBarTop + leftBarHeight)
    && (ballLeft <= leftBarLeft + leftBarWidth)) 

    ||

    ((ballTop > rightBarTop - ballHeight && ballTop < rightBarTop + rightBarHeight)
    && (ballLeft >= rightBarLeft - ballWidth))) {

    hitBarSound.play();
    rallyCount += 3;
    xSpeed *= -1;

  } else if (ballTop <= 10 || ballTop + ballHeight > bodyHeight + 2) {
    
    hitWallSound.play();      
    ySpeed *= -1;

  } else if (ballLeft < leftBarLeft + leftBarWidth) {
    
    ball.style.left = "calc(50% - 25px)";
    ball.style.top = "calc(50% - 25px)";
    rightScoreCount++;
    rightScore.innerHTML = rightScoreCount;
    rallyCount = 0;
    xSpeed *= -1;

  } else if (ballLeft + ballWidth > rightBarLeft) {
    
    ball.style.left = "calc(50% - 25px)";
    ball.style.top = "calc(50% - 25px)";
    leftScoreCount++;
    leftScore.innerHTML = leftScoreCount;
    rallyCount = 0;
    xSpeed *= -1;

  }

  // Logic to move the bar according to the ball.offsetTop
  if ((ballTop + ballHeight / 2 >= rightBarHeight / 2 + 14)
    && (ballTop + ballHeight / 2 <= bodyHeight - rightBarHeight / 2)) {

     if (ySpeed < 0 && ballTop + ballHeight / 2 < bodyHeight - rightBarHeight / 2 - rallyCount) {
      
      rightBar.style.top = 
      (ballTop + ballHeight / 2 - rightBarHeight / 2 + rallyCount) + "px";

     } else if (ySpeed > 0 && ballTop + ballHeight / 2 > rightBarHeight / 2 + 14 + rallyCount) {

      rightBar.style.top = 
      (ballTop + ballHeight / 2 - rightBarHeight / 2 - rallyCount) + "px";

     }

  }

  // After validating the positions move ball and right
  ball.style.left = (ball.offsetLeft + xSpeed) + "px";
  ball.style.top = (ball.offsetTop + ySpeed) + "px";

}

function upArrowPressed() {
  
  var leftBar = document.getElementById("leftBar");

  if (!(leftBar.offsetTop <= 15)) {
    leftBar.style.top = (leftBar.offsetTop - 25) + "px";
  } else {
    leftBar.style.top = 15 + "px";
  }

}

function downArrowPressed() {
  
  var leftBar = document.getElementById("leftBar");
  var bodyHeight = document.body.offsetHeight;

  if (!(leftBar.offsetTop + leftBar.offsetHeight >= bodyHeight - 10)) {
    leftBar.style.top = (leftBar.offsetTop + 25) + "px";
  } else {
    leftBar.style.top = (bodyHeight - leftBarHeight - 10) + "px";
  }

}

function moveSelection(event) {
    
  switch (event.keyCode) {
      case 38:
      upArrowPressed();
      break;
      case 40:
      downArrowPressed();
      break;
  }

}

function animate() {
  moveSelection(event);
  setInterval(moveBall, 5);
}

function playIntroSound() {
  
  var introSound = document.getElementById("introSound");
  introSound.play();

}

function playPressStartSound() {

  var pressStartSound = document.getElementById("pressStartSound");
  pressStartSound.play();

}