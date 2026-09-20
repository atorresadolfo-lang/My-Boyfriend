const player = document.getElementById("player");
const game = document.getElementById("game");

let x = 288;

let y = 148;

const speed = 3;

const keys = {};

const walkFrames = [

  "walk-1.png",

  "walk-2.png",

  "walk-3.png",

  "walk-4.png",
  
  "walk-5.png",

];

let currentFrame = 0;

let frameTimer = 0;

const frameSpeed = 120; // milliseconds between frames

// Detect when a key is pressed

document.addEventListener("keydown", (event) => {

  keys[event.key.toLowerCase()] = true;

});

// Detect when a key is released

document.addEventListener("keyup", (event) => {

  keys[event.key.toLowerCase()] = false;

});

function gameLoop() {

  let moving = false;

  // Move left

  if (keys["a"] || keys["arrowleft"]) {

    x -= speed;

    moving = true;

  }

  // Move right

  if (keys["d"] || keys["arrowright"]) {

    x += speed;

    moving = true;

  }

  // Move up

  if (keys["w"] || keys["arrowup"]) {

    y -= speed;

    moving = true;

  }

  // Move down

  if (keys["s"] || keys["arrowdown"]) {

    y += speed;

    moving = true;

  }

  // Keep character inside the room

  x = Math.max(0, Math.min(x, game.offsetWidth - player.offsetWidth));

  y = Math.max(0, Math.min(y, game.offsetHeight - player.offsetHeight));

  // Animate walking

  if (moving) {

    frameTimer += 16;

    if (frameTimer >= frameSpeed) {

      currentFrame++;

      if (currentFrame >= walkFrames.length) {

        currentFrame = 0;

      }

      player.src = walkFrames[currentFrame];

      frameTimer = 0;

    }

  } else {

    // Return to the first frame when standing still

    currentFrame = 0;

    frameTimer = 0;

    player.src = walkFrames[0];

  }

  // Update position

  player.style.left = `${x}px`;

  player.style.top = `${y}px`;

  requestAnimationFrame(gameLoop);

}

gameLoop();

const controlButtons = document.querySelectorAll("#controls button");

controlButtons.forEach((button) => {
  const key = button.dataset.key;

  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keys[key] = true;
  });

  button.addEventListener("touchend", (event) => {
    event.preventDefault();
    keys[key] = false;
  });

  button.addEventListener("touchcancel", (event) => {
    event.preventDefault();
    keys[key] = false;
  });
});
