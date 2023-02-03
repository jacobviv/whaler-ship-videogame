class Bullet {

    constructor(ctx, canvasSize, piratePos, pirateSize, directionUp, bullets) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.piratePos = piratePos
        this.pirateSize = pirateSize

        this.bulletsPos = {
            x: this.piratePos.x,
            y: this.piratePos.y + this.pirateSize.h / 2
        }

        this.bulletsSize = { w: 5, h: 5 }

        this.vel = 2

        this.bullets = bullets

        this.directionUp = directionUp

    }

    init() {
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.bulletsPos.x, this.bulletsPos.y, this.bulletsSize.w, this.bulletsSize.h)
        this.move()
    }

    move() {
        if (this.directionUp) {
            this.bulletsPos.x = this.piratePos.x + this.pirateSize.w / 2
            this.bulletsPos.y -= this.vel
        } else {
            this.bulletsPos.x = this.piratePos.x + this.pirateSize.w / 2
            this.bulletsPos.y += this.vel
        }
    }
}