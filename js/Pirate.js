class Pirate {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = './img/pirate-ship.png'

        this.pirateSize = { w: 65, h: 37 }
        this.piratePos = {
            x: this.canvasSize.w + this.pirateSize.w,
            y: Math.random() * (this.canvasSize.h - this.pirateSize.h * 2) + this.pirateSize.h
        }

        this.vel = 1.2

    }

    draw() {
        this.ctx.drawImage(this.image, this.piratePos.x, this.piratePos.y, this.pirateSize.w, this.pirateSize.h)
        // this.ctx.fillStyle = 'red'
        // this.ctx.fillRect(this.piratePos.x, this.piratePos.y, this.pirateSize.w, this.pirateSize.h)
    }
    move() {
        this.piratePos.x -= this.vel
    }


}