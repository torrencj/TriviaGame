//globals


var bridgeOfDeath = [
  {
    q:"What is your name?",
    a:["Sir Lancelot of Camelot","wrong","wrong","wrong"]
  },
  {
    q:"What is your quest?",
    a:["I seek the Grail","wrong","wrong","wrong"]
  },
  {
    q:"What is your favorite color?",
    a:["Blue","wrong","wrong","wrong"]
  }
]

var bridgeOfDeathGame = {

  welcomeMsg: "STOP! He who would cross the bridge of death must answer me these questions three, ere the other side he see...",
  failureMsg: "has been cast into the gorge of eternal peril!",
  interimMsg: "Right, off you go then.",
  winMsg: "Huh? I don't know that -- AIEEEEEEEE",

  mainData: [
    {
      name:"Lancelot",
      questions: [
        {
          q:"What is your name?",
          a:["Sir Lancelot of Camelot","wrong","wrong","wrong"]
        },
        {
          q:"What is your quest?",
          a:["To seek the Holy Grail","wrong","wrong","wrong"]
        },
        {
          q:"What is your favorite color?",
          a:["Blue","wrong","wrong","wrong"]
        }
      ]
    },
    {
      name:"Robin",
      questions: [
        {
          q:"What is your name?",
          a:["Sir Robin of Camelot","wrong","wrong","wrong"]
        },
        {
          q:"What is your quest?",
          a:["To see the Holy Grail","wrong","wrong","wrong"]
        },
        {
          q:"What is the capital of Assyria?",
          a:["Aššur","I don't know that!","wrong","wrong"]
        }
      ]
    },
    {
      name:"Gallahad",
      questions: [
        {
          q:"What is your name?",
          a:["Sir Gallahad of Camelot","wrong","wrong","wrong"]
        },
        {
          q:"What is your quest?",
          a:["I seek the Grail","wrong","wrong","wrong"]
        },
        {
          q:"What is your favorite color?",
          a:["Blue","Blue... no ye-","wrong","wrong"]
        }
      ]
    },
    {
      name:"Arthur, King of the Britons",
      questions: [
        {
          q:"What is your name?",
          a:["Arthur, King of the Britons","wrong","wrong","wrong"]
        },
        {
          q:"What is your quest?",
          a:["To seek the Holy Grail","wrong","wrong","wrong"]
        },
        {
          q:"What is the air speed velocity of an unladen swallow?",
          a:["What do you mean? African or European swallow?","wrong","wrong","wrong"]
        }
      ]
    }
  ]
}

var numWrong = 0;
var currentQuestion = 0;
var currentCharacter = 0;
var answers;

// functions

function randomize(array) {
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
  currentQuestion = 0;
  $(".answer-wrapper").css("display", "none");

  if (currentCharacter < bridgeOfDeathGame.mainData.length - 1) {
    $("#q-1 h1").remove();
    $("#q-1").append("<h3>"+bridgeOfDeathGame.interimMsg+"</h3>")
    $("#game-image").attr("src","assets/images/meeting.png")
    currentCharacter++;
    setTimeout(nextquestion, 3000)
  } else {
    $("#q-1").html("<h1>We're done!</h1>")

    showFinal();

    // setTimeout(reset, 5000);
  }

}

function showFinal() {
  $("#stat-screen").css("display","block");
  $("#stat-screen").append("<h3>Wrong Answers: "+numWrong+"</h3>")

  if (numWrong == 0) {
    $("#game-image").attr("src","assets/images/party.gif")

  } else {
    $("#game-image").attr("src","assets/images/sad.gif")

  }

}

function reset() {
  $("#game-image").attr("src","assets/images/meeting.png")
  $("#stat-screen").css("display","none");
  $("#stat-screen").empty();

  currentQuestion = 0;
  currentCharacter = 0;
  $("#q-start").css("display", "block");
  $("#q-1").css("display", "none");
}

function nextquestion() {
  $("#game-image").attr("src","assets/images/oldman.jpg")

  if (currentCharacter >= bridgeOfDeathGame.mainData.length) {
    done();
  } else {
    if (currentQuestion >= bridgeOfDeathGame.mainData[currentCharacter].questions.length) {
      done();
    } else {
      answers = makeAnswerKey(bridgeOfDeathGame
                              .mainData[currentCharacter]
                              .questions[0]
                              .a
                              .length);

      for (var i = 0; i < answers.length; i++) {
        console.log(currentQuestion);
        $("#answer"+(i+1)).text(bridgeOfDeathGame
                                .mainData[currentCharacter]
                                .questions[currentQuestion]
                                .a[answers[i]]);

      }

      $("#q-1").html("<h1>" + bridgeOfDeathGame
                              .mainData[currentCharacter]
                              .questions[currentQuestion]
                              .q
                            + "</h1>");

      $("#q-1").css("display", "block");
      $(".answer-wrapper").css("display", "grid");

      currentQuestion++;
    }
  }
}

$( document ).ready(function() {
    console.log( "ready!" );

    //event/clickhandlers/listeners/etc
    $("#start-button").click(function(){
      $("#q-start").css("display", "none");
      nextquestion();
    })

    $("#reset-button").click(function() {
      reset();
    })

    $(".answerbutton").click(function() {

      if (currentQuestion <= (bridgeOfDeathGame.mainData.length)) {
        if ($(this).text() === bridgeOfDeathGame
                                .mainData[currentCharacter]
                                .questions[currentQuestion - 1]
                                .a[0]) {

          console.log("Winner");

          $("#q-1").html(
            "<h1>"
            + "Correct, next question."
            + "</h1>"
          );

        } else {
          console.log("loser");
          numWrong++;

          $("#game-image").attr("src","assets/images/death.png")

          $("#q-1").html(
            "<h1>"
            + bridgeOfDeathGame.mainData[currentCharacter].name
            + " "
            + bridgeOfDeathGame.failureMsg
            + "</h1>"
          );

          currentCharacter++;
          currentQuestion = 0;
        }

        $(".answer-wrapper").css("display", "none");
        setTimeout(nextquestion, 1000);

      }

    });

}); //document ready function
