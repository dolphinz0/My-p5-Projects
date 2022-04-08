class Mover {
  constructor (X, v, m, s, color) {
    this.pos = X;
    this.vel = v;
    this.acc = createVector(0, 0);
    this.mass = m;
    this.stay = s;
    this.color = color;
  }
  
  show() {
    colorMode(HSB);
    fill(this.color, 100, 100);
    circle(this.pos.x, this.pos.y, 20*this.mass);
  }
  
  showWithS(s) {
    circle(this.pos.x, this.pos.y, s);
  }
  
  update() {
    if (!this.stay) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  }
  
  applyForce(force) {
    if (!this.stay)
      this.acc.add(force.copy());
  }
  
  copy(other) {
    this.pos = other.pos.copy();
    this.vel = other.vel.copy();
  }
  
  showVel() {
    let vel = this.vel.copy();
    vel.normalize().mult(100);
    line(this.pos.x, this.pos.y, this.pos.x + vel.x, this.pos.y + vel.y);
  }
  
  drawOrbit() {
    this.stay = false
    let m2 = new Mover();
    m2.copy(this);
    // m2.vel.mult(100);
    // beginShape();
    vertex(m2.pos.x, m2.pos.y);
    noFill();
    for (let i = 0; i < 1000; i++) {
      push();
      noStroke();
      stroke(255, 0, 0);
      let force = sun.pos.copy().sub(m2.pos).mult((sun.mass * m2.mass)/pow(sun.pos.dist(m2.pos), 2));
      m2.applyForce(force);
      m2.update();
      circle(m2.pos.x, m2.pos.y, 3);
      pop();
    }
    // endShape();
    this.stay = true;
}
}