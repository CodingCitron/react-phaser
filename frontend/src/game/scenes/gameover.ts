import Phaser, { Scene } from "phaser"
import Config from ".."

export default class GameOverScene extends Scene {
    constructor() {
        super('gameOver')
    }

    create() {
        const width = Config.width as number
        const height = Config.height as number

        const bg = this.add.graphics()
        bg.fillStyle(0x5c6bc0)
        bg.fillRect(0, 0, width, height)
        bg.setScrollFactor(0)

        this.add.bitmapText(
            width / 2,
            height / 2,
            'pixelFont',
            'Game Over',
            80
        ).setOrigin()
    }
}
