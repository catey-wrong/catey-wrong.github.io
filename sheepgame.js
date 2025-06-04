const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 200,
  y: 200,
  speed: 5,
  radius: 25,
  color: 'white'
};

const keys = {};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2*Math.PI);
    ctx.fill();
  }

function movePlayer(){  
    if(keys['ArrowDown'] && player.y + player.radius < canvas.height){
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
