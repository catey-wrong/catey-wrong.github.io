const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function drawFence(){
    ctx.fillStyle = "white";  
    ctx.fillRect(0, 375, 150, 15);
    ctx.fillRect(250, 375, 150, 15);
}

function inFence(x, y, radius) {
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

function randomVelocity(speed) {
    const angle = Math.random() * 2 * Math.PI;
    return {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
    };
}

const sheepArray = [];
for (let i = 0; i < 3; i++) {
    const pos = randomPosition(25);
    const vel = randomVelocity(1);
    sheepArray.push({
        x: pos.x,
        y: pos.y,
	vx: vel.vx,
	vy: vel.vy,
        speed: 2,
        radius: 25,
        color: 'white'
    });
}

function drawSheep() {
for (let sheep of sheepArray){
    ctx.fillStyle = sheep.color;
    ctx.beginPath();
    ctx.arc(sheep.x, sheep.y, sheep.radius, 0, 2*Math.PI);
    ctx.fill();
  }
}

function moveSheep() {
    for (let sheep of sheepArray) {
        if (Math.random() <0.01) {
           const vel = randomVelocity(1.5);
           sheep.vx = vel.vx;
           sheep.vy = vel.vy;
        }
	const oldX = sheep.x;
        const oldY = sheep.y;
	sheep.x += sheep.vx;
	sheep.y += sheep.vy;
	if (inFence(sheep.x, sheep.y, sheep.radius)) {
            sheep.x = oldX;
            sheep.y = oldY;
            sheep.vx *= -1;
            sheep.vy *= -1;
        }
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
        movePlayer();
        drawPlayer();
	drawFence();
	moveSheep();
        drawSheep();
        requestAnimationFrame(animate);
}

function handleKeyPress(e){
    keys[e.key] = true;
}

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

animate();
