class Bird {

  #x = 50;
  #y = 200;
  #width = 50;
  #height = 45;
  #color = "#ff0000";
  #gravity = 0.7;
  #velocity = 0;
  #jump = -12;
  #context;
  #assets;

  #birds;
  #flapCounter = 0;
  #lastTimestamp = new Date().getTime();

  constructor(context, assets) {
    this.#context = context;
    this.#assets = assets;

    this.#width = assets.bird_1.width;
    this.#height = assets.bird_1.height;

    this.#birds = [assets.bird_1, assets.bird_2, assets.bird_1, assets.bird_3];
  }

  jump() {
    this.#velocity = this.#jump;
  }

  update() {
    this.#velocity += this.#gravity;
    this.#y += this.#velocity;

    if(new Date().getTime() - this.#lastTimestamp > 120) {
      this.#lastTimestamp = new Date().getTime();
      this.#flapCounter += 1;
    }

    if(this.#y + this.#height > this.#context.canvas.height - this.#assets.ground.height) {
      this.#y = this.#context.canvas.height - this.#height - this.#assets.ground.height;
      this.#velocity = 0;
    }
  }
  
  draw() {
    this.#context.drawImage(this.#birds[this.#flapCounter % this.#birds.length], this.#x, this.#y, this.#width, this.#height);
  }

  reset() {
    this.#velocity = 0;
    this.#y = 200;
  }

  get color() {
    return this.#color;
  }

  get x() {
    return this.#x; 
  }

  get y() {
    return this.#y;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

}

export default Bird;