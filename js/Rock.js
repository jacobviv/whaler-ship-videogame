class Rock {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        // this.image = new Image()
        // this.image.src = './img/rock.png'

        this.rockSize = { w: 50, h: 50 }
        this.rockPos = {
            x: this.canvasSize.w + this.rockSize.w,
            y: Math.random() * (this.canvasSize.h - this.rockSize.h * 2) + this.rockSize.h
        }

        this.vel = .5

    }

    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.rockPos.x, this.rockPos.y, this.rockSize.w, this.rockSize.h)
    }
    move() {
        this.rockPos.x -= this.vel
    }


}