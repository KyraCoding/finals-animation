window.addEventListener("resize", function () {
  resize(0.6);
});

var fill_frames = 60;
var blackout_frames = 30;
var pause_frames = 60;
var fadeout_frames = 15;

var frames = fill_frames + blackout_frames + pause_frames + fadeout_frames;
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
    ((((iteration - fill_frames * 0.8) * 2) / blackout_frames) *
      (width - height / Math.tan(degreesToRadians(300)))) /
    (2 * width);
  var pause_start =
    (iteration - (fill_frames + blackout_frames)) / pause_frames;
  var fadeout_start =
    (iteration - (fill_frames + blackout_frames + pause_frames)) /
    fadeout_frames;
  // Clear, must come first
  ctx.clearRect(0, 0, width, height);

  if (pause_start < 0) {
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

    ctx.lineTo(
      0,
      height + width * fill_start * Math.tan(degreesToRadians(300))
    );
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
        -(width - (width - width * fill_start)) *
          Math.tan(degreesToRadians(300))
      );
      ctx.strokeStyle = "#D21F3C";
      ctx.stroke();
    }

    // If on frame 25 or onward
    if (blackout_start >= 0) {
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
      ctx.fillStyle = "#000000";
      ctx.fill();
    }
  } else {
    // Replace with giant black rectangle for animation
    if (fadeout_start < 0) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.lineTo(0, 0);
      ctx.closePath();

      ctx.fillStyle = "#000000";
      ctx.fill();
    }

    if (fadeout_start >= 0) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height - fadeout_start * height);
      ctx.lineTo(0, height - fadeout_start * height);
      ctx.lineTo(0, 0);
      ctx.closePath();

      ctx.globalAlpha = 1 - fadeout_start;

      ctx.fillStyle = "#000000";
      ctx.fill();
    }
  }

  counter++;
  if (counter <= frames) {
    requestAnimationFrame(function () {
      resize();
    });
  } else {
    document.getElementById("myCanvas").classList.add("hidden");
    rec.stop()
  }
}

requestAnimationFrame(function () {
  resize();
});
function exportVideo(blob) {
  const vid = document.createElement('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  document.body.appendChild(vid);
  vid.classList.add("h-5/6")
  const a = document.createElement('a');
  a.classList.add("h-1/6")
  a.download = 'myvid.webm';
  a.href = vid.src;
  a.textContent = 'download the video';
  document.body.appendChild(a);
}
const chunks = [];
const stream = document.getElementById("myCanvas").captureStream();
const rec = new MediaRecorder(stream);
rec.ondataavailable = (e) => chunks.push(e.data);
rec.onstop = (e) => exportVideo(new Blob(chunks, { type: "video/webm" }));
rec.start();
