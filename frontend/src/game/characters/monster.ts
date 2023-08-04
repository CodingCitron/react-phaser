import PlayingScene from "../scenes/playing"
import Player from "./player"

export default class Monster extends Phaser.Physics.Arcade.Sprite {
    public speed: number
    public hitpoint: number 
    public dropRate?: number
    public events: object[]
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
    }

    update (time: number, delta: number) {
        if(!this.body) return

        const player = this.player as Player 
        if(this.x < player.x) this.flipX = true
        else this.flipX = false
    }
}