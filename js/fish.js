class Fish {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        // this.image = new Image()
        // this.image.src = './img/fish.png'

        this.fishSize = { w: 5, h: 5 }
        this.fishPos = {
            // x: Math.random() * (this.canvasSize.w - this.fishSize.w * 2) + this.fishSize.w,
            x: this.canvasSize.w + this.fishSize.w,
            y: Math.random() * (this.canvasSize.h - this.fishSize.h * 2) + this.fishSize.h
        }

        this.vel = .5

    }

    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.fishPos.x, this.fishPos.y, this.fishSize.w, this.fishSize.h)
    }
    move() {
        this.fishPos.x -= this.vel
    }

}