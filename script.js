window.addEventListener("resize", function () {
  resize();
});
function resize() {
  var height = document.body.getBoundingClientRect().height;
  var width = document.body.getBoundingClientRect().width;
  var canvas = document.getElementById("myCanvas");
  canvas.width = width;
  canvas.height = height;
  render();
}
// Convert degrees to radians
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function render(iter) {
  const start = 0.5;
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  var height = c.getBoundingClientRect().height;
  var width = c.getBoundingClientRect().width;
  // Clear, must come first
  ctx.clearRect(0, 0, width, height);

  
  // TOP TRIANGLE
  ctx.beginPath();
  // Move to top right side
  ctx.moveTo(width, height,);
  
  // Move to top side
  ctx.lineTo(width - width*start, height);
  
  // Intersecting with right side?
  (width - width*start)
  
  
  //
}

resize();
console.log(degreesToRadians(330))
