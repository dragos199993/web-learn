console.log('it worked, yay');
let socket;
function setup() {
    createCanvas(400, 400);
    background(51);
    socket = io.connect('http://localhost:3001');
    socket.on('mouse', data => {
        fill(255,0,0);
        noStroke();
        ellipse(data.x, data.y, 15, 15);
    })
}

function mouseDragged() {
    console.log(mouseX + ' x ' + mouseY);
    let data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data);

    fill(255);
    noStroke();
    ellipse(mouseX, mouseY, 15, 15);
}

function draw() {

}   