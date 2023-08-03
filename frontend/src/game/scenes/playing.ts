import Phaser, { GameObjects } from "phaser"

import { setBackground } from "../utils/backgroundManager"
import Player from "../characters/player"

export default class PlayingScene extends Phaser.Scene {
    private player?: Player 
    private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super('playGame')
    }

    create() {
        // 사용할 sound들을 추가해놓는 부분입니다.
        // load는 전역적으로 어떤 scene에서든 asset을 사용할 수 있도록 load 해주는 것이고,
        // add는 해당 scene에서 사용할 수 있도록 scene의 멤버 변수로 추가할 때 사용하는 것입니다.

        // player를 m_player라는 멤버 변수로 추가합니다.
        this.player = new Player(this)

        // PlayingScene의 background를 설정합니다.
        setBackground(this, 'background')

        this.cursorKeys = this.input.keyboard?.createCursorKeys()
    }

    init() {
        this.scale.on("resize", this.resize, this)
        this.events.on('shutdown', () => {})
    }

    update() {
        // console.log('update')
        this.movePlayerManager()
    }

    isMoveKeydown () {
        const { left, right, up, down } = this.cursorKeys as Phaser.Types.Input.Keyboard.CursorKeys

        return (left.isDown || right.isDown || up.isDown || down.isDown)
    }

    // Phaser.Input.Keyboard.Key
    movePlayerManager() {
        // vector를 사용해 움직임을 관리할 것입니다.
        // vector = [x좌표 방향, y좌표 방향]입니다.
        // 왼쪽 키가 눌려있을 때는 vector[0] += -1, 오른쪽 키가 눌려있을 때는 vector[0] += 1을 해줍니다.
        // 위/아래 또한 같은 방법으로 벡터를 수정해줍니다.
        const vector = [0, 0]
        const { right, left, up, down } = this.cursorKeys as Phaser.Types.Input.Keyboard.CursorKeys
        const player = this.player as Player

        if(left.isDown) vector[0] += -1
        if(right.isDown) vector[0] += 1    
        if(up.isDown) vector[1] += -1
        if(down.isDown) vector[1] += 1
        
        const [x, y] = vector

        if(this.isMoveKeydown()) {
            if(!player.moving) {
                if(x) {
                    
                } else {

                }
            }

            player.moving = true
        } else {
            if(player.moving) {

            }

            player.moving = false
        }

        player.setVelocityX(vector[0] * player.speed)
        player.setVelocityY(vector[1] * player.speed)    
    }

    resize(gameSize: GameObjects.Components.Size) {
        this.cameras.resize(gameSize.width, gameSize.height)
    }
}