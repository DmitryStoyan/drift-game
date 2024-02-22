let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let image = new Image();
let car = new Image();

let angle = 0;
let direction = 0;
let x = canvas.width / 2;
let y = canvas.height / 2;
let speed = 0;
const acceleration = 0.1;
const maxSpeed = 4;
const friction = 0.01;
const driftFactor = 0.05;
const carH = 50;
const carW = 25;

let tireTracks = [];

image.src =
  "https://st2.depositphotos.com/3997633/10909/v/380/depositphotos_109099466-stock-illustration-top-view-of-the-city.jpg";
image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

car.src = "https://www.pngmart.com/files/15/Vector-Car-Top-View-PNG-Photos.png";

const keysPressed = {};

function handleKeys() {
  let drifting = false;

  if (keysPressed["KeyA"]) {
    angle -= 0.05;
    drifting = true;
  }
  if (keysPressed["KeyD"]) {
    angle += 0.05;
    drifting = true;
  }
  if (keysPressed["KeyW"]) {
    speed += acceleration;
    if (speed > maxSpeed) speed = maxSpeed;
  }
  if (keysPressed["KeyS"]) {
    speed -= acceleration;
    if (speed < -maxSpeed) speed = -maxSpeed;
  }

  if (speed > 0) {
    speed -= friction;
    if (speed < 0) speed = 0;
  } else if (speed < 0) {
    speed += friction;
    if (speed > 0) speed = 0;
  }

  if (drifting) {
    direction += (angle - direction) * driftFactor;

    if (Math.abs(angle - direction) > 0.05 && speed > 2) {
      const offsetX = (Math.sin(direction) * carH) / 2;
      const offsetY = (Math.cos(direction) * carH) / 2;
      tireTracks.push({ x: x - offsetX, y: y + offsetY });
      tireTracks.push({ x: x + offsetX, y: y - offsetY });
    }
  } else {
    direction = angle;
  }

  x += Math.cos(direction) * speed;
  y += Math.sin(direction) * speed;
}

function drawTireTracks() {
  tireTracks.forEach((track) => {
    context.beginPath();
    context.arc(track.x, track.y, 2, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
  });
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  drawTireTracks();

  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.drawImage(car, -carH / 2, -carW / 2, carH, carW);
  context.restore();
}

function handleBorders() {
  const halfCarWidth = carW / 2;
  const halfCarHeight = carH / 2;

  if (y - halfCarHeight < 0) {
    y = halfCarHeight;
    speed *= -0.5;
  }

  if (y + halfCarHeight > canvas.height) {
    y = canvas.height - halfCarHeight;
    speed *= -0.5;
  }

  if (x - halfCarWidth < 0) {
    x = halfCarWidth;
    speed *= -0.5;
  }

  if (x + halfCarWidth > canvas.width) {
    x = canvas.width - halfCarWidth;
    speed *= -0.5;
  }
}

function update() {
  handleKeys();
  handleBorders();
  draw();
  requestAnimationFrame(update);
}

document.addEventListener("keydown", function (event) {
  keysPressed[event.code] = true;
});

document.addEventListener("keyup", function (event) {
  delete keysPressed[event.code];
});

update();
