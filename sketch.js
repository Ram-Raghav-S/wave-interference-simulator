/**
 * horizontal width of the simulation in pixels
 */
var cols;

/**
 * vertical height of the simulation in pixels
 */
var rows;

/**
 * factor that simulation has been sped-up by
 */
var playbackSpeed = 12;

/**
 * p5.js canvas object used as simulation
 */
var canvas;

/**
 * sum of amplitudes of all sources
 */
var sumOfAmplitudes = 0;

/**
 * x-coordinate of the midpoint of sources
**/var xMidpoint = 0;

/**
 * y-coordinate of the midpoint of sources
**/ 
var yMidpoint = 0;

/**
  distance each pixel represents
**/
var distancePerPixel = 1;

// list of sources in the simulation
var sources = [];


function setup() {
  cols = floor(window.innerWidth * 0.68);
  rows = floor(window.innerHeight * 0.77);
  canvas = createCanvas(cols, rows);  
  pixelDensity(1);
  setSumOfAmplitudes();
  enableSettingCoordinatesByClick();
}


function enableSettingCoordinatesByClick() {
  let xCoordinateField = select("#x-coordinate");
  let yCoordinateField = select("#y-coordinate");

  // enabling user to set coordinates by clicking on simulation
  canvas.elt.addEventListener("click", () => {
    xCoordinateField.value(mouseX);
    yCoordinateField.value(mouseY);    
  });
}


function setMidPoints() {
  for (let source of sources) {
    xMidpoint += source.x;
    yMidpoint += source.x;
  }
  xMidpoint /= sources.length;
  yMidpoint /= sources.length;
}

function setSumOfAmplitudes() {
  sumOfAmplitudes = 0;
  for (let source of sources) {
    sumOfAmplitudes += source.amplitude;
  }
}

function getTotalDisplacement(x, y) {
  let totalDisplacement = 0;
  for (let source of sources) {
    totalDisplacement += source.getDisplacement(x, y);
  }
  return totalDisplacement;
}

function panVertically(distance) {
  for (let source of sources) {
    source.y += distance;
  }
}

function panHorizontally(distance) {
  for (let source of sources) {
    source.x += distance;
  }
}

function zoom(amount) {
  setMidPoints();
  distancePerPixel -= amount;
  for (let source of sources) {
    source.x =
      xMidpoint +
      (source.x - xMidpoint) / (distancePerPixel / (distancePerPixel + amount));
    source.y =
      yMidpoint +
      ((source.y - yMidpoint) / distancePerPixel) * (distancePerPixel + amount);
  }
}

function drawDistanceScale() {
  stroke(0);
  strokeWeight(2);
  textAlign(CENTER);
  line(4, 5, 104, 5);
  line(4, 3, 4, 7);
  line(104, 3, 104, 7);
  strokeWeight(1);
  textSize(12);
  text((50 * distancePerPixel).toFixed(2) + " m", 54, 18);
}

function draw() {
  for(let source of sources) {
    if(frameRate() != 0)
      source.timeElapsed += (1 / frameRate()) * playbackSpeed;
  }

  loadPixels();
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let n = 4 * (x + y * width);
      let displacement = getTotalDisplacement(x, y);
      let intensity = floor(
        map(displacement, -sumOfAmplitudes, sumOfAmplitudes, 255, 0)
      );
      pixels[n] = intensity;
      pixels[n + 1] = 241;
      pixels[n + 2] = 249;
      pixels[n + 3] = 255;
    }
  }
  updatePixels();

  drawDistanceScale();
}

function keyPressed() {
  if (key == "+") zoom(0.1);
  else if (key == "-") zoom(-0.1);
  else if (key == "w") panVertically(5);
  else if (key == "a") panHorizontally(5);
  else if (key == "s") panVertically(-5);
  else if (key == "d") panHorizontally(-5);
}
