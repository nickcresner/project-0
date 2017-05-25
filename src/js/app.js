$(() => {
  console.log('JS Loaded');

  const $map = $('.map');

  const $welcome = $('.welcome');
  const $mapSelect = $('.map-select');
  const $chosenMap = $('.chosen-map');
  const $quizSelect = $('.quiz-select');
  const $chosenQuiz = $('.chosen-quiz');
  const $startGameButton = $('.start-game-button');
  const $question = $('.question');
  const $roundQuestion = $('.round-question');
  const $startRoundButton = $('.start-round-button');
  const $countdownTimer = $('.countdown-timer');
  const $timeUp = $('.time-up');
  const $countdownNextButton = $('.countdown-next-button');
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

  let difficulty = null;
  let city = null;

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

  // which set of questions to use?

  let questionsArray = 0;

  //Get the name of the landmark for each question


  //welcome page


  setTimeout(() => {

    $welcome.show();

    $mapSelect.on('change', (e) => {
      city = $(e.target).val();
      const chosenCity = $(`.map-select option[value=${city}]`).html();

      $chosenMap.text(chosenCity);

      $map.removeAttr('class').addClass('map').addClass(city);

      $quizSelect
        .removeClass('selected')
        .filter(`.${city}`)
        .addClass('selected');
    });

    $quizSelect.on('change', (e) => {
      difficulty = $(e.target).val();
      console.log('quiz select array in event listener', $quizSelect);
      console.log(city);

      const chosenDifficulty = $(`.quiz-select.${city} option[value=${difficulty}]`).html();

      $chosenQuiz.text(chosenDifficulty);

      questionsArray = window.questions[city][difficulty];


    });
  }, 1000);

  //click start game button to hide the welcome div and show the first question

  $startGameButton.on('click', () => {
    if(!city || !difficulty)
      return false;

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

  //countdown timer


  let timerId = null;
  let timerIsRunning = false;
  let timeRemaining = 30;

  function startCountdownTimer() {


    timerId = setInterval(() => {
      if (timerIsRunning === true) {
        timeRemaining --;
        $countdownTimer.html(timeRemaining);

        if (timeRemaining === 0) {
          clearInterval(timerId);
          $countdownTimer.hide();
          $timeUp.show();
          mapPlayable = false;
          if (player1Turn === true) {
            playerOneScore += 5000;
          } else {
            playerTwoScore += 5000;
          }
        }
      }
    }, 1000);
  }

  $countdownNextButton.on('click', () => {
    if (player1Turn === true) {
      $player2sTurn.show();
      $timeUp.hide();
      player1Turn = false;
    } else {
      $endOfRound.show();
      $timeUp.hide();
    }
  });

  //Hide question div
  $startRoundButton.on('click', () => {
    $question.hide();
    mapPlayable = true;
    timerIsRunning = true;
    timeRemaining = 30;
    $countdownTimer.show();
    startCountdownTimer();
    timerIsRunning = true;

  });


  //Player1Click Event
  $map.on('click', (e) => {
    if (mapPlayable === true) {

      timerIsRunning = false;
      clearInterval(timerId);

      if (player1Turn === true) {


        //find click coordinates in pixels

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

        const player2ClickXPercentOfWindow = (player2ClickX / $map.width())*100;
        const player2ClickYPercentOfWindow = (player2ClickY / $map.height())*100;

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

          playerOneScore ++;
        } else if
        (player1Hypotenuse === player2Hypotenuse) {
          playerOneScore ++;
          playerTwoScore ++;
        } else {
          playerTwoScore ++;
        }

        player1DistanceFromTargetInM = (1000 / 6)* player1Hypotenuse;
        player2DistanceFromTargetInM = (1000 / 6)* player2Hypotenuse;



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
    $countdownTimer.show();
    timeRemaining = 30;
    timerIsRunning = true;
    startCountdownTimer();
  });



  //click on Next Round button
  $nextRoundButton.on('click', () => {

    $endOfRound.hide();
    $answerLocation.hide();
    $player1Flag.hide();
    $player2Flag.hide();

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
      } else if (playerOneScore === playerTwoScore) {
        winner = 'It\'s a Tie!';
      } else {
        winner = 'Player Two';
      }
      $winner.text(winner);
      $playAgainButton.on('click', () => {
        $endOfGame.hide();
        $welcome.show();
        roundNumber = 0;
        playerOneOverallDistance = 0;
        playerTwoOverallDistance = 0;
        playerOneScore = 0;
        playerTwoScore = 0;
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
