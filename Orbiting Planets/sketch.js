let m, m1, m2, m3, m4, mArr = [], sun;

function setup() {
  createCanvas(1000, 1000);
  for (let i = 0; i < 6; i++) {
    mArr.push(new Mover(createVector(0, i*200), createVector(1, 0), 2, false, i*20));
  }
  sun = new Mover(createVector(width/2, height/2), createVector(0, 0), 5, true, 0);
  function onFocusHandler() {
    this.value = "";
    mArr[0].pos = createVector(width/2, height/4);
    mArr[0].stay = true;
  }
  
function onChangeHandler() {
    console.log(dom.value);
    str = dom.value;
    velX = parseFloat(str.match(/-?\d+.?\d+?/));
  velY = parseFloat(str.match(/ -?\d+.?\d+?/));
    console.log(velX);
  console.log(velY);
    mArr[0].vel = createVector(velX, velY);  
    mArr[0].stay = false;  
  }
  function onClickHandler() {
    mArr[0].stay = !mArr[0].stay;
  }
  let dom = document.getElementById("velBox");
let butt = document.getElementById("stay0");
  butt.onclick = onClickHandler;
dom.onfocus = onFocusHandler;
dom.onchange = onChangeHandler;
  

}

function draw() {
  background(255);
  for (let i = 0; i < 6; i++) {
    mArr[i].show();
    let force = sun.pos.copy().sub(mArr[i].pos).mult((sun.mass * mArr[i].mass)/pow(sun.pos.dist(mArr[i].pos), 2));
    mArr[i].applyForce(force);
    mArr[i].update();
    
  }
  sun.show();
  mArr[0].showVel();
  
  if (mouseX > 0 && mouseY > 0 && mouseIsPressed) {
    mArr[0].pos = createVector(mouseX, mouseY);
    mArr[0].stay = true;
  }
}