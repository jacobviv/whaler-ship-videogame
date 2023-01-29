class Islet {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        // this.image = new Image()
        // this.image.src = './img/islet.png'

        this.isletSize = { w: 100, h: 100 }
        this.isletPos = {
            x: this.canvasSize.w + this.isletSize.w,
            y: Math.random() * (this.canvasSize.h - this.isletSize.h * 2) + this.isletSize.h
        }

        this.vel = .5

    }

    generateIslet() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.isletPos.x, this.isletPos.y, this.isletSize.w, this.isletSize.h)
    }
    move() {
        this.isletPos.x -= this.vel
    }


}