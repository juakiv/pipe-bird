class Bird {

  #x = 50;
  #y = 200;

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
      if(this.#flapCounter > 3) this.#flapCounter = 0;
    }

    if(this.#y + this.#assets.bird_1.height > this.#context.canvas.height - this.#assets.ground.height) {
      this.#y = this.#context.canvas.height - this.#assets.bird_1.height - this.#assets.ground.height;
      this.#velocity = 0;
    }
  }
  
  draw() {
    this.#context.drawImage(this.#birds[this.#flapCounter % this.#birds.length], this.#x, this.#y, this.#assets.bird_1.width, this.#assets.bird_1.height);
  }

  reset() {
    this.#velocity = 0;
    this.#y = 200;
  }

  get x() {
    return this.#x; 
  }

  get y() {
    return this.#y;
  }

  get width() {
    return this.#assets.bird_1.width;
  }

  get height() {
    return this.#assets.bird_1.height;
  }

}

export default Bird;