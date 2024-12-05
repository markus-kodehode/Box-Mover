// Get canvas from HTML and sets size
const c = document.querySelector("#boxMover");
const ctx = c.getContext("2d");
c.height = 900;
c.width = 900;

// Box dimensions
const boxWidth = 100;
const boxHeight = 100;

// Space that box moves
const boxMovement = 100;

// Initial starting point for box (centered)
let x = (c.width - boxWidth) / 2;
let y = (c.height - boxHeight) / 2;

// Function that draws the moveable box
function drawBox() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "rebeccapurple";
  ctx.fillRect(x, y, boxWidth, boxHeight);
  drawLevel();
}

// Level box coordinates TODO: Rework to a map using 2D array for easier level creation
const level = [
  { x: 300, y: 300 },
  { x: 400, y: 300 },
  { x: 500, y: 300 },
  { x: 300, y: 400 },
  { x: 500, y: 400 },
  { x: 400, y: 600 },
  { x: 500, y: 600 },
  { x: 300, y: 600 },
  { x: 200, y: 600 },
  { x: 100, y: 600 },
  { x: 100, y: 500 },
  { x: 100, y: 400 },
  { x: 100, y: 300 },
  { x: 100, y: 200 },
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 300, y: 100 },
  { x: 100, y: 700 },
  { x: 300, y: 800 },
  { x: 500, y: 700 },
  { x: 700, y: 800 },
];

// Takes coordinates from level and draws the boxes
function drawLevel() {
  ctx.fillStyle = "lightgrey";
  level.forEach((box) => {
    ctx.fillRect(box.x, box.y, boxWidth, boxHeight);
  });
}

// Function to check for collisions
function isCollision(newX, newY) {
  // Iterate through each level box to check for overlaps
  return level.some((box) => {
    // Collision occurs if the movable box's new position overlaps
    // with the current level box on both the X and Y axes.
    return (
      // Check if the right edge of the movable box goes past the left edge of the level box
      newX < box.x + boxWidth &&
      // Check if the left edge of the movable box is before the right edge of the level box
      newX + boxWidth > box.x &&
      // Check if the bottom edge of the movable box goes past the top edge of the level box
      newY < box.y + boxHeight &&
      // Check if the top edge of the movable box is before the bottom edge of the level box
      newY + boxHeight > box.y
    );
  });
}

// Initial drawing of moveable box
drawBox();

// Event listener for key presses that moves the box
document.body.addEventListener("keydown", (event) => {
  let newX = x;
  let newY = y;

  if (event.key === "ArrowUp" && y > 0) newY -= boxMovement; // Move up
  if (event.key === "ArrowDown" && y + boxHeight < c.height)
    newY += boxMovement; // Move down
  if (event.key === "ArrowRight" && x + boxWidth < c.width) newX += boxMovement; // Move right
  if (event.key === "ArrowLeft" && x > 0) newX -= boxMovement; // Move left

  // Check for collisions and update position if no collision
  if (!isCollision(newX, newY)) {
    x = newX;
    y = newY;
  }

  drawBox();
});
