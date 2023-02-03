class Whale {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = './img/whale.png'

        this.margin = { x: 200, y: 50 }

        this.whaleSize = { w: 85, h: 59 }
        this.whalePos = {
            x: Math.random() * (this.canvasSize.w - this.whaleSize.w * 2) + this.margin.x,
            y: Math.random() * (this.canvasSize.h - this.whaleSize.h * 2) + this.margin.y
        }

        this.vel = .6


    }

    draw() {
        this.ctx.drawImage(this.image, this.whalePos.x, this.whalePos.y, this.whaleSize.w, this.whaleSize.h)
    }
    move() {
        this.whalePos.x -= this.vel / 5
        this.whalePos.y -= this.vel
    }

}