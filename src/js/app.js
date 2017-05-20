$(() => {
  console.log('JS Loaded');

  const $map = $('.map');
  const $player1Flag = $('.player-one-flag');
  const $player2Flag = $('.player-two-flag');
  const $answerLocation = $('.answer-location');
  let player1ClickX = 0;
  let player1ClickY = 0;
  let player2ClickX = 0;
  let player2ClickY = 0;
  let player1Turn = true;
  let roundNumber = 0;
  let player1Hypotenuse = 0;
  let player2Hypotenuse = 0;

    // const player1FlagObj = {left: player1ClickX, top: player1ClickY, display: none};
    // const player2FlagObj = {left: player2ClickX, top: player2ClickY, display: none};



//Questions and Rounds


  const o2CentreObj = {xLocation: 84, yLocation: 59};
  const buckinghamPalaceObj = {xLocation: 28, yLocation: 61};
  const kingsCrossObj = {xLocation: 33, yLocation: 32};

  const questionsArray = [o2CentreObj, buckinghamPalaceObj, kingsCrossObj];


//Player1Click Event
  $map.on('click', (e) => {

    if (player1Turn === true) {
    // console.log('clicked on div');

  //find click coordinates in pixels
    // console.log(e.pageX);
    // console.log(e.pageY);
      player1ClickX = e.pageX;
      player1ClickY = e.pageY;

//convert pageX and pageY pixels to percentage of page
      const player1ClickXPercentOfWindow = Math.round((player1ClickX / $(window).width())*100);
      const player1ClickYPercentOfWindow = Math.round((player1ClickY / $(window).height())*100);

      console.log(player1ClickXPercentOfWindow);
      console.log(player1ClickYPercentOfWindow);


//Distance to target

      const player1distanceToTargetX =  player1ClickXPercentOfWindow - questionsArray[roundNumber].xLocation;


      const player1distanceToTargetY = player1ClickYPercentOfWindow - questionsArray[roundNumber].yLocation;


    // console.log('Player 1 Distance to Target X as % ' + player1distanceToTargetX);
    // console.log('Player 1 Distance to Target Y as % ' + player1distanceToTargetY);


//change this to a function that can be called for either player
      player1Hypotenuse = Math.floor(Math.sqrt(Math.pow(player1distanceToTargetX, 2) + Math.pow(player1distanceToTargetY, 2)));

      console.log('distance from target ' + player1Hypotenuse);

    // $body.appendTo('<div class="playerOneFlag" position(player1coordinates)></div>');



      player1Turn = false;
      console.log('player 2 turn');


      //add a flag at the click location


      $player1Flag.css({
        'left': player1ClickXPercentOfWindow + '%',
        'top': player1ClickYPercentOfWindow + '%',
        'display': 'inline'
      });



    } else {

      //player 2 click coordinates
      player2ClickX = e.pageX;
      player2ClickY = e.pageY;

      //convert player 2 click to percentage

      const player2ClickXPercentOfWindow = Math.round((player2ClickX / $(window).width())*100);
      const player2ClickYPercentOfWindow = Math.round((player2ClickY / $(window).height())*100);


//player 2 distance to target



      const player2distanceToTargetX =  player2ClickXPercentOfWindow - questionsArray[roundNumber].xLocation;

      const player2distanceToTargetY = player2ClickYPercentOfWindow - questionsArray[roundNumber].yLocation;

      player2Hypotenuse = Math.floor(Math.sqrt(Math.pow(player2distanceToTargetX, 2) + Math.pow(player2distanceToTargetY, 2)));

// Win round logic
      if (player1Hypotenuse < player2Hypotenuse) {
        console.log('player 1 wins this round!');
      } else {
        console.log('player 2 wins this round!');
      }

// add player 2 flag
      $player2Flag.css({
        'left': player2ClickXPercentOfWindow + '%',
        'top': player2ClickYPercentOfWindow + '%',
        'display': 'inline'
      });


//reveal target location

      setInterval( () => {
        $answerLocation.css({
          'left': questionsArray[roundNumber].xLocation + '%',
          'top': questionsArray[roundNumber].yLocation + '%',
          'display': 'inline'
        });
      }, 2000);


//reveal end of round div



      // console.log('Player 1 Turn');
      // player1Turn = true;
      // roundNumber += 1;
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
