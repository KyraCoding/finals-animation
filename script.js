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
function render() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  var height = c.getBoundingClientRect().height;
  var width = c.getBoundingClientRect().width;
  ctx.moveTo(0, 0);
  ctx.lineTo(width, height);
  ctx.stroke();
}

// start
resize();
