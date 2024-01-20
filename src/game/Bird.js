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

  /**
   * Create a new Bird instance.
   * @param context The canvas context.
   * @param assets A list of loaded assets.
   */
  constructor(context, assets) {
    this.#context = context;
    this.#assets = assets;

    this.#birds = [assets.bird_1, assets.bird_2, assets.bird_1, assets.bird_3];
  }

  /**
   * Make the bird jump.
   * @returns {void}
   */
  jump() {
    this.#velocity = this.#jump;
  }

  /**
   * Update the bird position.
   * @returns {void}
   */
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
  
  /**
   * Draw the bird.
   * @returns {void}
   */
  draw() {
    this.#context.drawImage(this.#birds[this.#flapCounter % this.#birds.length], this.#x, this.#y, this.#assets.bird_1.width, this.#assets.bird_1.height);
  }

  /**
   * Reset the bird position and velocity.
   * @returns {void}
   */
  reset() {
    this.#velocity = 0;
    this.#y = 200;
  }

  /**
   * Get the current bird x-position.
   * @returns {number} The current bird x-position.
   */
  get x() {
    return this.#x; 
  }

  /**
   * Get the current bird y-position.
   * @returns {number} The current bird y-position.
   */
  get y() {
    return this.#y;
  }

  /**
   * Get the bird width.
   * @returns {number} The bird width.
   */
  get width() {
    return this.#assets.bird_1.width;
  }

  /**
   * Get the bird height.
   * @returns {number} The bird height.
   */
  get height() {
    return this.#assets.bird_1.height;
  }

}

export default Bird;