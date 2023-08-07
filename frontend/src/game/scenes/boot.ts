import { Scene } from "phaser"
import background from '../../assets/img/grass.png'
import player from '../../assets/img/spritesheets/characters/cat-set.png'

// monster
import monster1 from '../../assets/img/spritesheets/mob1.png'

// item
import expUpImg from '../../assets/img/spritesheets/expUp.png'

// effects
import beamImg from '../../assets/img/beam.png'
import beamOgg from '../../assets/sounds/beam.ogg'
import explosionImg from '../../assets/img/spritesheets/explosion.png'
import explosionOgg from '../../assets/sounds/explosion.ogg'
import expUpOgg from '../../assets/sounds/expUp.ogg'

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

        // ITEMS
        this.load.spritesheet("exp-up", expUpImg, {
            frameWidth: 16,
            frameHeight: 16,
        })

        // AUDIOS
        this.load.audio("beam", beamOgg)
        this.load.audio("explosion", explosionOgg)
        this.load.audio("expUp", expUpOgg)

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

        // EXP UP ITEMS
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 0,
                end: 0,
            }),
            frameRate: 20,
            repeat: 0,
        })

        this.anims.create({
            key: "blue",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 1,
                end: 1,
            }),
            frameRate: 20,
            repeat: 0,
        })

        this.anims.create({
            key: "yellow",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 2,
                end: 2,
            }),
            frameRate: 20,
            repeat: 0,
        })

        this.anims.create({
            key: "green",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 3,
                end: 3,
            }),
            frameRate: 20,
            repeat: 0,
        })
    }
}