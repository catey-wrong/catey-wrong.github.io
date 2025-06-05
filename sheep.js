const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "MediumSeaGreen";
ctx.fillRect(0, 0, canvas.width, canvas.height);


function drawSheep(ctx, x, y, size = 25) {
    whiteCircle(ctx, x, y, size);
    blackCircle(ctx, x - size * 0., y + size * 0.8, size * 0.4);
}

function whiteCircle(ctx, x, y, size = 25) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

function blackCircle(ctx, x, y, size = 10) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

drawSheep(ctx, 150, 100, 25);
drawSheep(ctx, 120, 200, 25);
drawSheep(ctx, 300, 220, 25);


//goal

function whiteRect(ctx, x, y, width, height) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, width, height);
    ctx.restore();
}

function homeArea (ctx, x, y, width, height) {
    ctx.save();
    ctx.fillStyle = "Burlywood";
    ctx.fillRect(x, y, width, height);
    ctx.restore();
}

homeArea(ctx, 0, 330, 400, 70);
whiteRect(ctx, 0, 330, 150, 20);
whiteRect(ctx, 250, 330, 150, 20);

//dog 

function dogBody (ctx, x, y, size = 25) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fillStyle = "Peru";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

function dogHead (ctx, x, y, size = 10) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fillStyle = "Peru";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

function dog (ctx, x, y, size = 25) {
    dogBody(ctx, x, y, size = 25);
    dogHead(ctx, x - size * 1 , y + size * 0.3, size = 12);
}

dog(ctx, 250, 100, 25);
