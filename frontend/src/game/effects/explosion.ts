import Phaser, { Scene } from "phaser"

export default class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "explosion")

        this.scale = 2
        this.setDepth(50)
        this.play("explode")
        scene.add.existing(this)
    }
}