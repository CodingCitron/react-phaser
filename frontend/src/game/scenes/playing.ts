import Phaser, { GameObjects } from "phaser"

// ui
import ExpBar from "../ui/expBar"
import BarWrap from "../ui/barWrap"

import { setBackground } from "../utils/backgroundManager"
import Player from "../characters/player"
import gameConfig from ".."
import { addMob, addMonsterEvent, removeOldestMonsterEvent } from "../utils/monsterManager"
import Monster from "../characters/monster"

import { addAttackEvent, removeAttack, setAttackDamage, setAttackRepeatGap, setAttackScale } from '../utils/attackManager'
import { StaticWeapon, Weapon } from "../types"
import ExpUp from "../items/expUp"
import { pause } from "../utils/pauseManager"
import { createTime } from "../utils/timer"

export default class PlayingScene extends Phaser.Scene {
    private cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys

    public player?: Player 
    public background?: Phaser.GameObjects.TileSprite
    public monsters?: Phaser.Physics.Arcade.Group
    public monsterEvents?: object[]
    public closest?: GameObjects.GameObject | null
    public weaponDynamic?: GameObjects.Group
    public weaponStatic?: GameObjects.Group
    public attackEvent: any
    public expUps?: GameObjects.Group
    public barWrap?: BarWrap
    public expBar?: ExpBar
    [key: string]: any

    constructor() {
        super('playGame')
    }

    create() {
        // 사용할 sound들을 추가해놓는 부분입니다.
        // load는 전역적으로 어떤 scene에서든 asset을 사용할 수 있도록 load 해주는 것이고,
        // add는 해당 scene에서 사용할 수 있도록 scene의 멤버 변수로 추가할 때 사용하는 것입니다.
        this.sound.add("beam")
        this.sound.add("explosion")
        this.sound.add("expUp")
        this.sound.add('pauseIn')
        this.sound.add('pauseOut')
        this.sound.add("scratch")
        this.sound.add("hitMonster")
        this.sound.add('hurt')
        this.sound.add("gameOver")
        this.sound.add("gameClear")

        // player를 m_player라는 멤버 변수로 추가합니다.
        this.player = new Player(this)
        this.cameras.main.startFollow(this.player)
        // PlayingScene의 background를 설정합니다.
        setBackground(this, 'background')

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
        addAttackEvent(this, 'claw', 10, 2, 750)

        // 보스몹이 잘 추가되는지 확인하기 위해 create 메서드 내에서 addMob을 실행시켜봅니다.
        // addMob(this, "lion", "lion_anim", 10)

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

        // item
        this.expUps = this.physics.add.group()
        this.physics.add.overlap(
            this.player,
            this.expUps,
            (player, exp) => this.pickExpUp(player as Player, exp as ExpUp),
            undefined,
            this
        )

        // ui
        this.barWrap = new BarWrap(this)
        this.expBar = new ExpBar(this, 50)

        this.input.keyboard?.on(
            'keydown-ESC',
            () => {
                pause(this, 'pause')
            },
            this
        )

        // timer
        createTime(this)
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
        let moveValue = ''
        const { right, left, up, down } = this.cursorKeys as Phaser.Types.Input.Keyboard.CursorKeys
        const player = this.player as Player
        player.direction = [0, 0]

        if(this.isMoveKeydown()) {
            if(left.isDown) {
                moveValue = 'run-left'
                player.direction[0] += -1
            } else if(right.isDown) {
                moveValue = 'run-right'
                player.direction[0] += 1
            } else if(up.isDown) {
                moveValue = 'run-up'
                player.direction[1] += -1
            } else if(down.isDown) {
                moveValue = 'run-down'
                player.direction[1] += 1
            } else {
                moveValue = 'idle'
            }

            player.nowDirection = [...player.direction]
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

        const x = player.direction[0] * player.speed
        const y = player.direction[1] * player.speed

        player.setVelocityX(x)
        player.setVelocityY(y)

        this.weaponStatic?.children.each((weapon) => {
            (weapon as StaticWeapon).move(x, y)
            return true
        }, this)
    }

    pickExpUp(_: Player, expUp: ExpUp) {
        expUp.disableBody(true, true)
        expUp.destroy()

        const expBar = this.expBar as ExpBar

        this.sound.get('expUp').play()
        expBar.increase(expUp.exp)

        if (expBar.currentExp >= expBar.maxExp) {
            pause(this, 'levelup')
            // (this.barWrap as BarWrap).gainLevel()
        }    
    }

    resize(gameSize: GameObjects.Components.Size) {
        this.cameras.resize(gameSize.width, gameSize.height)
    }

    afterLevelUp() {
        (this.barWrap as BarWrap).gainLevel()    

        switch(this.barWrap?.level) {
            case 2:
                removeOldestMonsterEvent(this)
                addMonsterEvent(this, 1000, 'mob2', 'mob2_anim', 20, 0.8)
                // claw 공격 크기 확대
                setAttackScale(this, 'claw', 4)
                break
            case 3:
                // removeOldestMonsterEvent(this)
                addMonsterEvent(this, 1000, 'mob3', 'mob3_anim', 40, 0.7)
        
                removeAttack(this, 'claw')

                addAttackEvent(this, 'beam', 5, 1, 500)
                // catnip 공격 추가
                addAttackEvent(this, 'catnip', 3, 10)

                // 백그라운드 변경
                setBackground(this, 'background2')
                break
            case 4:
                // removeOldestMonsterEvent(this)
                addMonsterEvent(this, 1000, 'mob4', 'mob4_anim', 80, 0.6)
                // catnip 공격 크기 확대
                setAttackScale(this, 'catnip', 15)
                break
            case 5:
                // claw 공격 삭제
                // beam 공격 추가
                removeAttack(this, 'beam')
                addAttackEvent(this, 'beam', 5, 5, 250)
                setBackground(this, 'background3')
                break
            case 6:
                // setAttackScale(this, 'beam', 2)
                setAttackDamage(this, 'beam', 20)
                break

            case 7:
                setAttackDamage(this, 'beam', 30)
                setAttackRepeatGap(this, 'beam', 200)
                // setAttackScale(this, 'claw', 6)
                // setAttackScale(this, 'beam', 4)
                // setAttackDamage(this, 'claw', 40)

                setBackground(this, 'background4')

                // 보스몹
                addMob(this, 'lion', 'lion_anim', 2500)
                break
            default:
                break
        }
    }
}