import { Scene } from "phaser";
import background from '../../assets/img/grass.png'
import player from '../../assets/img/spritesheets/characters/cat-set.png'
export class BootScene extends Scene {    
    constructor() {
        super('bootGame')
    }

    preload() {
        this.load.image('background', background)
        this.load.spritesheet('player', player, {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {
        this.scene.start('playGame')
    }
}