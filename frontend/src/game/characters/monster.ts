import PlayingScene from "../scenes/playing"
import Player from "./player"
import { Weapon } from "../types"

export default class Monster extends Phaser.Physics.Arcade.Sprite {
    public speed: number
    public hitpoint: number 
    public dropRate?: number
    public events: object[]
    public canBeAttacked: boolean
    // public alpha: number
    private player?: Player

    constructor(
        scene: PlayingScene, 
        x: number, y:number, 
        texture: string, 
        animKey: string, 
        hitpoint: number, 
        dropRate?: number
    ) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.player = scene.player

        this.play(animKey)
        this.setDepth(50)
        this.setScale(2)

        this.speed = 50
        this.hitpoint = hitpoint
        this.dropRate = dropRate

        if(texture === 'mob1') {
            this.setBodySize(24, 14, false)
            this.setOffset(0, 14)
        }

        this.events = []
        this.events.push(
            this.scene.time.addEvent({
                delay: 100,
                callback: () => {
                    scene.physics.moveToObject(
                        this, 
                        scene.player as Player, 
                        this.speed
                    )
                },
                loop: true
            })
        )

        scene.events.on('update', (time: number, delta: number) => {
            this.update(time, delta)
        })

        // 공격을 받을 수 있는 상태인지
        this.canBeAttacked = true
        
        // 투명도
        this.alpha = 1
    }

    update (time: number, delta: number) {
        if(!this.body) return

        const player = this.player as Player 
        if(this.x < player.x) this.flipX = true
        else this.flipX = false
    }

    hitByWeaponDynamic(weapon: Weapon) {
        // 공격에 맞은 소리를 재생합니다.
        // this.scene.hitMonsterSound.play()

        // 몬스터 hp 감소
        this.hitpoint -= weapon.damage

        // 히트 표시
        this.displayHit()

        // 공격 제거
        weapon.destroy()
    }

    hitByWeaponStatic(weapon: Weapon) {
        // 맞을 수 있는 상태가 아님
        if(!this.canBeAttacked) return

        // 소리 재생
        // this.scene.hitMonsterSound.play()

        // 몬스터 hp 감소
        this.hitpoint -= weapon.damage
    
        // 히트 표시
        this.displayHit()

        // 쿨타임 설정
        this.setCooldown()
    }

    displayHit() {
        // 몹의 투명도를 0.5로 변경하고,
        // 1초 후 1로 변경합니다.
        this.alpha = 0.5
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.alpha = 1
            },
            loop: false,
        })
    }

    setCooldown() {
        // 공격받을 수 있는지 여부를 false로 변경하고,
        // 1초 후 true로 변경합니다.
        this.canBeAttacked = false
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.canBeAttacked = true
            },
            loop: false,
        })
    }
}