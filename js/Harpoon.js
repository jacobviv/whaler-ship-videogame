class Harpoon {

    constructor(ctx, canvasSize, whalerShipPos, whalerShipSize, harpoons) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.whalerShipPos = whalerShipPos
        this.whalerShipSize = whalerShipSize

        this.harpoonPos = {
            x: this.whalerShipPos.x + this.whalerShipSize.w - this.whalerShipSize.w / 3,
            y: this.whalerShipPos.y + this.whalerShipSize.h / 2
        }

        this.harpoons = harpoons

        this.harpoonSize = { w: 20, h: 3 }

        this.vel = { x: 2, y: -1.5 }

        this.gravity = .1
    }

    init() {
        this.draw()
        this.move()
    }

    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.harpoonPos.x, this.harpoonPos.y, this.harpoonSize.w, this.harpoonSize.h)
        this.move()
    }

    move() {
        this.harpoonPos.x += this.vel.x
        this.harpoonPos.y += this.vel.y

        this.vel.y += this.gravity
    }
}