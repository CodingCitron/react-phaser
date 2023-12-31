import Phaser, { Scene } from "phaser"
import Config from ".."
import Button from "../ui/button"
import { getTimeString } from "../utils/timer"

export default class GameOverScene extends Scene {
    [key: string]: any

    constructor() {
        super('gameOver')
    }

    init(data: any) {
        console.log(data)
        this.monstersKilled = data.monstersKilled
        this.level = data.level
        this.secondElapsed = data.secondElapsed  
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
            height / 2 - 180,
            'pixelFont',
            'Game Over',
            80
        ).setOrigin()

         // 플레이 시간을 표시해줍니다.
         this.add
         .bitmapText(
             width / 2,
             height / 2 - 30,
             "pixelFont",
             `You survived for ${getTimeString(this.secondElapsed)} !`,
             40
         )
         .setOrigin(0.5)

        // 잡은 몹 수와 레벨을 표시해줍니다.
        this.add
            .bitmapText(
                width / 2,
                height / 2 + 30,
                "pixelFont",
                `Mobs Killed : ${this.monstersKilled}, Level : ${this.level}`,
                40
            )
            .setOrigin(0.5)

        // 메인 화면으로 이동하는 버튼을 추가해줍니다.
        new Button(
            width / 2,
            height / 2 + 180,
            "Go to Main",
            this,
            () => this.scene.start("startScene")
        )
    }
}
