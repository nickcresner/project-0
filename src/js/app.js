$(() => {
  console.log('JS Loaded');

  const $map = $('.map');

  const $welcome = $('.welcome');
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
  const $winner = $('.winner');

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

  let winner = '';





  //Questions and Rounds


  const o2CentreObj = {name: 'The O2 Centre', xLocation: 82, yLocation: 58};
  const buckinghamPalaceObj = {name: 'Buckingham Palace', xLocation: 28, yLocation: 61};
  const kingsCrossObj = {name: 'Kings Cross Station', xLocation: 33, yLocation: 32};
  const generalAssemObj = {name: 'General Assembly', xLocation: 54, yLocation: 45};
  const questionsArray = [o2CentreObj, buckinghamPalaceObj, kingsCrossObj, generalAssemObj];

  let roundQuestionName = (questionsArray[roundNumber]).name;


  //welcome page

  setTimeout(() => {
    $welcome.show();
  }, 1000);

  //click start game button to hide the welcome div and show the first question

  $startGameButton.on('click', () => {
    console.log($welcome);
    $welcome.hide();

    // question div pops up

    setTimeout(() => {
      //get the name of the landmark from the name value in the object in the array.
      $roundQuestion.text(roundQuestionName);
      console.log(roundQuestionName);
      $question.show();
    }, 500);
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

          $p1DistanceAway.html(player1DistanceFromTargetInM);
          $p2DistanceAway.html(player2DistanceFromTargetInM);

          $player1Score.text(playerOneScore);
          $player2Score.text(playerTwoScore);


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


    roundNumber++;
    console.log(roundNumber);
    roundQuestionName = (questionsArray[roundNumber]).name;
    player1Turn = true;
    $roundQuestion.text(roundQuestionName);

    if (roundNumber === 3) {
      $endOfGame.show();
      $player1Score.text(playerOneScore);
      $player2Score.text(playerTwoScore);

      if (playerOneScore > playerTwoScore) {
        winner = 'Player One';
      } else {
        winner = 'Player Two';
      }
      $winner.text(winner);

    } else {

      setTimeout( () => {
        $question.css({
          'display': 'inline'
        });
      }, 500);
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
