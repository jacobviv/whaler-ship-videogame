class Island {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        // this.image = new Image()
        // this.image.src = './img/island.png'

        this.islandSize = { w: 200, h: 200 }
        this.islandPos = {
            x: this.canvasSize.w + this.islandSize.w,
            y: Math.random() * (this.canvasSize.h - this.islandSize.h) + this.islandSize.h
        }

        this.vel = .5

    }

    generateIsland() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.islandPos.x, this.islandPos.y, this.islandSize.w, this.islandSize.h)
    }
    move() {
        this.islandPos.x -= this.vel
    }


}