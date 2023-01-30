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
        this.whalerShipVel = 3

        this.setListeners()

        this.margin = 20

        this.canMove = {
            north: false,
            south: false,
            east: false,
            west: false,
            northEast: false,
            northWest: false,
            southEast: false,
            southWest: false
        }

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

            const { key } = evt

            if (key === 'ArrowLeft') this.canMove.west = true

            if (key === 'ArrowRight') this.canMove.east = true

            if (key === 'ArrowUp') this.canMove.north = true

            if (key === 'ArrowDown') this.canMove.south = true

            if (key === 'r') this.canMove.northEast = true

            if (key === 'v') this.canMove.northWest = true

            if (key === 'e') this.canMove.southEast = true

            if (key === 'c') this.canMove.southWest = true

        }

        document.onkeyup = evt => {

            const { key } = evt

            if (key === 'ArrowLeft') this.canMove.west = false

            if (key === 'ArrowRight') this.canMove.east = false

            if (key === 'ArrowUp') this.canMove.north = false

            if (key === 'ArrowDown') this.canMove.south = false

            if (key === 'r') this.canMove.northEast = false

            if (key === 'v') this.canMove.northWest = false

            if (key === 'e') this.canMove.southEast = false

            if (key === 'c') this.canMove.southWest = false
        }
    }

    moveWest() {
        if (this.whalerShipPos.x > 0 + this.margin)
            this.whalerShipPos.x -= this.whalerShipVel
    }

    moveEast() {
        if (this.whalerShipPos.x < this.canvasSize.w - this.whalerShipSize.w - this.margin)
            this.whalerShipPos.x += this.whalerShipVel
    }

    moveNorth() {
        if (this.whalerShipPos.y > 0 + this.margin)
            this.whalerShipPos.y -= this.whalerShipVel
    }

    moveSouth() {
        if (this.whalerShipPos.y < this.canvasSize.h - this.whalerShipSize.h - this.margin)
            this.whalerShipPos.y += this.whalerShipVel
    }

    moveNorthEast() {
        if (this.whalerShipPos.y > 0 + this.margin
            && this.whalerShipPos.x < this.canvasSize.w - this.whalerShipSize.w - this.margin) {
            this.whalerShipPos.y -= this.whalerShipVel / 2
            this.whalerShipPos.x += this.whalerShipVel / 2
        }
    }

    moveSouthEast() {
        if (this.whalerShipPos.y < this.canvasSize.h - this.whalerShipSize.h - this.margin
            && this.whalerShipPos.x < this.canvasSize.w - this.whalerShipSize.w - this.margin) {
            this.whalerShipPos.y -= this.whalerShipVel / 2
            this.whalerShipPos.x -= this.whalerShipVel / 2
        }
    }

    moveNorthWest() {
        if (this.whalerShipPos.y > 0 + this.margin && this.whalerShipPos.x > 0 + this.margin) {
            this.whalerShipPos.y += this.whalerShipVel / 2
            this.whalerShipPos.x += this.whalerShipVel / 2
        }
    }

    moveSouthWest() {
        if (this.whalerShipPos.y < this.canvasSize.h - this.whalerShipSize.h - this.margin
            && this.whalerShipPos.x > 0 + this.margin) {
            this.whalerShipPos.y += this.whalerShipVel / 2
            this.whalerShipPos.x -= this.whalerShipVel / 2
        }
    }

}