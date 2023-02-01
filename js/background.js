class Background {

    constructor(ctx, canvasSize, vel) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = './img/pattern2.svg'

        this.pos = { x: 0, y: 0 }

        this.vel = .6
    }

    draw() {

        this.ctx.drawImage(this.image, this.pos.x, this.pos.y, this.canvasSize.w, this.canvasSize.h)
        this.ctx.drawImage(this.image, this.pos.x + this.canvasSize.w, this.pos.y, this.canvasSize.w, this.canvasSize.h)
        if (this.pos.x === this.canvasSize.w) this.pos.x = 0   //  For an endless background animation

        this.move()

    }

    move() {

        if (this.pos.x <= -this.canvasSize.w) this.pos.x = 0
        this.pos.x -= this.vel

    }

}