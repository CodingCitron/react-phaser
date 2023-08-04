import { Scene } from "phaser";
import background from '../../assets/img/grass.png'
import player from '../../assets/img/spritesheets/characters/cat-set.png'

// monster
import monster1 from '../../assets/img/spritesheets/mob1.png'

// effects
import beamImg from '../../assets/img/beam.png'
import beamOgg from '../../assets/sounds/beam.ogg'
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

        this.load.image("beam", beamImg)

        this.load.spritesheet('mob1', monster1, {
            frameWidth: 28,
            frameHeight: 28,
        })

        // AUDIOS
        this.load.audio("audio_beam", beamOgg)
    }

    create() {
        this.scene.start('playGame')

        this.anims.create({
            key: "mob1_anim",
            frames: this.anims.generateFrameNumbers("mob1"),
            frameRate: 12,
            repeat: -1,
        })
    }
}