function setup() {
  createCanvas(1000, 1000);
  background(220);
  let x = 0;
  let y = 0;
  let n = 50;
  Hit(n, x, y);
  translate(0, height);
  rotate(-PI/2);
  x = 0; y = 0;
  Hit(n, x, y);
}

function drawHorizontal(n, x, y, bit) {
  for (let i = 0; i < n; i++) {
    if (i%2==bit)
      line(x, y, x+=width/n, y);
    else
      x+=width/n
  }
}

function Hit(n ,x, y) {
  for (let j = 0; j < n; j++) {
    drawHorizontal(n, x, y, round(random()));
    y+=height/n;
  }
}
