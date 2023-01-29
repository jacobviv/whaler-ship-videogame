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

    FPS: 60,
    framesIndex: 0,
    interval: undefined,
    background: undefined,
    // vel: 0.5,
    whalerShip: undefined,

    islandsDens: 1200,
    islands: [],

    isletsDens: 900,
    islets: [],

    // keys: {
    //     LEFT: 37,
    //     RIGHT: 39,
    //     UP: 38,
    //     DOWN: 40,
    // },

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
            h: window.innerHeight - 110
        }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },

    createIsland() {
        this.islands.push(new Island(this.ctx, this.canvasSize))
        console.log(this.islands)
    },

    createIslet() {
        this.islets.push(new Islet(this.ctx, this.canvasSize))
        console.log(this.islets)
    },

    start() {

        this.reset()

        this.interval = setInterval(() => {
            // this.framesIndex > 5000 ? this.framesIndex = 0 : this.framesIndex++ //  Resets framesIndex

            this.clearAll()
            this.drawAll()
            this.framesIndex++

            if (this.framesIndex === 100 || this.framesIndex % this.islandsDens === 0)
                this.createIsland()

            this.islands.forEach(elm => elm.move())

            if (this.framesIndex % this.isletsDens === 0)
                this.createIslet()

            this.islets.forEach(elm => elm.move())

            this.clearIslands()
            this.clearIslets()


            this.isIslandCollision() ? this.gameOver() : null
            this.isIsletCollision() ? this.gameOver() : null

        }, 1000 / this.FPS)

    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize)
        this.whalerShip = new WhalerShip(this.ctx, this.canvasSize, this.keys)
        this.islands = []
        this.islets = []
    },

    drawAll() {
        this.background.draw()
        this.whalerShip.draw()
        this.islands.forEach(elm => elm.generateIsland())
        this.islets.forEach(elm => elm.generateIslet())
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    clearIslands() {
        this.islands = this.islands.filter(elm => elm.islandPos.x > -elm.islandSize.w)
    },

    clearIslets() {
        this.islets = this.islets.filter(elm => elm.isletPos.x > -elm.isletSize.w)
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











    gameOver() {
        clearInterval(this.interval)
    }

}