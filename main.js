import { Input } from "./classes/input.js";
import { Player } from "./classes/player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this, canvas.width / 2, canvas.height / 2);
    this.input = new Input(this);
  }
  update() {
    this.player.update();
  }
  draw(ctx) {
    this.player.draw(ctx);
  }
  movment() {
    //player 1
    let maxSpeed = 2;

    if (
      (this.input.p1Keys.w.pressed || this.input.p1Keys.s.pressed) &&
      (this.input.p1Keys.a.pressed || this.input.p1Keys.d.pressed)
    ) {
      maxSpeed *= 0.71;
    }
    if (this.input.p1Keys.w.pressed) {
      this.player.moveY(-maxSpeed);
    } else if (this.input.p1Keys.s.pressed) {
      this.player.moveY(maxSpeed);
    } else {
      this.player.moveY(0);
    }

    if (this.input.p1Keys.a.pressed) {
      this.player.moveX(-maxSpeed);
    } else if (this.input.p1Keys.d.pressed) {
      this.player.moveX(maxSpeed);
    } else {
      this.player.moveX(0);
    }
  }
}

const game = new Game(canvas.width, canvas.height);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "wheat";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  game.update();
  game.movment();
  game.draw(ctx);
}

requestAnimationFrame(animate);
