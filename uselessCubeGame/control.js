//import { backgroundMusic } from "./Functions/backgroundMusic";

var world, controller, rectangle, loop;

const worldHeight = 280;
const worldWidth = 420;
const music = new backgroundMusic("./GameAssets/Music/music.mp3");
//const worldBackground = new gameBackground(worldWidth, worldHeight);

world = document.querySelector("canvas").getContext("2d");
world.canvas.height = worldHeight;
world.canvas.width = worldWidth;
//defining the moveable object
rectangle = {
  height: 32,
  jumping: true,
  width: 32,
  x: 144,
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
}; //end rectangle object
//defining the controller for the key controls
controller = {
  left: false,
  right: false,
  up: false,
  KeyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false;
    // checking which keys are being pressed
    switch (event.keyCode) {
      case 37: //left key
        controller.left = key_state;
        break;
      case 38: //up key
        controller.up = key_state;
        break;
      case 39: //right key
        controller.right = key_state;
        break;
    }
  },
}; //end controller object

function backgroundMusic(src) {
  this.backgroundMusic = document.createElement("audio");
  this.backgroundMusic.src = src;
  this.backgroundMusic.setAttribute("preload", "auto");
  this.backgroundMusic.setAttribute("controls", "none");
  this.backgroundMusic.style.display = "none";

  document.body.appendChild(this.backgroundMusic);

  this.play = function () {
    this.backgroundMusic.play();
  };

  this.stop = function () {
    this.backgroundMusic.pause();
  };
}

//object movement physics
loop = function () {
  if (controller.up && rectangle.jumping == false) {
    rectangle.y_velocity -= 20;
    rectangle.jumping = true;
  }

  if (controller.left) {
    rectangle.x_velocity -= 0.5;
  }

  if (controller.right) {
    rectangle.x_velocity += 0.5;
  }

  //gravity sim
  rectangle.y_velocity += 1.5;
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  //friction
  rectangle.x_velocity *= 0.9;
  rectangle.y_velocity *= 0.9;

  //resets object when it does past a wall
  if (rectangle.y > worldHeight - 16 - 32) {
    rectangle.jumping = false;
    rectangle.y = worldHeight - 16 - 32;
    rectangle.y_velocity = 0;
  }

  //taking care of rectangle when it goes off to left
  if (rectangle.x < -32) {
    rectangle.x = worldWidth;
  } else if (rectangle.x > worldWidth) {
    rectangle.x = -32;
  }

  world.fillStyle = "#1f2ea6";
  world.fillRect(0, 0, worldWidth, worldHeight);
  world.fillStyle = "#40c648";
  world.beginPath();
  world.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  world.fill();
  world.strokeStyle = "202830";
  world.lineWidth = 4;
  world.beginPath();
  world.moveTo(0, 266);
  world.lineTo(worldWidth, 266);
  world.stroke();
  window.requestAnimationFrame(loop);
  music.play();
}; // end function

//adds the specified events to the window
window.requestAnimationFrame(loop);
window.addEventListener("keydown", controller.KeyListener);
window.addEventListener("keyup", controller.KeyListener);

//CLASSES
/**
 *
 * */
class gameBackground {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.image = document.getElementById("backgroundImage");
    this.x = 0;
    this.y = 0;
    this.width = worldWidth;
    this.height = worldHeight;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}

//END CLASSES
