const whaleShipApp = {
    name: 'Whale Ship app',
    description: 'Arcade action game',
    platform: 'Web browser',
    mode: 'Single player',
    version: '1.0.0',
    license: undefined,
    author: 'Rubén Briongos',

    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    instructionsHeight: 115,

    FPS: 60,
    framesIndex: 0,
    interval: undefined,
    background: undefined,
    whalerShip: undefined,

    islandsDens: 1200,
    islands: [],

    isletsDens: 900,
    islets: [],

    rocksDens: 600,
    rocks: [],

    fishesDens: 1200,
    fishes: [],
    fishesCounter: 0,

    init() {
        this.setContext()
        this.setDimensions()
        this.start()
    },

    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
        console.log(this.ctx)
    },

    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight - this.instructionsHeight
        }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },

    createIsland() {
        this.islands.push(new Island(this.ctx, this.canvasSize))
    },

    createIslet() {
        this.islets.push(new Islet(this.ctx, this.canvasSize))
    },

    createRock() {
        this.rocks.push(new Rock(this.ctx, this.canvasSize))
    },

    createFish() {
        this.fishes.push(new Fish(this.ctx, this.canvasSize))
        console.log(this.fishes)
    },

    start() {

        this.reset()

        this.interval = setInterval(() => {

            this.framesIndex > 5000 ? this.framesIndex = 0 : this.framesIndex++

            this.clearAll()
            this.moveAll()
            this.createAll()
            this.drawAll()
            this.checkCollision()

        }, 1000 / this.FPS)

    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize)
        this.whalerShip = new WhalerShip(this.ctx, this.canvasSize)
        this.islands = []
        this.islets = []
        this.rocks = []
        this.fishes = []
    },

    drawAll() {
        this.background.draw()
        this.islands.forEach(elm => elm.draw())
        this.islets.forEach(elm => elm.draw())
        this.rocks.forEach(elm => elm.draw())
        this.fishes.forEach(elm => elm.draw())
        this.whalerShip.draw()
    },

    moveAll() {
        this.islands.forEach(elm => elm.move())
        this.islets.forEach(elm => elm.move())
        this.rocks.forEach(elm => elm.move())
        this.fishes.forEach(elm => elm.move())

        if (this.whalerShip.canMove.north) this.whalerShip.moveNorth()
        if (this.whalerShip.canMove.south) this.whalerShip.moveSouth()
        if (this.whalerShip.canMove.east) this.whalerShip.moveEast()
        if (this.whalerShip.canMove.west) this.whalerShip.moveWest()
        if (this.whalerShip.canMove.northEast) this.whalerShip.moveNorthEast()
        if (this.whalerShip.canMove.southEast) this.whalerShip.moveSouthEast()
        if (this.whalerShip.canMove.northWest) this.whalerShip.moveNorthWest()
        if (this.whalerShip.canMove.southWest) this.whalerShip.moveSouthWest()
    },

    createAll() {
        this.framesIndex % this.islandsDens === 0 && this.createIsland()
        this.framesIndex % this.isletsDens === 0 && this.createIslet()
        this.framesIndex % this.isletsDens === 0 && this.createRock()
        this.framesIndex % this.fishesDens === 0 && this.createFish()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.clearIslands()
        this.clearIslets()
        this.clearRocks()
        this.clearFishes()
    },

    checkCollision() {
        // if (this.isIslandCollision) this.whalerShip.whalerShipPos.x = this.islands.islandPos.x + this.whalerShip.whalerShipSize.w
        this.isIslandCollision() ? this.gameOver() : null
        this.isIsletCollision() ? this.gameOver() : null
        this.isRockCollision() ? this.gameOver() : null
        if (this.isRockCollision === true) alert("Rock Collision")
    },

    clearIslands() {
        this.islands = this.islands.filter(elm => elm.islandPos.x > -elm.islandSize.w)
    },

    clearIslets() {
        this.islets = this.islets.filter(elm => elm.isletPos.x > -elm.isletSize.w)
    },

    clearRocks() {
        this.rocks = this.rocks.filter(elm => elm.rockPos.x > -elm.rockSize.w)
    },

    clearFishes() {
        this.fishes = this.fishes.filter(elm => elm.fishPos.x > -elm.fishSize.w)
    },

    isIslandCollision() {
        return this.islands.some(elm => {
            return (
                this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.islandPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.islandPos.x + elm.islandSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.islandPos.y &&
                this.whalerShip.whalerShipPos.y <= elm.islandPos.y + elm.islandSize.h
            )
        })
    },


    isIsletCollision() {
        return this.islets.some(elm => {
            return (
                this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.isletPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.isletPos.x + elm.isletSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.isletPos.y &&
                this.whalerShip.whalerShipPos.y <= elm.isletPos.y + elm.isletSize.h
            )
        })
    },

    isRockCollision() {
        return this.rocks.some(elm => {
            return (
                this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.rockPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.rockPos.x + elm.rockSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.rockPos.y &&
                this.whalerShip.whalerShipPos.y <= elm.rockPos.y + elm.rockSize.h
            )
        })
    },





    gameOver() {
        clearInterval(this.interval)
    }

}