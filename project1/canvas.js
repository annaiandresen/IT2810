const blue = "#0c9fd8";
const red = "#cd1318";
const black = "#0d0c10";
const screenBlack = "#1c1c1c";
const screenWhite = "#dddddd";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let turnedOn = false;

const createButton = (ctx, text, x, y, textWhite = true) => {
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.font = "lighter 4px Arial";
  ctx.fillStyle = black;
  ctx.strokeStyle = textWhite ? "white" : "black";
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeText(text, x - 1.5, y + 1);
};

const createJoystick = (ctx, x, y) => {
  ctx.beginPath();
  ctx.fillStyle = black;
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fill();
};
let x = Math.floor(Math.random() * 370 + 210); //500
let y = Math.floor(Math.random() * 170 + 110); //200

let dx = 1;
let dy = 1;

const leftEdge = 210;
const rightEdge = 590;
const upperEdge = 110;
const lowerEdge = 290;
const r = 20;
let animationFrame;
const animate = () => {
  animationFrame = requestAnimationFrame(animate); // loop
  ctx.clearRect(210, 110, 380, 180);
  ctx.fillStyle = screenWhite;
  ctx.fillRect(210, 110, 380, 180);
  ctx.strokeStyle = red;
  ctx.fillStyle = red;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
  if (x + r + 2 > rightEdge || x - r - 2 < leftEdge) {
    dx = -dx;
  }
  if (y + r + 2 > lowerEdge || y - r - 2 < upperEdge) {
    dy = -dy;
  }
  x += dx;
  y += dy;
};

const turnOff = () => {
  ctx.fillStyle = screenBlack;
  ctx.fillRect(210, 110, 380, 180);
  turnedOn = false;
  $("h3#turn_me_on").html("Turn me on");
  if (animationFrame) cancelAnimationFrame(animationFrame);
};

const turnOn = () => {
  // Screen
  ctx.fillStyle = screenWhite;
  ctx.fillRect(210, 110, 380, 180);
  turnedOn = true;
  $("h3#turn_me_on").html("Turn me off");
};

const onCanvasClick = () => {
  if (turnedOn) {
    turnOff();
  } else {
    turnOn();
    animate();
  }
};

const drawCanvas = () => {
  // Screen
  ctx.fillStyle = black;
  ctx.fillRect(200, 100, 400, 200);

  ctx.fillStyle = screenBlack;
  ctx.fillRect(210, 110, 380, 180);

  // Blue controller
  ctx.moveTo(200, 150);
  ctx.fillStyle = blue;
  ctx.arc(200, 150, 50, 1.5 * Math.PI, 1 * Math.PI, true);
  ctx.fill();
  ctx.fillStyle = black;
  ctx.beginPath();
  ctx.arc(201, 150, 50, 1.5 * Math.PI, 1 * Math.PI * +0.9, true);
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = blue;
  ctx.fillRect(150, 150, 50, 100);
  ctx.moveTo(200, 250);
  ctx.arc(200, 250, 50, 1 * Math.PI, 0.5 * Math.PI, true);
  ctx.fill();

  // - icon
  ctx.beginPath();
  ctx.fillStyle = black;
  ctx.font = "bolder 18px Arial";
  ctx.fillText("-", 190, 125);

  // Buttons and joystick
  createJoystick(ctx, 180, 155);
  createButton(ctx, "^", 180, 190, false);
  createButton(ctx, "◀", 170, 202.5, false);
  createButton(ctx, "▶", 190, 202.5, false);
  createButton(ctx, "v", 180, 215, false);
  ctx.fillRect(180, 240, 10, 10);

  // Red controller
  ctx.beginPath();
  ctx.moveTo(600, 150);
  ctx.fillStyle = red;
  ctx.arc(600, 150, 50, 0, 1.5 * Math.PI, true);
  ctx.fill();

  ctx.strokeStyle = black;
  ctx.beginPath();
  ctx.arc(599, 150, 50, 0, 1.5 * Math.PI * 1, true);
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = red;

  ctx.fillRect(600, 150, 50, 100);
  ctx.moveTo(600, 250);
  ctx.arc(600, 250, 50, 0, 0.5 * Math.PI);
  ctx.fill();

  // + icon
  ctx.beginPath();
  ctx.fillStyle = black;
  ctx.font = "bolder 17px Arial";
  ctx.fillText("+", 605, 125);

  // Buttons and joystick
  createButton(ctx, "X", 625, 150);
  createButton(ctx, "Y", 615, 162.5);
  createButton(ctx, "A", 635, 162.5);
  createButton(ctx, "B", 625, 175);
  createJoystick(ctx, 625, 210);
  createButton(ctx, "", 612.5, 240, false);

  $("#canvas").on("click", onCanvasClick); // or canvas.addEventListener("click", onCanvasClick);;
};

drawCanvas();
