class Pipes {
  #pipes = [];
  #context;

  #pipeGap = 180;
  #pipeWidth;
  #pipeSpeed = 3;
  #pipeSpace = 300;
  #minimumPipeHeightTop = 50;
  #minimumPipeHeightBottom = 150;
  #collisionThreshold = 3;

  #updateScoreFn;
  #assets;

  #groundX = 0;
  #backgroundX = 0;

  /**
   * Create a new Pipes instance. Creates the first pipe.
   * @param context The canvas context.
   * @param updateScoreFn The function to call when the score is updated.
   * @param assets A list of loaded assets.
   */
  constructor(context, updateScoreFn, assets) {
    this.#context = context;
    this.#updateScoreFn = updateScoreFn;

    this.#assets = assets;
    this.#pipeWidth = assets.pipeTop.width;

    this.createPipe(true);
  }

  /**
   * Create a new pipe.
   * @param {boolean} initial Whether this is the first pipe or not.
   */
  createPipe(initial = false) {
    this.#pipes.push({
      x: initial ? this.#context.canvas.width + this.#pipeWidth * 2 : this.#context.canvas.width,
      y: Math.min(
        Math.max(
          Math.floor(Math.random() * (this.#context.canvas.height - this.#pipeGap)),
          this.#minimumPipeHeightTop
        ),
        this.#context.canvas.height - this.#pipeGap - this.#minimumPipeHeightBottom
      )
    });
  }

  /**
   * Update the pipe positions, background and ground and create new pipes when necessary.
   * Also update the score when a pipe has passed.
   * @returns {void}
   */
  update() {
    this.#groundX -= this.#pipeSpeed;
    if(this.#groundX <= -this.#assets.ground.width) this.#groundX = 0;

    this.#backgroundX -= Math.round(this.#pipeSpeed / 2);
    if(this.#backgroundX <= -this.#assets.background.width) this.#backgroundX = 0;

    this.#pipes.forEach(pipe => {
      pipe.x -= this.#pipeSpeed;
    });

    if (this.#pipes[this.#pipes.length - 1].x < this.#context.canvas.width - this.#pipeSpace) {
      this.createPipe();
    }

    if (this.#pipes[0].x < -this.#pipeWidth) {
      this.#pipes.shift();
      this.#updateScoreFn();
    }
  }

  /**
   * Draw the pipes, background and ground.
   * @returns {void}
   */
  draw() {
    this.#context.drawImage(this.#assets.background, Math.round(this.#backgroundX), 0);
    this.#context.drawImage(this.#assets.background, Math.round(this.#backgroundX + this.#assets.background.width), 0);

    this.#pipes.forEach(pipe => {
      this.#context.drawImage(this.#assets.pipeTop, pipe.x, pipe.y - this.#assets.pipeTop.height, this.#pipeWidth, this.#assets.pipeTop.height);
      this.#context.drawImage(this.#assets.pipeBottom, pipe.x, pipe.y + this.#pipeGap, this.#pipeWidth, this.#assets.pipeBottom.height);
    });

    this.#context.drawImage(this.#assets.ground, Math.round(this.#groundX), this.#context.canvas.height - this.#assets.ground.height);
    this.#context.drawImage(this.#assets.ground, Math.round(this.#groundX + this.#assets.ground.width), this.#context.canvas.height - this.#assets.ground.height);
  }

  /**
   * Check if the bird is colliding with a pipe or the ground or ceiling.
   * @param {Bird} bird The bird to check for collisions with.
   * @returns {boolean} Whether the bird is colliding or not.
   */
  isColliding(bird) {
    for(let i = this.#pipes.length - 1; i >= 0; i--) {
      if (
        (
          bird.x < this.#pipes[i].x + this.#pipeWidth &&
          bird.x + bird.width > this.#pipes[i].x &&
          (bird.y < this.#pipes[i].y - this.#collisionThreshold || bird.y + bird.height > this.#pipes[i].y + this.#pipeGap + this.#collisionThreshold)
        ) || bird.y + bird.height >= this.#context.canvas.height - this.#assets.ground.height || bird.y <= -this.#collisionThreshold
      ) return true;
    }
  }

  /**
   * Reset the pipes to their initial state. Also creates the first pipe.
   * @returns {void}
   */
  reset() {
    this.#pipes = [];
    this.#pipeSpeed = 3;
    this.createPipe(true);
  }

  /**
   * Get the pipe speed.
   * @returns {number} The pipe speed.
   */
  get pipeSpeed() {
    return this.#pipeSpeed;
  }

  /**
   * Set the pipe speed. Clamps the value between 3 and 10.
   * @param {number} speed The new pipe speed.
   * @returns {void}
   */
  set pipeSpeed(speed) {
    this.#pipeSpeed = Math.min(Math.max(speed, 3), 10);
  }

}

export default Pipes;