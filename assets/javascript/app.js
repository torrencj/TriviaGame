//globals


var bridgeOfDeath = [
  {
    q:"What is your name?",
    wa:["Sir Lancelot of Camelot","wrong","wrong","wrong"]
  },
  {
    q:"What is your quest?",
    wa:["Sir Lancelot of Camelot","wrong","wrong","wrong"]
  },
  {
    q:"What is your favorite color?",
    wa:["Sir Lancelot of Camelot","wrong","wrong","wrong"]
  }
]

var currentQuestion = 0;
var answers;

// functions

function loadGame(game) {

}

function randomize(array) {

  // var array = [];
  var myindex = 0;
  var temp;
  for (var i = 0; i < array.length; i++) {
    myindex = Math.floor(Math.random() * i+1);
    temp = array[i];
    array[i] = array[myindex];
    array[myindex] = temp;
  }
  return array;
}


function makeAnswerKey(max) {
  var array = [];

  for (var i = 0; i < max; i++) {
    array[i] = i;
  }

  var myindex = 0;
  var temp;
  for (var i = 0; i < max; i++) {
    myindex = random(i);
    temp = array[i];
    array[i] = array[myindex];
    array[myindex] = temp;
  }
  return array;
}

function random(max) {
  return Math.floor(Math.random() * max+1);
}

function done() {
  console.log("we're done!");
  $("#q-1").html("<h1> We're done!</h1>")
  $(".answer-wrapper").css("display", "none");

}

function reset() {
  currentQuestion = 0;
  $("#q-start").css("display", "block");
  $("#q-1").css("display", "none");
}

function nextquestion() {
  // currentQuestion++;
  if (currentQuestion >= bridgeOfDeath.length) {
    reset();
  } else {
    answers = makeAnswerKey(bridgeOfDeath[currentQuestion].wa.length);
    for (var i = 0; i < answers.length; i++) {
      $("#answer"+(i+1)).text(bridgeOfDeath[currentQuestion].wa[answers[i]]);
    }

    $("#q-1").html("<h1>" + bridgeOfDeath[currentQuestion].q + "</h1>")
    $("#q-1").css("display", "block");
    $(".answer-wrapper").css("display", "grid");
  }
  currentQuestion++;
}

$( document ).ready(function() {
    console.log( "ready!" );
    //generate HTML

    //add event/clickhandlers/listeners/etc
    $("#start-button").click(function(){

      $("#q-start").css("display", "none");

      nextquestion();
      // var answers = randomize();

    })

    $(".answerbutton").click(function() {
      // console.log(currentQuestion);

    if (currentQuestion <= (bridgeOfDeath.length - 1)) {
      if ($(this).text() === bridgeOfDeath[currentQuestion].wa[0]) {
        console.log("Winner");
      } else {
        console.log("loser");
      }
      nextquestion();
    } else {
      done();
    }

      // currentQuestion++;
      // console.log(currentQuestion);

    })

    //initialize vars, etc

    //go!


}); //document ready function
