$(() => {
  console.log('JS Loaded');

  const $map = $('.map');

  const $welcome = $('.welcome');
  const $quizSelect = $('.quiz-select');
  const $chosenQuiz = $('.chosen-quiz');
  const $startGameButton = $('.start-game-button');
  const $question = $('.question');
  const $roundQuestion = $('.round-question');
  const $startRoundButton = $('.start-round-button');
  const $player1Flag = $('.player-one-flag');
  const $player2Flag = $('.player-two-flag');
  const $player2sTurn = $('.player-twos-turn');
  const $player2sTurnButton = $('.player-twos-turn-button');
  const $answerLocation = $('.answer-location');
  const $endOfRound = $('.end-of-round');
  const $p1DistanceAway = $('.p1-distance-away');
  const $p2DistanceAway = $('.p2-distance-away');
  const $player1Score = $('.player-1-score');
  const $player2Score = $('.player-2-score');
  const $nextRoundButton = $('.next-round-button');
  const $endOfGame = $('.end-of-game');
  const $p1OverallDistance = $('.p1-overall-distance-from-targets');
  const $p2OverallDistance = $('.p2-overall-distance-from-targets');
  const $winner = $('.winner');
  const $playAgainButton = $('.play-again-button');



  let difficulty = 0;
  let roundQuestionName = null;

  let player1ClickX = 0;
  let player1ClickY = 0;
  let player2ClickX = 0;
  let player2ClickY = 0;


  let player1Turn = true;
  let roundNumber = 0;
  let player1Hypotenuse = 0;
  let player2Hypotenuse = 0;
  let player1DistanceFromTargetInM = 0;
  let player2DistanceFromTargetInM = 0;
  let mapPlayable = false;

  let playerOneScore = 0;
  let playerTwoScore = 0;

  let playerOneOverallDistance = 0;
  let playerTwoOverallDistance = 0;

  let winner = '';





  //Questions and Rounds

//Easy quiz
  const questionsObject = {
    easy: [
      {
        name: 'The O2 Centre',
        xLocation: 82,
        yLocation: 58
      },
      {
        name: 'Buckingham Palace',
        xLocation: 29,
        yLocation: 60
      },
      {
        name: 'Kings Cross Station',
        xLocation: 37,
        yLocation: 30
      },
      {
        name: 'General Assembly',
        xLocation: 54,
        yLocation: 45
      },
      {
        name: 'Big Ben',
        xLocation: 36,
        yLocation: 61
      }
    ],
    medium: [
      {
        name: 'Lord\'s Cricket Ground',
        xLocation: 19,
        yLocation: 32
      },
      {
        name: 'Chelsea FC',
        xLocation: 11,
        yLocation: 81
      },
      {
        name: 'Charlton FC',
        xLocation: 95,
        yLocation: 76
      },
      {
        name: 'Lee Valley Velodrome',
        xLocation: 74,
        yLocation: 12
      }
    ],
    hard: [
      {
        name: 'Baker Street Station',
        xLocation: 25,
        yLocation: 38
      },
      {
        name: 'Green Park Station',
        xLocation: 29,
        yLocation: 54
      },
      {
        name: 'Farringdon Station',
        xLocation: 43,
        yLocation: 41
      },
      {
        name: 'Angel Station',
        xLocation: 43,
        yLocation: 29
      },
      {
        name: 'Camden Town Station',
        xLocation: 28,
        yLocation: 22
      }
    ],
    veryHard: [
      {
        name: 'Granary Square',
        xLocation: 36,
        yLocation: 26
      },
      {
        name: 'Finsbury Square',
        xLocation: 50,
        yLocation: 40
      },
      {
        name: 'Grosvenor Square',
        xLocation: 26,
        yLocation: 49
      },
      {
        name: 'Lincoln Inn\'s Fields',
        xLocation: 39,
        yLocation: 45
      },
      {
        name: 'Russell Square',
        xLocation: 35,
        yLocation: 39
      }
    ]
  };

// which set of questions to use?

  let questionsArray = 0;

  //Get the name of the landmark for each question


  //welcome page


  setTimeout(() => {




    $welcome.show();
    $quizSelect.on('change', (e) => {
      difficulty = $(e.target).val();

      const chosenDifficulty = $(`.quiz-select option[value=${difficulty}]`).html();

      $chosenQuiz.text(chosenDifficulty);

      questionsArray = questionsObject[difficulty];

      // $map.addClass(value from drop down)

      console.log(difficulty);

    });
  }, 1000);

  //click start game button to hide the welcome div and show the first question

  $startGameButton.on('click', () => {
    console.log($welcome);
    $welcome.hide();

    roundQuestionName = questionsArray[roundNumber].name;




    // question div pops up

    setTimeout(() => {
      //get the name of the landmark from the name value in the object in the array.
      $roundQuestion.text(roundQuestionName);
      console.log(roundQuestionName);
      $question.show();
    }, 250);
  });


  //Hide question div
  $startRoundButton.on('click', () => {
    $question.hide();
    mapPlayable = true;
  });






  //Player1Click Event




  $map.on('click', (e) => {
    if (mapPlayable === true) {

      if (player1Turn === true) {

        //find click coordinates in pixels
        // console.log(e.pageX);
        // console.log(e.pageY);
        player1ClickX = e.pageX - $(e.target).position().left;
        player1ClickY = e.pageY - $(e.target).position().top;

        //convert pageX and pageY pixels to percentage of page
        const player1ClickXPercentOfWindow = (player1ClickX / $map.width())*100;
        const player1ClickYPercentOfWindow = (player1ClickY / $map.height())*100;

        console.log(player1ClickXPercentOfWindow);
        console.log(player1ClickYPercentOfWindow);


        //Distance to target
        console.log('questions array [0]', questionsArray[0]);
        const player1distanceToTargetX =  player1ClickXPercentOfWindow - questionsArray[roundNumber].xLocation;


        const player1distanceToTargetY = player1ClickYPercentOfWindow - questionsArray[roundNumber].yLocation;


        player1Hypotenuse = Math.floor(Math.sqrt(Math.pow(player1distanceToTargetX, 2) + Math.pow(player1distanceToTargetY, 2)));


//add player one flag

        $player1Flag.css({
          'left': player1ClickXPercentOfWindow + '%',
          'top': player1ClickYPercentOfWindow + '%',
          'display': 'inline'
        });

//reveal player 2s turn div

        $player2sTurn.show();
        mapPlayable = false;
        player1Turn = false;

      } else if (player1Turn === false) {

        //player 2 click coordinates
        player2ClickX = e.pageX - $(e.target).position().left;
        player2ClickY = e.pageY - $(e.target).position().top;

        //convert player 2 click to percentage

        const player2ClickXPercentOfWindow = Math.round((player2ClickX / $map.width())*100);
        const player2ClickYPercentOfWindow = Math.round((player2ClickY / $map.height())*100);

        console.log(player2ClickXPercentOfWindow);
        console.log(player2ClickYPercentOfWindow);


        //player 2 distance to target

        const player2distanceToTargetX =  player2ClickXPercentOfWindow - questionsArray[roundNumber].xLocation;

        const player2distanceToTargetY = player2ClickYPercentOfWindow - questionsArray[roundNumber].yLocation;

        player2Hypotenuse = Math.floor(Math.sqrt(Math.pow(player2distanceToTargetX, 2) + Math.pow(player2distanceToTargetY, 2)));

        // console.log('distance from target ' + player2Hypotenuse);

        // add player 2 flag
        $player2Flag.css({
          'left': player2ClickXPercentOfWindow + '%',
          'top': player2ClickYPercentOfWindow + '%',
          'display': 'inline'
        });

        // Win round logic
        if (player1Hypotenuse < player2Hypotenuse) {
          console.log('player 1 wins this round!');
          playerOneScore ++;
        } else if
        (player1Hypotenuse === player2Hypotenuse) {
          console.log('its a tie!');
        } else {
          console.log('player 2 wins this round!');
          playerTwoScore ++;
        }

        player1DistanceFromTargetInM = (1000 / 6)* player1Hypotenuse;
        player2DistanceFromTargetInM = (1000 / 6)* player2Hypotenuse;

        console.log('Player 1 clicked ' + player1DistanceFromTargetInM + 'm away from the target');

        console.log('Player 2 clicked ' + player2DistanceFromTargetInM + 'm away from the target');




//reveal target location

        setTimeout( () => {
          $answerLocation.css({
            'left': (questionsArray[roundNumber].xLocation)- $(e.target).position().left + '%',
            'top': (questionsArray[roundNumber].yLocation)- $(e.target).position().top + '%',
            'display': 'inline'
          });
        }, 1000);

//reveal end of round div
        setTimeout( () => {
          mapPlayable = false;
          $endOfRound.show();

          player1DistanceFromTargetInM = Math.round(player1DistanceFromTargetInM);
          player2DistanceFromTargetInM = Math.round(player2DistanceFromTargetInM);

          console.log(player1DistanceFromTargetInM);
          console.log(player2DistanceFromTargetInM);

          playerOneOverallDistance += player1DistanceFromTargetInM;
          playerTwoOverallDistance += player2DistanceFromTargetInM;

          $p1DistanceAway.html(player1DistanceFromTargetInM);
          $p2DistanceAway.html(player2DistanceFromTargetInM);

          $player1Score.text(playerOneScore);
          $player2Score.text(playerTwoScore);

          $p1OverallDistance.text(playerOneOverallDistance);
          $p2OverallDistance.text(playerTwoOverallDistance);


        }, 2000);

        // console.log(roundQuestionName);

      }
    }
  });






  $player2sTurnButton.on('click', () => {
    mapPlayable = true;
    $player2sTurn.hide();
  });



//click on Next Round button
  $nextRoundButton.on('click', () => {

    $endOfRound.hide();
    $answerLocation.hide();
    $player1Flag.hide();
    $player2Flag.hide();
    console.log('questionsArray length' +  questionsArray.length);


    roundNumber++;


    if (roundNumber >= questionsArray.length) {
      console.log('end game sequence');
      $endOfGame.show();
      $player1Score.text(playerOneScore);
      $player2Score.text(playerTwoScore);

      $p1OverallDistance.text(playerOneOverallDistance);
      $p2OverallDistance.text(playerTwoOverallDistance);

      if (playerOneScore > playerTwoScore) {
        winner = 'Player One';
      } else {
        winner = 'Player Two';
      }
      $winner.text(winner);
      $playAgainButton.on('click', () => {
        $endOfGame.hide();
        $welcome.show();
      });

    } else {

      console.log(roundNumber);
      roundQuestionName = questionsArray[roundNumber].name;
      player1Turn = true;
      $roundQuestion.text(roundQuestionName);

      setTimeout( () => {
        $question.css({
          'display': 'inline'
        });
      }, 250);
    }
  });

});






//If player1 clicks on the o2 console.log 'Bullseye!'
// if (player1ClickXPercentOfWindow === questionsArray[roundNumber].xLocation && player1ClickYPercentOfWindow === questionsArray[roundNumber].yLocation) {
//   console.log('bullseye!');
// }
//
// if (player1ClickXPercentOfWindow === buckinghamPalaceObj.xLocation && buckinghamPalaceObj.yLocation) {
//   console.log('Behave Phillip');
// }
