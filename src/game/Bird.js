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
  #groundHeight;

  constructor(context, groundHeight) {
    this.#context = context;
    this.#groundHeight = groundHeight;
  }

  jump() {
    this.#velocity = this.#jump;
  }

  update() {
    this.#velocity += this.#gravity;
    this.#y += this.#velocity;

    if(this.#y + this.#height > this.#context.canvas.height - this.#groundHeight) {
      this.#y = this.#context.canvas.height - this.#height - this.#groundHeight;
      this.#velocity = 0;
    }
  }
  
  draw() {
    this.#context.fillStyle = this.#color;
    this.#context.fillRect(this.#x, this.#y, this.#width, this.#height);
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