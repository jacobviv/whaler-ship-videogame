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
    },

    createPirate() {
        this.pirates.push(new Pirate(this.ctx, this.canvasSize, this.whalerShip.whalerShipPos, this.whalerShip.whalerShipSize))
    },

    start() {

        this.reset()

        this.interval = setInterval(() => {

            this.framesIndex > 5000 ? this.framesIndex = 0 : this.framesIndex++
            this.clearAll()
            this.moveAll()
            this.createAll()
            this.drawAll()

            this.isRockCollision()
            this.isIsletCollision()
            this.isIslandCollision()
            this.isFishCollision()
            this.isWhaleCollision()
            this.isWhaleCapture()
            this.isPirateCollision()
            this.isBulletCollision()

            this.scoreIncreaser()
            this.gameGlory()
            this.gameOver()
            this.dificultyUpper()

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
        this.pirates.forEach(elm => elm.draw(this.framesIndex))
        this.rocks.forEach(elm => elm.draw())
        this.islets.forEach(elm => elm.draw())
        this.islands.forEach(elm => elm.draw())
        this.whalerShip.draw(this.framesIndex)
    },

    moveAll() {
        this.islands.forEach(elm => elm.move())
        this.islets.forEach(elm => elm.move())
        this.rocks.forEach(elm => elm.move())
        this.fishes.forEach(elm => elm.move())
        this.whales.forEach(elm => elm.move())
        this.pirates.forEach(elm => elm.move())

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

        this.islands.forEach(elm => {
            if (this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.islandPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.islandPos.x + elm.islandSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.islandPos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.islandPos.y + elm.islandSize.h) {
                const islandCollided = this.islands.indexOf(elm)
                this.islands.splice(islandCollided, 1)
                this.lifesCounter -= 1
                document.querySelector('#lifes-counter').innerHTML = Math.floor(this.lifesCounter)
            }
        })
    },

    isIsletCollision() {

        this.islets.forEach(elm => {
            if (this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.isletPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.isletPos.x + elm.isletSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.isletPos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.isletPos.y + elm.isletSize.h) {
                const isletCollided = this.islets.indexOf(elm)
                this.islets.splice(isletCollided, 1)
                this.lifesCounter -= 1
                document.querySelector('#lifes-counter').innerHTML = Math.floor(this.lifesCounter)
            }
        })
    },

    isRockCollision() {

        this.rocks.forEach(elm => {
            if (this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.rockPos.x &&
                this.whalerShip.whalerShipPos.x <= elm.rockPos.x + elm.rockSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.rockPos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.rockPos.y + elm.rockSize.h) {
                const rockCollided = this.rocks.indexOf(elm)
                this.rocks.splice(rockCollided, 1)
                this.lifesCounter -= 1
                document.querySelector('#lifes-counter').innerHTML = Math.floor(this.lifesCounter)
            }
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
                this.fishes.splice(fishCaptured, 1)
                this.fishesCounter++
                document.querySelector('#fishes-counter').innerHTML = this.fishesCounter

                if (this.fishesCounter % 20 === 0) {
                    this.lifesCounter++
                }
                document.querySelector('#lifes-counter').innerHTML = this.lifesCounter
            }
        })
    },

    isWhaleCollision() {

        this.whales.forEach(elm => {
            if (this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.whalePos.x &&
                this.whalerShip.whalerShipPos.x <= elm.whalePos.x + elm.whaleSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.whalePos.y + elm.whaleSize.h / 3 &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.whalePos.y + elm.whaleSize.h) {
                const whaleCollided = this.whales.indexOf(elm)
                this.whales.splice(whaleCollided, 1)
                this.lifesCounter -= 1
                document.querySelector('#lifes-counter').innerHTML = Math.floor(this.lifesCounter)
            }
        })
    },

    isWhaleCapture() {
        this.whalerShip.harpoons.forEach(harpoon => {
            this.whales.forEach(whale => {
                if (harpoon.harpoonPos.x < whale.whalePos.x + whale.whaleSize.w &&
                    harpoon.harpoonPos.x + harpoon.harpoonSize.w > whale.whalePos.x &&
                    harpoon.harpoonPos.y < whale.whalePos.y + whale.whaleSize.h &&
                    harpoon.harpoonSize.h + harpoon.harpoonPos.y > whale.whalePos.y + whale.whaleSize.h / 3) {
                    const whaleCaptured = this.whales.indexOf(whale)
                    this.whales.splice(whaleCaptured, 1)
                    this.whalesCounter++
                    this.lifesCounter += .5
                    document.querySelector('#whales-counter').innerHTML = this.whalesCounter
                    document.querySelector('#lifes-counter').innerHTML = Math.floor(this.lifesCounter)
                }
            })
        })
    },

    isPirateCollision() {

        this.pirates.forEach(elm => {
            if (this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w >= elm.piratePos.x &&
                this.whalerShip.whalerShipPos.x <= elm.piratePos.x + elm.pirateSize.w &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h >= elm.piratePos.y &&
                this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 2 <= elm.piratePos.y + elm.pirateSize.h) {
                const pirateCollided = this.pirates.indexOf(elm)
                this.pirates.splice(pirateCollided, 1)
                this.lifesCounter -= 1
                document.querySelector('#lifes-counter').innerHTML = Math.floor(this.lifesCounter)
            }
        })
    },

    isBulletCollision() {
        this.pirates.forEach(pirate => {
            pirate.bullets.forEach((bullet, i) => {

                if (bullet.bulletsPos.x < this.whalerShip.whalerShipPos.x + this.whalerShip.whalerShipSize.w &&
                    bullet.bulletsPos.x + bullet.bulletsSize.w > this.whalerShip.whalerShipPos.x &&
                    bullet.bulletsPos.y < this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h &&
                    bullet.bulletsSize.h + bullet.bulletsPos.y > this.whalerShip.whalerShipPos.y + this.whalerShip.whalerShipSize.h / 3) {

                    this.pirates.forEach(elm => elm.bullets.splice(i, 1))

                    this.lifesCounter -= .5
                    document.querySelector('#lifes-counter').innerHTML = Math.floor(this.lifesCounter)
                }
            })
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
        document.querySelector('#credits2').innerHTML = 'More code by Jadde, Juan'
        document.querySelector('#credits3').innerHTML = 'Santi, Dan, Iván & Gon.'
        document.querySelector('#credits4').innerHTML = 'Code guidelines: Germán'
        document.querySelector('#credits5').innerHTML = 'Music: HUIDA by Brezo<a href="https://brezo1.bandcamp.com/album/huida"> +</a>'
    },

    dificultyUpper() {
        if (this.whalesCounter === 5) this.piratesDens = 275
        else if (this.whalesCounter === 10) {
            this.piratesDens = 250
            this.islandsDens = 1000
            this.isletsDens = 800
            this.rocksDens = 500
        }
        else if (this.whalesCounter === 15) this.piratesDens = 225
        else if (this.whalesCounter === 20) this.piratesDens = 200
    },

    gameGlory() {

        if (this.whalesCounter >= 21) {
            clearInterval(this.interval)
            document.querySelector('#intro').innerHTML = `- Awe!! Hail Mr. Helmsman, bring back home barreled whaleys and those filthy old bones of thy! `
            document.querySelector('#alert').innerHTML = 'THE RUM IS WAITING!'
            document.querySelector('#lifes-counter').innerHTML = ' '
            this.getCredits()
            document.querySelector("body").style.backgroundColor = "gold"

        }
    },

    gameOver() {
        if (this.lifesCounter <= 0) {
            document.querySelector('#alert').innerHTML = 'BELOW ZERO SPIRITS'
            document.querySelector('#intro').innerHTML = '<br>SAILOR THOU SUNKST THE SHIP! OWE ME YOUR LIFE!'
            document.querySelector('#lifes-counter').innerHTML = ' '
            this.getCredits()
            clearInterval(this.interval)
            document.querySelector("body").style.backgroundColor = "coral"
        }
    }
}