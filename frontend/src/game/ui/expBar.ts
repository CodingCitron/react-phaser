import Phaser, { Scene } from "phaser"
import Config from '../index'
import { clamp } from "../utils/math"

export default class ExpBar extends Phaser.GameObjects.Graphics {
    public height: number
    public border: number
    public rectX: number
    public rectY: number
    public maxExp: number
    public currentExp: number

    constructor(scene: Scene, maxExp: number) {
        super(scene)

        this.height = 30
        this.border = 4

        this.rectX = 0
        this.rectY = 30

        this.maxExp = maxExp
        this.currentExp = 0

        this.draw()
        this.setDepth(100)
        this.setScrollFactor(0)

        scene.add.existing(this)
    }

    increase(amount: number) {
        this.currentExp = clamp(this.currentExp + amount, 0, this.maxExp)
        this.draw()
    }

    reset() {
        this.currentExp = 0
        this.draw()
    }

    draw() {
        this.clear()

        this.fillStyle(0x000000)
        this.fillRect(this.rectX, this.rectY, (Config.width as number) - 17, this.height)

        this.fillStyle(0xffffff)
        this.fillRect(
            this.rectX + this.border,
            this.rectY + this.border,
            ((Config.width as number) - 34) - 2 * this.border,
            this.height - 2 * this.border
        )

        this.fillStyle(0x3665d5)
        let d = Math.floor(
            ((Config.width as number - 2 * this.border) / this.maxExp) * this.currentExp
        )
        this.fillRect(
            this.rectX + this.border,
            this.rectY + this.border,
            d,
            this.height - 2 * this.border
        )
    }
}