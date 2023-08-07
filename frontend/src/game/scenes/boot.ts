import { Scene } from "phaser"
import background from '../../assets/img/grass.png'
import player from '../../assets/img/spritesheets/characters/cat-set.png'

// monster
import monster1 from '../../assets/img/spritesheets/mob1.png'

// effects
import beamImg from '../../assets/img/beam.png'
import beamOgg from '../../assets/sounds/beam.ogg'
import explosionImg from '../../assets/img/spritesheets/explosion.png'
import explosionOgg from '../../assets/sounds/explosion.ogg'

//font
import fontPng from '../../assets/font/font.png'
import fontXml from '../../assets/font/font.xml' 

export class BootScene extends Scene {    
    constructor() {
        super('bootGame')
    }

    preload() {
        // BACKGROUND
        this.load.image('background', background)
        
        // CHARACTER
        this.load.spritesheet('player', player, {
            frameWidth: 16,
            frameHeight: 16
        })

        // EFFECT
        this.load.image("beam", beamImg)
        this.load.spritesheet("explosion", explosionImg, {
            frameWidth: 32,
            frameHeight: 32,
        })

        // MONSTER
        this.load.spritesheet('mob1', monster1, {
            frameWidth: 28,
            frameHeight: 28,
        })

        // AUDIOS
        this.load.audio("beam", beamOgg)
        this.load.audio("explosion", explosionOgg)

        // FONT
        this.load.bitmapFont("pixelFont", fontPng, fontXml)
    }

    create() {
        this.scene.start('playGame')

        this.anims.create({
            key: "mob1_anim",
            frames: this.anims.generateFrameNumbers("mob1"),
            frameRate: 12,
            repeat: -1,
        })

        // EFFECT
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        })
    }
}