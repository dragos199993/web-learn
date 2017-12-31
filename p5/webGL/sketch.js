
let angle = 0;
let image;
let cam;

function preload(){
    image = loadImage('image.jpg');
}


function setup() {
  createCanvas(400, 400, WEBGL);
  cam = createCapture(VIDEO);
  cam.size(300,300);
  cam.hide();
}

function draw() {
//   pointLight(255,255,255, -200,0, 0);
// //   pointLight(255,0,0, 200, 0 , 0);
//   let dy = mouseY - height/2;
//   let dx = mouseX - width/2;
//   v = createVector(dx,dy,0);
//   v.normalize();
//   directionalLight(255,255,255, v);
  background(175);
  rectMode(CENTER);
  //fill(0,0, 255);
  //translate(0,0,mouseX);
  //translate(mouseX - width/2, mouseY - height/2);
  //  ambientMaterial(255);
    rotateY(angle);
    rotateX(angle * 0.9);
  texture(cam);
  box(100,100);
  angle += 0.05;
}