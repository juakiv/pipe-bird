import Bird from "./Bird";
import Pipes from "./Pipes";

class Game {

  #score = 0;
  #setScoreFn;
  #setViewFn;

  #assets = {};
  
  #paused = true;
  #roundHasStarted = false;
  #roundHasEnded = false;

  #canvas;
  #context;

  #bird;
  #pipes;

  constructor(canvas, setScoreFn, setViewFn) {
    this.#canvas = canvas;
    this.#context = canvas.getContext("2d");

    this.#setScoreFn = setScoreFn;
    this.#setViewFn = setViewFn;
    
    this.loadAssets().then(() => {
      this.#bird = new Bird(this.#context, this.#assets.ground.height);
      this.#pipes = new Pipes(this.#context, () => this.updateScore(), this.#assets);

      this.#paused = false;
      this.render();
    });
  }

  loadAssets() {
    const assets = [
      { name: "pipeBottom", src: "/pipe_bottom.png" },
      { name: "pipeTop", src: "/pipe_top.png" },
      { name: "ground", src: "/ground.png" },
      { name: "background", src: "/background.png" },
    ];

    const promises = assets.map(asset => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = asset.src;
        image.onload = () => {
          this.#assets[asset.name] = image;
          resolve();
        };
        image.onerror = () => {
          reject();
        };
      });
    });

    return Promise.all(promises);
  }

  updateScore() {
    this.#score += 1;
    if(this.#score % 5 === 0) {
      this.#pipes.pipeSpeed += 0.3;
    }
    this.#setScoreFn(this.#score);
  }

  jump() {
    if(this.#paused || this.#roundHasEnded) return;

    if(!this.#roundHasStarted) {
      this.#roundHasStarted = true;
      this.#setViewFn("game");
    }

    this.#bird.jump();
  }

  #resume() {
    this.#paused = false;
    this.#setViewFn("game");
    this.render();
  }

  #pause() {
    this.#paused = true;
    this.#setViewFn("paused");
  }

  togglePause() {
    if(this.#roundHasEnded || !this.#roundHasStarted) return;

    if(this.#paused) {
      this.#resume();
    } else {
      this.#pause();
    }
  }

  restart() {
    this.#score = 0;
    this.#setScoreFn(this.#score);
    this.#setViewFn("guide");

    this.#pipes.reset();
    this.#bird.reset();

    this.#roundHasStarted = false;
    this.#roundHasEnded = false;

    if(this.#paused) {
      this.#paused = false;
      this.render();
    }
  }

  render() {
    if(this.#paused) return;
    
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    
    if(this.#roundHasStarted || this.#roundHasEnded) {
      this.#bird.update();

      if(!this.#roundHasEnded) {
        this.#pipes.update();
      }
    }
    
    this.#pipes.draw();
    this.#bird.draw();

    if(this.#pipes.isColliding(this.#bird)) {
      this.#roundHasStarted = false;
      this.#roundHasEnded = true;
      this.#setViewFn("gameover");
    }

    requestAnimationFrame(() => this.render());
  }
}

export default Game;