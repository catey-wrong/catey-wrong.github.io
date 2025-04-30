const canvas =
    document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "LemonChiffon";
ctx.fillRect (0,0,400,400);

ctx.fillStyle = "orange"

function triangle(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - size / 2, y + size);
    ctx.lineTo(x + size / 2, y + size);
    ctx.closePath();
    ctx.fill();
}

function dorito(x, y) {
    triangle(x, y - 60, 80);        // Top triangle
    triangle(x, y + 50, 80);   // Middle triangle
    triangle(x, y + 160, 80); // Bottom triangle
}

dorito(75,100)
dorito(200,100)
dorito(315,100)
