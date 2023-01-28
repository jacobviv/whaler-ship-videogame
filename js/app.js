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
    islands: [],

    keys: {
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40,
    },

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

    start() {

        this.reset()

        this.interval = setInterval(() => {
            this.framesIndex > 5000 ? this.framesIndex = 0 : this.framesIndex++ //  Resets framesIndex

            this.clearAll()
            this.drawAll()
            this.framesIndex++
        }, 1000 / this.FPS)

    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize)
        this.whalerShip = new WhalerShip(this.ctx, this.canvasSize, this.keys)
        // this.islands = []
    },

    drawAll() {
        this.background.draw()
        this.whalerShip.draw()
        // this.islands.forEach(elm => elm.draw())
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },







    gameOver() {
        clearInterval(this.interval)
    }

}