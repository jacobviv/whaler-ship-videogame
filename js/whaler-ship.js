class WhalerShip {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = './img/whaler-ship.png'

        this.whalerShipSize = { w: 80, h: 70 }
        this.whalerShipPos = {
            x: this.canvasSize.w / 2 - this.whalerShipSize.w / 2,
            y: this.canvasSize.h / 2 - this.whalerShipSize.h / 2
        }

        this.vel = .3
        this.whalerShipVel = 7

        this.setListeners()

        this.margin = 20

    }

    draw() {
        this.ctx.drawImage(this.image, this.whalerShipPos.x, this.whalerShipPos.y, this.whalerShipSize.w, this.whalerShipSize.h)
        this.move()
    }

    move() {
        if (this.whalerShipPos.x > 0 + this.margin) this.whalerShipPos.x -= this.vel
    }

    setListeners() {

        document.onkeydown = evt => {

            // Movement keys
            if (evt.key === 'ArrowLeft'
                && this.whalerShipPos.x > 0 + this.margin)
                this.whalerShipPos.x -= this.whalerShipVel
            if (evt.key === 'ArrowRight'
                && this.whalerShipPos.x < this.canvasSize.w - this.whalerShipSize.w - this.margin)
                this.whalerShipPos.x += this.whalerShipVel
            if (evt.key === 'ArrowUp'
                && this.whalerShipPos.y > 0 + this.margin)
                this.whalerShipPos.y -= this.whalerShipVel
            if (evt.key === 'ArrowDown'
                && this.whalerShipPos.y < this.canvasSize.h - this.whalerShipSize.h - this.margin)
                this.whalerShipPos.y += this.whalerShipVel
            if (evt.key === 'r'
                && this.whalerShipPos.y > 0 + this.margin
                && this.whalerShipPos.x < this.canvasSize.w - this.whalerShipSize.w - this.margin) {
                this.whalerShipPos.y -= this.whalerShipVel
                this.whalerShipPos.x += this.whalerShipVel
            }
            if (evt.key === 'v'
                && this.whalerShipPos.y < this.canvasSize.h - this.whalerShipSize.h - this.margin
                && this.whalerShipPos.x < this.canvasSize.w - this.whalerShipSize.w - this.margin) {
                this.whalerShipPos.y += this.whalerShipVel
                this.whalerShipPos.x += this.whalerShipVel
            }
            if (evt.key === 'e'
                && this.whalerShipPos.y > 0 + this.margin
                && this.whalerShipPos.x > 0 + this.margin) {
                this.whalerShipPos.y -= this.whalerShipVel
                this.whalerShipPos.x -= this.whalerShipVel
            }
            if (evt.key === 'c'
                && this.whalerShipPos.y < this.canvasSize.h - this.whalerShipSize.h - this.margin
                && this.whalerShipPos.x > 0 + this.margin) {
                this.whalerShipPos.y += this.whalerShipVel
                this.whalerShipPos.x -= this.whalerShipVel
            }
        }

    }
}