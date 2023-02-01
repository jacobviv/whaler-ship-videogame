class Whale {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        // this.image = new Image()
        // this.image.src = './img/whale.png'

        this.margin = { x: 200, y: 50 }

        this.whaleSize = { w: 75, h: 25 }
        this.whalePos = {
            x: Math.random() * (this.canvasSize.w - this.whaleSize.w * 2) + this.margin.x,
            // x: this.canvasSize.w + this.whaleSize.w,
            y: Math.random() * (this.canvasSize.h - this.whaleSize.h * 2) + this.margin.y
        }

        this.vel = .25

    }

    draw() {
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.whalePos.x, this.whalePos.y, this.whaleSize.w, this.whaleSize.h)
    }
    move() {
        this.whalePos.x -= this.vel / 10
        this.whalePos.y -= this.vel
    }

}