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

// Define the level as a 2D array
// 0 = empty space, 1 = wall
const levelGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Function that draws the movable box
function drawBox() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "rebeccapurple";
  ctx.fillRect(x, y, boxWidth, boxHeight);
  drawLevel();
}

// Draw the level based on the 2D grid
function drawLevel() {
  // Walls
  ctx.fillStyle = "lightgrey";
  for (let row = 0; row < levelGrid.length; row++) {
    for (let col = 0; col < levelGrid[row].length; col++) {
      if (levelGrid[row][col] === 1) {
        ctx.fillRect(col * boxWidth, row * boxHeight, boxWidth, boxHeight);
      }
    }
  }

  // Orange box (TODO: make it movable by pushing)
  ctx.fillStyle = "orange";
  for (let row = 0; row < levelGrid.length; row++) {
    for (let col = 0; col < levelGrid[row].length; col++) {
      if (levelGrid[row][col] === 2) {
        ctx.fillRect(col * boxWidth, row * boxHeight, boxWidth, boxHeight);
      }
    }
  }
}

// Function to check for collisions
function isCollision(newX, newY) {
  // Convert the new X and Y position to grid coordinates
  const col = Math.floor(newX / boxWidth);
  const row = Math.floor(newY / boxHeight);

  // Check if the new position is within bounds and not a wall
  if (
    row >= 0 &&
    row < levelGrid.length &&
    col >= 0 &&
    col < levelGrid[row].length
  ) {
    return levelGrid[row][col] === 1; // Collision if the cell is a wall
  }
  return true; // Treat out-of-bounds as a collision
}

// Initial drawing of movable box
drawBox();

// Event listener for key presses that moves the box
document.body.addEventListener("keydown", (event) => {
  let newX = x;
  let newY = y;

  if (event.key === "ArrowUp") newY -= boxMovement; // Move up
  if (event.key === "ArrowDown") newY += boxMovement; // Move down
  if (event.key === "ArrowRight") newX += boxMovement; // Move right
  if (event.key === "ArrowLeft") newX -= boxMovement; // Move left

  // Check for collisions and update position if no collision
  if (!isCollision(newX, newY)) {
    x = newX;
    y = newY;
  }

  drawBox();
});
