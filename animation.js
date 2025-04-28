const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let dx = 5;
let y = 0;
let dy =1; 

//this is an object
//we access values in an object ;ole this:
const player = {
    //key:value pair
    x : 0,
    y : 0,
    color: 'green',
    speed: 3
};

//this is also an object
//we access values from this kind of object
//like this:
//  keys['Arrowup']
const keys = {};

//define functions
function drawRect(x,y) {
    console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}

function drawPlayer(){
    ctx.fillstyle = player.color;
    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y,
        20,
        0,
	2*Math.PI
   );
   ctx.fill();
}

function movePlayer(){
   if(keys['ArrowDown']){
      player.y += player.speed;
}
}

function animate() {
    drawRect(x,y);
    drawPlayer();
    movePlayer();    

    // TODO: Add some code here 
    //  that will change the rectangle's position
    x = x + dx;
    y = y + dy;

    //if the box goes off the right side of the screen
    //reset it to the inital position
    if(x > 350){
        dx = dx * -1;
    }
    if(x < 0){
        dx = dx * -1;
    }

    if(y > 350){
        dy = dy * -1;
    }
    if(y < 0){
        dy = dy * -1;
    }
    requestAnimationFrame(animate);
}

function handleKeyPress (e){
    keys[e.key] = True;
}

//2 inputs: what type of event, a functino to call)
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', (e) => {
    keys[e.key] = False;
});
//call our function
animate();
