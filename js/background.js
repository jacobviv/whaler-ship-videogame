class Background {

    constructor(ctx, canvasSize, vel) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = './img/pattern1.svg'

        this.posX = 0
        this.posY = 0

        this.vel = .5
    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.canvasSize.w, this.canvasSize.h)
        this.ctx.drawImage(this.image, this.posX, this.posY - this.canvasSize.h, this.canvasSize.w, this.canvasSize.h)
        if (this.posY === this.canvasSize.h) this.posY = 0   //  For an endless background animation

        this.move()

    }

    move() {

        if (this.posY <= -this.canvasSize.h) this.posX = 0
        this.posY += this.vel

    }

}