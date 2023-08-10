import Phaser from "phaser"
import PlayingScene from "../scenes/playing"
import Monster from "../characters/monster"

export default class Beam extends Phaser.Physics.Arcade.Sprite {
    public speed: number
    public duration: number
    public damage: number
    public scale: number

    constructor(
        scene: PlayingScene, 
        startingPosition: number[], 
        damage: number, 
        scale: number
    ) {
        super(scene, startingPosition[0], startingPosition[1], 'beam')
            
        this.speed = 100
        this.duration = 1500

        scene.add.existing(this)
        scene.physics.world.enableBody(this) // 충돌 업데이트 감지

        this.damage = damage
        this.scale = scale
        this.setDepth(30)
        this.setVelocity()
        this.setAngle()

        if(scene.weaponDynamic) scene.weaponDynamic.add(this)
        scene.sound.get('beam').play()

        scene.time.addEvent({
            delay: this.duration,
            callback: () => this.destroy(),
            loop: false
        })
    }

    setVelocity(): this {
        const scene = this.scene as PlayingScene
        
        if(!scene.closest) { // 가장 가까운 몹이 없을 때
            this.setVelocityY(-250)
            return this
        }

        const closest = scene.closest as Monster

        const _x = closest.x - this.x
        const _y = closest.y - this.y
        const _r = Math.sqrt((_x**2) + (_y**2)) / 2
        
        if(this.body && this.body.velocity) { 
            this.body.velocity.x = (_x / _r) * this.speed
            this.body.velocity.y = (_y / _r) * this.speed
        }

        return this
    }

    setAngle(): this {
        const scene = this.scene as PlayingScene
        const closest = scene.closest as Monster

        const angleToMonster = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            closest.x as number,
            closest.y as number
        )

        this.rotation = angleToMonster + Math.PI / 2  + Math.PI / 4
        
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setAngularVelocity(0)
        
        return this
    }

    setDamage(damage: number) {
        this.damage = damage
    }
}   