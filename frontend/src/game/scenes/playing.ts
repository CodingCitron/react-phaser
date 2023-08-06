import Phaser, { GameObjects } from "phaser"

import { setBackground } from "../utils/backgroundManager"
import Player from "../characters/player"
import gameConfig from ".."
import { addMonsterEvent } from "../utils/monsterManager"
import Monster from "../characters/monster"

import { addAttckEvent } from '../utils/attackManager'
import { Weapon } from "../types"

export default class PlayingScene extends Phaser.Scene {
    private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys

    public player?: Player 
    public background?: Phaser.GameObjects.TileSprite
    public monsters?: Phaser.Physics.Arcade.Group
    public monsterEvents?: object[]
    public closest?: GameObjects.GameObject | null
    public weaponDynamic?: GameObjects.Group
    public weaponStatic?: GameObjects.Group
    public attackEvent?: object

    constructor() {
        super('playGame')
    }

    create() {
        // 사용할 sound들을 추가해놓는 부분입니다.
        // load는 전역적으로 어떤 scene에서든 asset을 사용할 수 있도록 load 해주는 것이고,
        // add는 해당 scene에서 사용할 수 있도록 scene의 멤버 변수로 추가할 때 사용하는 것입니다.

        // player를 m_player라는 멤버 변수로 추가합니다.
        this.player = new Player(this)
        this.cameras.main.startFollow(this.player)
        // PlayingScene의 background를 설정합니다.
        this.background = setBackground(this, 'background')

        // monsters
        this.cursorKeys = this.input.keyboard?.createCursorKeys()
        this.monsters = this.physics.add.group()
        this.monsters.add(new Monster(this, 0, 0, 'mob1', 'mob1_anim', 10, 0.9))
        this.monsterEvents = []

        addMonsterEvent(this, 1000, 'mob1', 'mob1_anim', 10, 0.9)

        // weapon
        this.weaponDynamic = this.add.group()
        this.weaponStatic = this.add.group()
        this.attackEvent = {}

        this.attackEvent = {
            ...addAttckEvent(this, 'beam', 10, 1, 1000)
        }

        // collisions 충돌
        // 플레이어와 몹의 충돌
        this.physics.add.overlap(
            this.player,
            this.monsters,
            () => this.player!.hitByMonster(10),
            undefined,
            this
        )

        // 몹이 플레이어 공격과 충돌
        this.physics.add.overlap(
            this.weaponDynamic,
            this.monsters,
            (weapon, monster) => {
                return (monster as Monster).hitByWeaponDynamic(
                    weapon as Weapon
                )
            },
            undefined,
            this
        )

        // 몹이 플레이어 공격과 충돌
        this.physics.add.overlap(
            this.weaponStatic,
            this.monsters,
            (weapon, monster) => {
                return (monster as Monster).hitByWeaponStatic(
                    weapon as Weapon
                )
            },
            undefined,
            this
        )
    }

    init() {
        this.scale.on("resize", this.resize, this)
        this.events.on('shutdown', () => {})
    }

    update() {
        this.movePlayerManager()
        // console.log(this.player?.x)
        const xValue = (this.player?.x as number) - (gameConfig.width as number) / 2
        const yValue = (this.player?.y as number) - (gameConfig.height as number) / 2

        // console.log(xValue, yValue)

        if(this.background) {
            this.background.setX(xValue - 17)
            this.background.setY(yValue - 17)
            this.background.tilePositionX = xValue
            this.background.tilePositionY = yValue
        }

        this.closest = this.physics.closest(
            this.player as Player,
            this.monsters?.getChildren()
        )
    }

    isMoveKeydown () {
        const { left, right, up, down } = this.cursorKeys as Phaser.Types.Input.Keyboard.CursorKeys

        return (left.isDown || right.isDown || up.isDown || down.isDown)
    }

    movePlayerManager() {
        // vector를 사용해 움직임을 관리할 것입니다.
        // vector = [x좌표 방향, y좌표 방향]입니다.
        // 왼쪽 키가 눌려있을 때는 vector[0] += -1, 오른쪽 키가 눌려있을 때는 vector[0] += 1을 해줍니다.
        // 위/아래 또한 같은 방법으로 벡터를 수정해줍니다.
        const vector = [0, 0]
        let moveValue = ''
        const { right, left, up, down } = this.cursorKeys as Phaser.Types.Input.Keyboard.CursorKeys
        const player = this.player as Player

        if(this.isMoveKeydown()) {
            if(left.isDown) {
                moveValue = 'run-left'
                vector[0] += -1
            } else if(right.isDown) {
                moveValue = 'run-right'
                vector[0] += 1
            } else if(up.isDown) {
                moveValue = 'run-up'
                vector[1] += -1
            } else if(down.isDown) {
                moveValue = 'run-down'
                vector[1] += 1
            } else {
                moveValue = 'idle'
            }

            player.moving = true
        } else {
            player.moving = false
        }

        if(moveValue && moveValue !== 'idle') {
            if(player.anims.currentAnim?.key !== moveValue) {
                player.play(moveValue)
            } 
        } else {
            const dir = player.anims.currentAnim?.key.split('-')[1]
            if(dir) player.play(`idle-${dir}`)
        } 

        player.setVelocityX(vector[0] * player.speed)
        player.setVelocityY(vector[1] * player.speed)
    }

    resize(gameSize: GameObjects.Components.Size) {
        this.cameras.resize(gameSize.width, gameSize.height)
    }
}