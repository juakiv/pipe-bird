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
      this.#setViewFn("guide");

      this.#bird = new Bird(this.#context, this.#assets);
      this.#pipes = new Pipes(this.#context, () => this.updateScore(), this.#assets);

      this.#paused = false;
      this.render();
    });
  }

  loadAssets() {
    const assets = [
      { name: "pipeBottom", src: "/pipe_bottom.png", type: "image" },
      { name: "pipeTop", src: "/pipe_top.png", type: "image" },
      { name: "ground", src: "/ground.png", type: "image" },
      { name: "background", src: "/background.png", type: "image" },
      { name: "bird_1", src: "/bird_1.png", type: "image" },
      { name: "bird_2", src: "/bird_2.png", type: "image" },
      { name: "bird_3", src: "/bird_3.png", type: "image" },
      { name: "whoosh", src: "/whoosh.mp3", type: "audio" },
      { name: "wallhit", src: "/wallhit.mp3", type: "audio" },
    ];

    const promises = assets.map(asset => {
      return new Promise((resolve, reject) => {
        if(asset.type === "audio") {
          const audio = new Audio();
          audio.src = asset.src;
          audio.oncanplaythrough = () => {
            this.#assets[asset.name] = audio;
            setTimeout(() => resolve(), 300);
          };
          audio.onerror = () => {
            reject();
          };
        } else {
          const image = new Image();
          image.src = asset.src;
          image.onload = () => {
            this.#assets[asset.name] = image;
            setTimeout(() => resolve(), 300);
          };
          image.onerror = () => {
            reject();
          };
        }
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

  #playSound(sound) {
    if(this.#assets[sound]) {
      this.#assets[sound].cloneNode(true).play();
    }
  }

  jump() {
    if(this.#paused || this.#roundHasEnded) return;

    if(!this.#roundHasStarted) {
      this.#roundHasStarted = true;
      this.#setViewFn("game");
    }

    this.#bird.jump();
    this.#playSound("whoosh");
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
      if(this.#roundHasStarted) {
        this.#playSound("wallhit");
      }
      this.#roundHasStarted = false;
      this.#roundHasEnded = true;
      this.#setViewFn("gameover");
    }

    requestAnimationFrame(() => this.render());
  }
}

export default Game;