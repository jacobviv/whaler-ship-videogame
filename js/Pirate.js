class Pirate {

    constructor(ctx, canvasSize, whalerShipPos, whalerShipSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = './img/pirate-ship.png'

        this.pirateSize = { w: 65, h: 37 }
        this.piratePos = {
            x: this.canvasSize.w + this.pirateSize.w,
            y: Math.random() * (this.canvasSize.h - this.pirateSize.h * 2) + this.pirateSize.h
        }

        this.whalerShipPos = whalerShipPos
        this.whalerShipSize = whalerShipSize

        this.vel = 1.2

        this.bullets = []
        this.directionUp = false

    }

    draw(framesCounter) {
        this.bullets.forEach(elm => elm.draw())
        this.ctx.drawImage(this.image, this.piratePos.x, this.piratePos.y, this.pirateSize.w, this.pirateSize.h)
        this.clear()
        if (framesCounter % 90 === 0) { this.shoot() }
        if (this.piratePos.y > this.whalerShipPos.y + this.whalerShipSize.h) {
            this.directionUp = true
        } else { false }

    }
    move() {
        this.piratePos.x -= this.vel
    }

    shoot() {
        if (this.whalerShipPos.x + this.whalerShipSize.w > this.piratePos.x - this.whalerShipSize.w && this.whalerShipPos.x < this.piratePos.x + this.pirateSize.w + this.whalerShipSize.w)
            this.bullets.push(new Bullet(this.ctx, this.canvasSize, this.piratePos, this.pirateSize, this.directionUp))
    }

    clear() {
        this.bullets = this.bullets.filter(elm => elm.bulletsPos.y > 0 && elm.bulletsPos.y < this.canvasSize.h)
    }

}