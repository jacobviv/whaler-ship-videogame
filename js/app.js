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
    instructionsHeight: 125,

    FPS: 60,
    framesIndex: 0,
    interval: undefined,
    background: undefined,
    whalerShip: undefined,
    gloryInterval: undefined,

    islandsDens: 1200,
    islands: [],

    isletsDens: 900,
    islets: [],

    rocksDens: 600,
    rocks: [],

    fishesDens: 30,
    fishes: [],
    maxFishes: 40,
    fishesCounter: 0,

    whalesDens: 600,
    whales: [],
    maxWhales: 4,
    whalesCounter: 0,

    piratesDens: 300,
    pirates: [],

    lifesCounter: 1,

    score: 0,

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
        if (this.fishes.length >= this.maxFishes) this.fishes.shift()
    },

    createWhale() {
        this.whales.push(new Whale(this.ctx, this.canvasSize))
        if (this.whales.length >= this.maxWhales) this.whales.shift()
        console.log(this.whales)
    },

    createPirate() {
        this.pirates.push(new Pirate(this.ctx, this.canvasSize))
    },

    // createHarpoon() {
    //     this.harpoons.push(new Harpoon(this.ctx, this.canvasSize, this.whalerShip))
    // },

    start() {

        this.reset()

        this.interval = setInterval(() => {

            this.framesIndex > 5000 ? this.framesIndex = 0 : this.framesIndex++

            this.clearAll()
            this.moveAll()
            this.createAll()
            this.drawAll()
            this.checkCollision()
            this.isIslandCollision()
            this.isFishCollision()
            this.isWhaleCollision()
            this.isWhaleCapture()
            this.isPirateCollision()
            this.scoreIncreaser()
            this.gameGlory()

        }, 1000 / this.FPS)

    },

    reset() {
        this.background = new Background(this.ctx, this.canvasSize)
        this.whalerShip = new WhalerShip(this.ctx, this.canvasSize)
        this.islands = []
        this.islets = []
        this.rocks = []
        this.fishes = []
        this.whales = []
        this.harpoons = []
        this.pirates = []
    },

    drawAll() {
        this.background.draw()
        this.fishes.forEach(elm => elm.draw())
        this.whales.forEach(elm => elm.draw())
        this.pirates.forEach(elm => elm.draw())
        this.rocks.forEach(elm => elm.draw())
        this.islets.forEach(elm => elm.draw())
        this.islands.forEach(elm => elm.draw())
        // this.harpoons.forEach(elm => elm.draw())
        this.whalerShip.draw(this.framesIndex)
    },

    moveAll() {
        this.islands.forEach(elm => elm.move())
        this.islets.forEach(elm => elm.move())
        this.rocks.forEach(elm => elm.move())
        this.fishes.forEach(elm => elm.move())
        this.whales.forEach(elm => elm.move())
        this.pirates.forEach(elm => elm.move())
        // this.harpoons.forEach(elm => elm.move())

        if (this.whalerShip.canMove.north) this.whalerShip.moveNorth()
        if (this.whalerShip.canMove.south) this.whalerShip.moveSouth()
        if (this.whalerShip.canMove.east) this.whalerShip.moveEast()
        if (this.whalerShip.canMove.west) this.whalerShip.moveWest()
    },

    createAll() {
        this.framesIndex % this.islandsDens === 0 && this.createIsland()
        this.framesIndex % this.isletsDens === 0 && this.createIslet()
        this.framesIndex % this.isletsDens === 0 && this.createRock()
        this.framesIndex % this.fishesDens === 0 && this.createFish()
        this.framesIndex % this.whalesDens === 0 && this.createWhale()
        this.framesIndex % this.piratesDens === 0 && this.createPirate()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.clearIslands()
        this.clearIslets()
        this.clearRocks()
        this.clearFishes()
        this.clearWhales()
        this.clearPirates()
    },

    checkCollision() {
        if (this.lifesCounter > 0) {
            this.isIslandCollision() ? (this.reset(), this.lifesCounter--) : null
            this.isIsletCollision() ? (this.reset(), this.lifesCounter--) : null
            this.isRockCollision() ? (this.reset(), this.lifesCounter--) : null
            this.isWhaleCollision() ? (this.reset(), this.lifesCounter -= .5) : null
            this.isPirateCollision() ? (this.reset(), this.lifesCounter--) : null
        } else this.gameOver()
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

    clearWhales() {
        this.whales = this.whales.filter(elm => elm.whalePos.x > -elm.whaleSize.w)
    },

    clearPirates() {
        this.pirates = this.pirates.filter(elm => elm.piratePos.x > -elm.pirateSize.w)
    },

    isIslandCollision() {
        return this.islands.some(elm => {
            return (
                this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.islandPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.islandPos.x + elm.islandSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.islandPos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.islandPos.y + elm.islandSize.h
            )
        })
    },

    isIsletCollision() {
        return this.islets.some(elm => {
            return (
                this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.isletPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.isletPos.x + elm.isletSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.isletPos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.isletPos.y + elm.isletSize.h
            )
        })
    },

    isRockCollision() {
        return this.rocks.some(elm => {
            return (
                this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.rockPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.rockPos.x + elm.rockSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.rockPos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.rockPos.y + elm.rockSize.h
            )
        })
    },

    isFishCollision() {
        this.fishes.forEach(elm => {
            if (
                this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.fishPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.fishPos.x + elm.fishSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.fishPos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.fishPos.y
            ) {
                fishCaptured = this.fishes.indexOf(elm)
                // console.log({ fishCaptured })
                this.fishes.splice(fishCaptured, 1)
                this.fishesCounter++
                console.log('Fishes', this.fishesCounter)
                document.querySelector('#fishes-counter').innerHTML = this.fishesCounter

                if (this.fishesCounter % 45 === 0) {
                    this.lifesCounter++
                }
                document.querySelector('#lifes-counter').innerHTML = this.lifesCounter


            }
        })
    },

    isWhaleCollision() {
        return this.whales.some(elm => {
            return (
                this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.whalePos.x &&
                this.whalerShip.whalerShipPos.x <= elm.whalePos.x + elm.whaleSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.whalePos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.whalePos.y
            )
        })
    },

    isWhaleCapture() {
        this.whalerShip.harpoons.forEach(harpoon => {
            this.whales.forEach(whale => {
                if (harpoon.harpoonPos.x < whale.whalePos.x + whale.whaleSize.w &&
                    harpoon.harpoonPos.x + harpoon.harpoonSize.w > whale.whalePos.x &&
                    harpoon.harpoonPos.y < whale.whalePos.y + whale.whaleSize.h &&
                    harpoon.harpoonSize.h + harpoon.harpoonPos.y > whale.whalePos.y) {
                    console.log('captura')
                    const whaleCaptured = this.whales.indexOf(whale)
                    this.whales.splice(whaleCaptured, 1)
                    this.whalesCounter++
                    this.lifesCounter += .5
                    console.log('whales', this.whalesCounter)
                    document.querySelector('#whales-counter').innerHTML = this.whalesCounter
                    document.querySelector('#lifes-counter').innerHTML = Math.floor(this.lifesCounter)
                }
            })
        })
    },

    isPirateCollision() {
        return this.pirates.some(elm => {
            return (
                this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.piratePos.x &&
                this.whalerShip.whalerShipPos.x <= elm.piratePos.x + elm.pirateSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.piratePos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.piratePos.y + elm.pirateSize.h
            )
        })
    },

    scoreIncreaser() {
        if (this.lifesCounter === 1) {
            this.score = this.fishesCounter * 10 + this.whalesCounter * 1000
        } else {
            this.score = this.lifesCounter * 100 + this.fishesCounter * 10 + this.whalesCounter * 1000
        }
        document.querySelector('#score-counter').innerHTML = this.score
    },

    getCredits() {
        document.querySelector('#credits1').innerHTML = 'Code & Design: Rubén B'
        document.querySelector('#credits2').innerHTML = 'Additional code by:'
        document.querySelector('#credits3').innerHTML = 'Jadde, Juan, Santi, Dan'
        document.querySelector('#credits4').innerHTML = 'Code guidelines: Germán'
        document.querySelector('#credits5').innerHTML = 'Music: HUIDA by Brezo<li>CC BY-NC-ND 2023</li>'
    },

    gameGlory() {

        if (this.fishesCounter >= 1) {
            clearInterval(this.interval)
            document.querySelector('#intro').innerHTML = `- Awe!! Hail Mr. Helmsman, bring back home barreled whaleys and those filthy old bones of thy! `
            document.querySelector('#alert').innerHTML = 'THE RUM IS WAITING!'
            document.querySelector('#lifes-counter').innerHTML = ' '
            this.getCredits()
            document.querySelector("body").style.backgroundColor = "yellow"

        }
    },

    gameOver() {

        document.querySelector('#alert').innerHTML = ' '
        document.querySelector('#intro').innerHTML = '<br>SAILOR THOU SUNKST THE SHIP! OWE ME YOUR LIFE!'
        document.querySelector('#lifes-counter').innerHTML = 'BELOW ZERO SPIRITS'
        this.getCredits()
        clearInterval(this.interval)

    }
}