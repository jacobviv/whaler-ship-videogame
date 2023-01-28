class WhalerShip {

    constructor(ctx, canvasSize, keys,) {

        this.ctx = ctx
        this.canvasSize = canvasSize
        this.keys = keys

        this.image = new Image()
        this.image.src = './img/whaler-ship.png'

        this.whalerShipSize = { w: 100, h: 100 }
        this.whalerShipPos = {
            x: this.canvasSize.w / 2 - this.whalerShipSize.w / 2,
            y: this.canvasSize.h / 2 - this.whalerShipSize.h / 2
        }

        this.whalerShipVel = 5

        this.setListeners()

    }

    draw() {
        this.ctx.drawImage(this.image, this.whalerShipPos.x, this.whalerShipPos.y, this.whalerShipSize.w, this.whalerShipSize.h)
    }

    setListeners() {

        document.onkeydown = evt => {
            if (evt.key === 'ArrowLeft') this.whalerShipPos.x -= this.whalerShipVel
            if (evt.key === 'ArrowRight') this.whalerShipPos.x += this.whalerShipVel
            if (evt.key === 'ArrowUp') this.whalerShipPos.y -= this.whalerShipVel
            if (evt.key === 'ArrowDown') this.whalerShipPos.y += this.whalerShipVel
            if (evt.key === 'r') {
                this.whalerShipPos.y -= this.whalerShipVel
                this.whalerShipPos.x += this.whalerShipVel
            }
            if (evt.key === 'v') {
                this.whalerShipPos.y += this.whalerShipVel
                this.whalerShipPos.x += this.whalerShipVel
            }
            if (evt.key === 'e') {
                this.whalerShipPos.y -= this.whalerShipVel
                this.whalerShipPos.x -= this.whalerShipVel
            }
            if (evt.key === 'c') {
                this.whalerShipPos.y += this.whalerShipVel
                this.whalerShipPos.x -= this.whalerShipVel
            }

        }

    }
}