window.addEventListener("resize", function () {
  resize(0.6);
});

var fill_frames = 60;
var blackout_frames = 30 ;

var frames = fill_frames + blackout_frames;
var counter = 0;

function resize() {
  var height = document.body.getBoundingClientRect().height;
  var width = document.body.getBoundingClientRect().width;
  var canvas = document.getElementById("myCanvas");
  canvas.width = width;
  canvas.height = height;
  render(counter);
}
// Convert degrees to radians
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function render(iteration) {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  var height = c.getBoundingClientRect().height;
  var width = c.getBoundingClientRect().width;

  // Only take 30 frames
  var fill_start =
    ((iteration / fill_frames) *
      (width - height / Math.tan(degreesToRadians(300)))) /
    (2 * width);
  // Only take 30 frames, start on 80% fill
  var blackout_start =
    (((iteration - fill_frames*0.8) *2/ blackout_frames) *
      
      (width - height / Math.tan(degreesToRadians(300)))) /
    (2 * width);
  // Clear, must come first
  ctx.clearRect(0, 0, width, height);

  // TOP TRIANGLE
  ctx.beginPath();
  // Move to top right side
  ctx.moveTo(width, 0);

  // Move to top side
  ctx.lineTo(width - width * fill_start, 0);

  ctx.lineTo(
    width,
    -(width - (width - width * fill_start)) * Math.tan(degreesToRadians(300))
  );

  ctx.lineTo(width, 0);
  ctx.closePath();

  // Set the fill color
  ctx.fillStyle = "#D21F3C";
  ctx.fill();

  // BOTTOM TRIANGLE
  ctx.beginPath();
  // Move to bottom left side
  ctx.moveTo(0, height);

  // Move to bottom side
  ctx.lineTo(width * fill_start, height);

  ctx.lineTo(0, height + width * fill_start * Math.tan(degreesToRadians(300)));
  ctx.lineTo(0, height);
  ctx.closePath();

  // Set the fill color
  ctx.fillStyle = "#D21F3C";
  ctx.fill();

  // Fill in the gap
  if (iteration >= 1) {
    ctx.moveTo(width - width * fill_start, 0);
    ctx.lineTo(
      width,
      -(width - (width - width * fill_start)) * Math.tan(degreesToRadians(300))
    );
    ctx.strokeStyle = "#D21F3C";
    ctx.stroke();
  }

  // If on frame 25 or onward
  if (blackout_start >= 0) {
    console.log(blackout_start);
    // BLACKOUT TRIANGLE
    ctx.beginPath();
    // Move to top left side
    ctx.moveTo(0, 0);

    // Move to top side
    ctx.lineTo(width * blackout_start, 0);

    ctx.lineTo(0, width * blackout_start * Math.tan(degreesToRadians(240)));

    ctx.lineTo(0, 0);
    ctx.closePath();

    // Set the fill color
    ctx.fillStyle = "#1D1A20";
    ctx.fill();
  }

  counter++;
  if (counter <= frames) {
    requestAnimationFrame(function () {
      resize();
    });
  }
}

requestAnimationFrame(function () {
  resize();
});
