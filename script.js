window.addEventListener("resize", function () {
  resize(0.6);
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
  // Move to bottom left side
  ctx.moveTo(0, height);

  // Move to bottom side
  ctx.lineTo(width * start, height);

  ctx.lineTo(0, height + width * start * Math.tan(degreesToRadians(300)));
  ctx.lineTo(0, height);
  ctx.closePath();

  // Set the fill color
  ctx.fillStyle = "#D21F3C";
  ctx.fill();
  
  ctx.moveTo((-height-(width - width * start))/Math.tan(degreesToRadians(300)),height);
  ctx.lineTo((-height-(width - width * start))/Math.tan(degreesToRadians(300)),0)
  ctx.stroke();
  //alert(width*start)
}

resize(0.5);
