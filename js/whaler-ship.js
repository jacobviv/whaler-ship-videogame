class WhalerShip {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        // this.image = new Image()
        // this.image.src = './img/whaler-ship.png'

        this.whalerShipSize = { w: 64, h: 45 }
        this.whalerShipPos = {
            x: this.canvasSize.w / 2 - this.whalerShipSize.w / 2,
            y: this.canvasSize.h / 2 - this.whalerShipSize.h / 2
        }
        this.harpoons = []

        this.vel = .4
        this.whalerShipVel = 1.2

        this.setListeners()

        this.margin = 20

        this.canMove = {
            north: false,
            south: false,
            east: false,
            west: false
        }

        this.image = new Image();
        this.image.src = './img/whaler-ship-sprite.png'
        this.image.frames = 9;
        this.image.framesIndex = 0;

    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.width / this.image.frames * this.image.framesIndex,
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.whalerShipPos.x,
            this.whalerShipPos.y,
            this.whalerShipSize.w,
            this.whalerShipSize.h)
        this.move()
        this.clearHarpoons()
        this.harpoons.forEach(elm => elm.draw())
        this.animate(framesCounter)
    }

    move() {
        if (this.whalerShipPos.x > 0 + this.margin) this.whalerShipPos.x -= this.vel
    }

    animate(framesCounter) {
        if (framesCounter % 4 == 0) {
            this.image.framesIndex++;
        }

        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0
        }

    }


    setListeners() {

        document.onkeydown = evt => {

            const { key } = evt

            if (key === 'ArrowLeft') this.canMove.west = true

            if (key === 'ArrowRight') this.canMove.east = true

            if (key === 'ArrowUp') this.canMove.north = true

            if (key === 'ArrowDown') this.canMove.south = true

            if (key === 'n') window.location.reload()

            if (key === ' ') this.shoot()

            if (key === 'm') {
                const audio = document.querySelector("audio");
                audio.volume = .5;
                audio.play();
            }
            if (key === 'p') {
                const audio = document.querySelector("audio");
                audio.pause();
            }

        }

        document.onkeyup = evt => {

            const { key } = evt

            if (key === 'ArrowLeft') this.canMove.west = false

            if (key === 'ArrowRight') this.canMove.east = false

            if (key === 'ArrowUp') this.canMove.north = false

            if (key === 'ArrowDown') this.canMove.south = false

            if (key === 'r') this.canMove.northEast = false

            if (key === 'e') this.canMove.northWest = false

            if (key === 'v') this.canMove.southEast = false

            if (key === 'c') this.canMove.southWest = false
        }
    }

    moveWest() {
        if (this.whalerShipPos.x > this.margin)
            this.whalerShipPos.x -= this.whalerShipVel
    }

    moveEast() {
        if (this.whalerShipPos.x < this.canvasSize.w - this.whalerShipSize.w - this.margin)
            this.whalerShipPos.x += this.whalerShipVel
    }

    moveNorth() {
        if (this.whalerShipPos.y > this.margin)
            this.whalerShipPos.y -= this.whalerShipVel
    }

    moveSouth() {
        if (this.whalerShipPos.y < this.canvasSize.h - this.whalerShipSize.h - this.margin)
            this.whalerShipPos.y += this.whalerShipVel
    }

    shoot() {
        this.harpoons.push(new Harpoon(this.ctx, this.canvasSize, this.whalerShipPos, this.whalerShipSize))
        console.log(this.harpoons)
    }

    clearHarpoons() {
        this.harpoons = this.harpoons.filter(elm => elm.harpoonPos.y < this.whalerShipPos.y + this.whalerShipSize.h)
    }


}   