const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameStarted = false;

function drawFence(){
    ctx.fillStyle = "white";  
    ctx.fillRect(0, 375, 150, 15);
    ctx.fillRect(250, 375, 150, 15);
}

function hitFence(x, y, radius) {
    if (
        x + radius > 0 &&
        x - radius < 150 &&
        y + radius > 375 &&
        y - radius < 390
    ) {
        return true;
    }
    if (
        x + radius > 250 &&
        x - radius < 400 &&
        y + radius > 375 &&
        y - radius < 390
    ) {
        return true;
    }
    return false;
}

const player = {
  x: 200,
  y: 200,
  speed: 7,
  radius: 25,
  color: 'brown'
};

const keys = {};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI);
    ctx.fill();
  }

function randomPosition(radius) {
    return {
        x: Math.random() * (canvas.width - 2 * radius) + radius,
        y: Math.random() * (375 - 2 * radius) + radius
    };
}

const SHEEP_SPEED = 0.5

const sheepArray = [];
function spawnSheep(n) {
    for (let i = 0; i < n; i++) {
    const pos = randomPosition(25);
    sheepArray.push({
        x: pos.x,
        y: pos.y,
	vx : SHEEP_SPEED,
	vy : 0,
        radius: 25,
        color: 'white'
    });
  }
}

spawnSheep(3);

function drawSheep() {
for (let sheep of sheepArray){
    ctx.fillStyle = sheep.color;
    ctx.beginPath();
    ctx.arc(sheep.x, sheep.y, sheep.radius, 0, 2*Math.PI);
    ctx.fill();
  }
}

let score = 0;
let gameOver = false;

function moveSheep() {
    for (let i = sheepArray.length - 1; i >= 0; i--) {
        let sheep = sheepArray[i];

        if (Math.random() < 0.008) {
        const angle = Math.random() * 2 * Math.PI;
            sheep.vx = Math.cos(angle) * SHEEP_SPEED;
            sheep.vy = Math.sin(angle) * SHEEP_SPEED;
        }

        const oldX = sheep.x;
        const oldY = sheep.y;
            sheep.x += sheep.vx;
            sheep.y += sheep.vy;

        if (
            sheep.x + sheep.radius < 0 ||
            sheep.x - sheep.radius > canvas.width ||
            sheep.y + sheep.radius < 0 ||
            sheep.y - sheep.radius > canvas.height
        ) {
            gameOver = true;
            gameStarted = false;
            return;
        } 

        if (
            sheep.x - sheep.radius > 150 &&
            sheep.x + sheep.radius < 250 &&
            sheep.y - sheep.radius > 375
        ) {
            sheepArray.splice(i, 1); 
            score++;
            continue;
        }

        if (hitFence(sheep.x, sheep.y, sheep.radius)) {
            sheep.x = oldX;
            sheep.y = oldY;
            sheep.vx *= -1;
            sheep.vy *= -1;
	}
    }
}

function isColliding(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (a.radius + b.radius);
}

function pushSheep(sheep, player) {
    const dx = sheep.x - player.x;
    const dy = sheep.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDist = sheep.radius + player.radius;

    if (distance < minDist && distance !== 0) {
        const overlap = minDist - distance;
        const nx = dx / distance;
        const ny = dy / distance;
        const oldX = sheep.x;
        const oldY = sheep.y;
        sheep.x += nx * overlap;
        sheep.y += ny * overlap;

        if (hitFence(sheep.x, sheep.y, sheep.radius)) {
            sheep.x = oldX;
            sheep.y = oldY;	
        } else {

        let px = 0, py = 0, moving = false;
        if (keys['ArrowDown'])  { py += 1; moving = true; }
        if (keys['ArrowUp'])    { py -= 1; moving = true; }
        if (keys['ArrowRight']) { px += 1; moving = true; }
        if (keys['ArrowLeft'])  { px -= 1; moving = true; }
        if (moving && (px !== 0 || py !== 0)) {
            const plen = Math.sqrt(px * px + py * py);
            sheep.vx = (px / plen) * SHEEP_SPEED;
            sheep.vy = (py / plen) * SHEEP_SPEED;
	   }
        }
    }
}

function sheepPlayerCollisions() {
    for (let sheep of sheepArray) {
        pushSheep(sheep, player);
    }
}


function movePlayer(){  
    if(keys['ArrowDown'] && player.y + player.radius < 375){
        player.y += player.speed;
    }
    if(keys['ArrowUp'] && player.y - player.radius > 0){
        player.y -= player.speed;
    }
    if(keys['ArrowLeft'] && player.x - player.radius > 0){
        player.x -= player.speed;
    }
    if(keys['ArrowRight'] && player.x + player.radius < canvas.width){
        player.x += player.speed;
    }
}

function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("You lost :(", canvas.width/2, canvas.height/2);
        return; 
    }
     if (gameStarted) {
	movePlayer();
        drawPlayer();
	drawFence();
	moveSheep();
        if (sheepArray.length === 0 && !gameOver) {
        spawnSheep(3);
}
	drawSheep();
	sheepPlayerCollisions();
    ctx.fillStyle = "black";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 10, 30);
    } else {
        ctx.fillStyle = "black";
        ctx.font = "32px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Press Start to Play", canvas.width/2, canvas.height/2);
    }
        requestAnimationFrame(animate);
}

function handleKeyPress(e){
    keys[e.key] = true;
}

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

const startButton = document.createElement('button');
startButton.innerText = "Start";
startButton.style.display = "block";
startButton.style.margin = "12px auto";
startButton.style.fontSize = "24px";
canvas.insertAdjacentElement('afterend', startButton);

startButton.addEventListener('click', () => {
    gameStarted = true;
    startButton.style.display = "none";
});

animate();
