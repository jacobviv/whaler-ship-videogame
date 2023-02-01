class Fish {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        // this.image = new Image()
        // this.image.src = './img/fish.png'

        this.margin = { x: 400, y: 50 }

        this.fishSize = { w: 12, h: 5 }
        this.fishPos = {
            x: Math.random() * (this.canvasSize.w - this.fishSize.w * 2) + this.margin.x,
            // x: this.canvasSize.w + this.fishSize.w,
            y: Math.random() * (this.canvasSize.h - this.fishSize.h * 2) + this.margin.y
        }

        this.vel = .6

    }

    draw() {
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.fishPos.x, this.fishPos.y, this.fishSize.w, this.fishSize.h)
    }
    move() {
        this.fishPos.x -= this.vel
        this.fishPos.y -= this.vel / 10
    }

}