// let canvas = document.querySelector("canvas");
// let context = canvas.getContext("2d");
// let image = new Image();
// let car = new Image();

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// let angle = 0;
// let direction = 0;
// let x = canvas.width / 2;
// let y = canvas.height / 2;
// let speed = 0;
// const acceleration = 0.1;
// const maxSpeed = 4;
// const friction = 0.01;
// const driftFactor = 0.05;
// // const carH = 50;
// // const carW = 25;
// const carH = 200;
// const carW = 200;

// let tireTracks = [];
// //  "https://st2.depositphotos.com/3997633/10909/v/380/depositphotos_109099466-stock-illustration-top-view-of-the-city.jpg"
// // https://www.pngmart.com/files/15/Vector-Car-Top-View-PNG-Photos.png
// image.src =
//   "https://i.pinimg.com/736x/e6/f8/a9/e6f8a9dbda01f99c559f57488a1536cf.jpg";
// image.onload = function () {
//   context.drawImage(image, 0, 0, canvas.width, canvas.height);
// };

// car.src =
//   "https://png.pngtree.com/png-clipart/20220822/ourmid/pngtree-toon-truck-top-view-png-image_6120518.png";

// const keysPressed = {};

// function handleKeys() {
//   let drifting = false;

//   if (keysPressed["KeyA"]) {
//     angle -= 0.05;
//     drifting = true;
//   }
//   if (keysPressed["KeyD"]) {
//     angle += 0.05;
//     drifting = true;
//   }
//   if (keysPressed["KeyW"]) {
//     speed += acceleration;
//     if (speed > maxSpeed) speed = maxSpeed;
//   }
//   if (keysPressed["KeyS"]) {
//     speed -= acceleration;
//     if (speed < -maxSpeed) speed = -maxSpeed;
//   }

//   if (speed > 0) {
//     speed -= friction;
//     if (speed < 0) speed = 0;
//   } else if (speed < 0) {
//     speed += friction;
//     if (speed > 0) speed = 0;
//   }

//   if (drifting) {
//     direction += (angle - direction) * driftFactor;
//   } else {
//     if (speed !== 0) {
//       direction += (angle - direction) * driftFactor;
//     } else {
//       direction = angle;
//     }
//   }

//   x += Math.cos(direction) * speed;
//   y += Math.sin(direction) * speed;
// }

// // function drawTireTracks() {
// //   tireTracks.forEach((track) => {
// //     context.beginPath();
// //     context.arc(track.x, track.y, 2, 0, 2 * Math.PI);
// //     context.fillStyle = "black";
// //     context.fill();
// //   });
// // }

// function draw() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.drawImage(image, 0, 0, canvas.width, canvas.height);

//   //   drawTireTracks();

//   context.save();
//   context.translate(x, y);
//   context.rotate(angle);
//   context.drawImage(car, -carH / 2, -carW / 2, carH, carW);
//   context.restore();
// }

// function handleBorders() {
//   const halfCarWidth = carW / 2;
//   const halfCarHeight = carH / 2;

//   if (y - halfCarHeight < 0) {
//     y = halfCarHeight;
//     speed *= -0.5;
//   }

//   if (y + halfCarHeight > canvas.height) {
//     y = canvas.height - halfCarHeight;
//     speed *= -0.5;
//   }

//   if (x - halfCarWidth < 0) {
//     x = halfCarWidth;
//     speed *= -0.5;
//   }

//   if (x + halfCarWidth > canvas.width) {
//     x = canvas.width - halfCarWidth;
//     speed *= -0.5;
//   }
// }

// function update() {
//   handleKeys();
//   handleBorders();
//   draw();
//   requestAnimationFrame(update);
// }

// document.addEventListener("keydown", function (event) {
//   keysPressed[event.code] = true;
// });

// document.addEventListener("keyup", function (event) {
//   delete keysPressed[event.code];
// });

// update();

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let image = new Image();
let car = new Image();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0;
let x = 100;
let y = canvas.height / 2;
let speed = 0;
const acceleration = 0.1;
const maxSpeed = 0.5;
const friction = 0.05;

const carH = 200;
const carW = 200;

image.src =
  "https://i.pinimg.com/736x/e6/f8/a9/e6f8a9dbda01f99c559f57488a1536cf.jpg";
image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

car.src =
  "https://png.pngtree.com/png-clipart/20220822/ourmid/pngtree-toon-truck-top-view-png-image_6120518.png";

const keysPressed = {};

function handleKeys() {
  if (keysPressed["KeyA"]) {
    angle -= 0.009;
  }
  if (keysPressed["KeyD"]) {
    angle += 0.009;
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

  x += Math.cos(angle) * speed;
  y += Math.sin(angle) * speed;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(x, y);
  context.rotate(angle);
  context.drawImage(car, -carH / 2, -carW / 2, carH, carW);
  context.restore();

  context.fillStyle = "white";
  context.font = "24px Arial";
  context.textAlign = "center";
  context.fillText("SNOW RUNNER СПЕЦИЯЛЬНО ДЛЯ MAC", canvas.width / 2, 50);
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
