window.addEventListener("resize", function () {
  resize();
});
function resize(start) {
  var height = document.body.getBoundingClientRect().height;
  var width = document.body.getBoundingClientRect().width;
  var canvas = document.getElementById("myCanvas");
  canvas.width = width;
  canvas.height = height;
  render(start);
}
// Convert degrees to radians
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function render(start) {
  
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  var height = c.getBoundingClientRect().height;
  var width = c.getBoundingClientRect().width;
  // Clear, must come first
  ctx.clearRect(0, 0, width, height);

  // TOP TRIANGLE
  ctx.beginPath();
  // Move to top right side
  ctx.moveTo(width, 0);

  // Move to top side
  ctx.lineTo(width - width * start, 0);

  ctx.lineTo(
    width,
    -(width - (width - width * start)) * Math.tan(degreesToRadians(300))
  );
  ctx.lineTo(width, 0);
  ctx.closePath();

  // Set the fill color
  ctx.fillStyle = "#D21F3C";
  ctx.fill();

  
  // BOTTOM TRIANGLE
  ctx.beginPath();
  ctx.moveTo(0,height);
  ctx.lineTo(width*start,height)
  ctx.lineTo(0,)
  ctx.lineTo(0,height)
  ctx.closePath();
  ctx.fillStyle = "#D21F3C";
  ctx.fill();
}

resize(0.5)

