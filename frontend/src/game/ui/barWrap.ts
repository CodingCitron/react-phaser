import Phaser, { Scene } from "phaser"
import Config from '../index'
import PlayingScene from "../scenes/playing"

export default class BarWrap extends Phaser.GameObjects.Graphics {
    public monsterKilled: number
    public monsterKilledLabel: Phaser.GameObjects.BitmapText
    public level: number
    public levelLabel: Phaser.GameObjects.BitmapText
    public rect: any

    constructor(scene: Scene) {
        super(scene)

        this.rect = this.fillStyle(0x28288c)
            .fillRect(0, 0, (Config.width as number - 17), 30)
            .setDepth(90)
            .setScrollFactor(0)

        this.monsterKilled = 0
        this.monsterKilledLabel = scene.add
            .bitmapText(
                5,
                3,
                "pixelFont",
                `MONSTERS KILLED ${this.monsterKilled.toString().padStart(6, "0")}`,
                40
            )
            .setScrollFactor(0)
            .setDepth(100)
                console.log(Config.width)
        this.level = 1
        this.levelLabel = scene.add
            .bitmapText(
                Config.width as number,
                3,
                "pixelFont",
                `LEVEL ${this.level.toString().padStart(3, "0")}`,
                40
            )
            .setScrollFactor(0)
            .setDepth(100)
            
        this.levelLabel.x = Config.width as number - (this.levelLabel.width + 34 + 5)
        scene.add.existing(this)
    } 

    gainMonstersKilled() {
        this.monsterKilled += 1
        this.monsterKilledLabel.text = `MONSTERS KILLED ${this.monsterKilled
            .toString()
            .padStart(6, "0")}`
    }

    gainLevel() {
        this.level += 1
        this.levelLabel.text = `LEVEL ${this.level
            .toString()
            .padStart(3, "0")}`

        const scene = this.scene as PlayingScene

        scene.expBar!.maxExp += 20
        scene.expBar!.reset()
    }
}