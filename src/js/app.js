$(() => {
  console.log('JS Loaded');


  const $map = $('div');
  let userClickX = 0;
  let userClickY = 0;

  const $o2Centre = $('#o2');
  const o2CentreObj = {xLocation: 817, yLocation: 510};

  console.log(o2CentreObj.xLocation);
  console.log(o2CentreObj.yLocation);

  $map.on('click', (e) => {
    console.log('clicked on div');
    console.log(e.pageX);
    console.log(e.pageY);
    userClickX = e.pageX;
    userClickY = e.pageY;

    if (userClickX === o2CentreObj.xLocation && userClickY === o2CentreObj.yLocation) {
      console.log('bullseye!');
    }
  });

});
