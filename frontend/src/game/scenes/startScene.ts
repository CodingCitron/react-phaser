import Phaser from "phaser"
import Config from "../index"
import Button from "../ui/button"
import Player from "../characters/player"

export default class StartScene extends Phaser.Scene {
    [key: string]: any

    constructor() {
        super('startScene')
    }

    create() {
        const width = Config.width as number
        const height = Config.height as number

        // 배경색을 채워줍니다.
        this.add.graphics()
            .fillStyle(0xbbdefb)
            .fillRect(0, 0, width, height)
            .setScrollFactor(0)

        // 게임 제목을 상단에 추가합니다.
        this.add
            .bitmapText(width / 2, 150, "pixelFont", "Save the Cat World!", 60)
            .setOrigin(0.5)

        // 움직이는 라이캣을 가운데 추가합니다.
        // this.add
        //     .sprite(width / 2, height / 2, "player")
        //     .setScale(4)
        //     .play("run-down")

            // console.log(this.scene)
        this.player = new Player(this, false)
        this.player.setScale(6)
        this.player.play('run-down')

        // 게임 시작 버튼을 하단에 추가합니다.
        // 버튼을 누르면 PlayingScene으로 이동하도록 callback을 전달해줍니다.
        new Button(
            width / 2,
            height / 2 + 150,
            'Start Game',
            this,
            () => this.scene.start('playGame')
        )
    }
}