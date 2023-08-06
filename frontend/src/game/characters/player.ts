import Phaser from "phaser"
import Config from '../index'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    public moving: boolean
    public speed: number
    public canBeAttacked: boolean

    constructor(scene: Phaser.Scene) {
        // 화면의 가운데에 player를 추가해줍니다.
        // scene.add.existing : scene에 오브젝트를 추가
        // scene.physics.add.existing : scene의 물리엔진에 오브젝트를 추가
        super(scene, Config.width as number / 2, Config.height as number / 2, 'player')
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // scale 프로퍼티를 조절해 크기를 조절할 수 있습니다. (디폴트: 1)
        this.scale = 2

        // depth를 조절해 어떤 오브젝트가 앞에 오고 뒤에 올지 설정할 수 있습니다.
        // CSS의 z-index와 비슷한 개념입니다. (디폴트: 0)
        this.setDepth(100)

        // 해당 오브젝트가 물리적으로 얼만큼의 면적을 차지할 지 설정하는 함수입니다.
        // 디폴트로 이미지 사이즈로 설정되는데, 그러면 추후 몹을 추가했을 때 너무 잘 부딪히는 느낌이 드므로 원본 이미지보다 약간 작게 설정해주었습니다.
        this.setBodySize(16, 16)
        
        this.moving = false
        this.speed = 250
        this.createPlayerAnimations()

        // 플레이어가 공격받을 수 있는 상태인지
        this.canBeAttacked = true
    }

    private createPlayerAnimations() {
        this.anims.create({
            key: 'run-up',
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 7
            }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'run-down',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'run-left',
            frames: this.anims.generateFrameNumbers('player', {
                start: 8,
                end: 11
            }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: 'run-right',
            frames: this.anims.generateFrameNumbers('player', {
                start: 12,
                end: 15
            }),
            frameRate: 8,
            repeat: -1
        })
        
        this.anims.create({
            key: 'idle-up',
            frames: [{
                key: 'player',
                frame: 4
            }]
        })

        this.anims.create({
            key: 'idle-down',
            frames: [{
                key: 'player',
                frame: 0
            }]
        })

        this.anims.create({
            key: 'idle-left',
            frames: [{
                key: 'player',
                frame: 8
            }]
        })
        
        this.anims.create({
            key: 'idle-right',
            frames: [{
                key: 'player',
                frame: 12
            }]
        })
    }
    
    // 몹과 접촉했을 경우 실행되는 함수입니다.
    hitByMonster(damage: number) {
        // 쿨타임이었던 경우 공격받지 않습니다.
        if (!this.canBeAttacked) return

        // 플레이어가 다친 소리를 재생합니다.
        // this.scene.m_hurtSound.play()

        // 쿨타임을 갖습니다.
        this.setCooldown()
    }

    // 공격받은 후 1초 쿨타임을 갖게 하는 함수입니다.
    // 공격받을 수 있는지 여부와 투명도를 1초동안 조절합니다.
    setCooldown() {
        this.canBeAttacked = false
        this.alpha = 0.5
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.alpha = 1;
                this.canBeAttacked = true
            },
            callbackScope: this,
            loop: false,
        })
    }
}