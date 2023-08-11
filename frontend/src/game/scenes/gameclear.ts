import Phaser from "phaser"
import Config from "../index"
import Button from "../ui/button"
import { getTimeString } from "../utils/timer"

export default class GameClearScene extends Phaser.Scene {
    [key: string]: any

    constructor() {
        // scene의 identifier를 설정하는 부분입니다.
        super('gameClearScene')
    }

    init(data: any) {
        this.monstersKilled = data.monstersKilled
        this.level = data.level
        this.secondElapsed = data.secondElapsed
    }

    create() {
        const width = Config.width as number
        const height = Config.height as number
        
        // 배경을 추가해주는 부분입니다.
        const bg = this.add.graphics()
        bg.fillStyle(0x5abeff)
        bg.fillRect(0, 0, width, height)
        bg.setScrollFactor(0)

        // 상단 문구를 추가하는 부분입니다.
        this.add
            .bitmapText(
                width / 2,
                height / 2 - 180,
                "pixelFont",
                "Game Clear !!",
                80
            )
            .setOrigin(0.5)

        this.add
            .bitmapText(
                width / 2,
                height / 2 - 30,
                "pixelFont",
                `You survived for ${getTimeString(this.secondElapsed)} !`,
                40
            )
            .setOrigin(0.5)

        this.add
            .bitmapText(
                width / 2,
                height / 2 + 30,
                "pixelFont",
                `Mobs Killed : ${this.monstersKilled}, Level : ${this.level}`,
                40
            )
            .setOrigin(0.5)

        new Button(
            width / 2,
            height / 2 + 180,
            "Go to Main",
            this,
            () => this.scene.start("startScene")
        )
    }
}