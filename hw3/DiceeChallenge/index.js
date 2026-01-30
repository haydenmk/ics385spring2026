function rollDie() {
  return Math.floor(Math.random() * 6) + 1; // returns a random integer between 1 and 6
}

function setDieImage(imgSelector, dieValue) {
  var randomDiceImage = "dice" + dieValue + ".png";
  var randomImageSource = "images/" + randomDiceImage;
  document.querySelector(imgSelector).setAttribute("src", randomImageSource);
}

function highestOfThree(a, b, c) {
  return Math.max(a, b, c);
}

function rollsMatch(p1, p2) {
  // Compare two arrays of rolls to see if they contain the same values (regardless of order)
  var s1 = [...p1].sort((x, y) => x - y).join(",");
  var s2 = [...p2].sort((x, y) => x - y).join(",");
  return s1 === s2;
}

function rollAllDice() {
  // Rolls 3 dice for Player 1
  var p1d1 = rollDie();
  var p1d2 = rollDie();
  var p1d3 = rollDie();

  // Rolls 3 dice for Player 2
  var p2d1 = rollDie();
  var p2d2 = rollDie();
  var p2d3 = rollDie();

  // Sets images to the dices rolled
  setDieImage(".p1d1", p1d1);
  setDieImage(".p1d2", p1d2);
  setDieImage(".p1d3", p1d3);

  setDieImage(".p2d1", p2d1);
  setDieImage(".p2d2", p2d2);
  setDieImage(".p2d3", p2d3);

  // Calculates the total dice value for each player
  var p1Total = p1d1 + p1d2 + p1d3;
  var p2Total = p2d1 + p2d2 + p2d3;

  // Formula to decide the winner
  if (p1Total > p2Total) {
    document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
  } else if (p2Total > p1Total) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
  } else {
    // tie on total -> highest single die wins
    var p1High = highestOfThree(p1d1, p1d2, p1d3);
    var p2High = highestOfThree(p2d1, p2d2, p2d3);

    if (p1High > p2High) {
      document.querySelector("h1").innerHTML = "🚩 Player 1 Wins (High Die)!";
    } else if (p2High > p1High) {
      document.querySelector("h1").innerHTML = "Player 2 Wins (High Die)! 🚩";
    } else {
      // if highest die also ties, only declare draw if highest dice rolls match
      if (rollsMatch([p1d1, p1d2, p1d3], [p2d1, p2d2, p2d3])) {
        document.querySelector("h1").innerHTML = "Draw! (Same Rolls)";
      } else {
        // totals tie + highest die tie, but not identical rolls
        document.querySelector("h1").innerHTML = "Draw!";
      }
    }
  }
}

// Roll once on page load
rollAllDice();

// Reroll button
document.querySelector("#rollBtn").addEventListener("click", rollAllDice);
