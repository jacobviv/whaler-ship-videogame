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
            h: window.innerHeight
        }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },

    createIsland() {
        this.islands.push(new Island(this.ctx, this.canvasSize))
        console.log(this.islands)
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

            this.clearIslands()

        }, 1000 / this.FPS)

    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize)
        this.whalerShip = new WhalerShip(this.ctx, this.canvasSize, this.keys)
        this.islands = []
    },

    drawAll() {
        this.background.draw()
        this.whalerShip.draw()
        this.islands.forEach(elm => elm.generateIsland())
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    clearIslands() {
        this.islands = this.islands.filter(elm => elm.islandPos.x > -elm.islandSize.w)
    },







    gameOver() {
        clearInterval(this.interval)
    }

}