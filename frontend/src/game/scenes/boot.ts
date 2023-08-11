import { Scene } from "phaser"
import background from '../../assets/img/grass.png'
import background2 from '../../assets/img/background.png'
import background3 from '../../assets/img/background-2.png'
import background4 from '../../assets/img/background-3.png'
import player from '../../assets/img/spritesheets/characters/cat-set.png'

// monster
import monster1 from '../../assets/img/spritesheets/mob1.png'
import monster2 from '../../assets/img/spritesheets/mob2.png' 
import monster3 from '../../assets/img/spritesheets/mob3.png'
import monster4 from '../../assets/img/spritesheets/mob4.png'
import lionImg from '../../assets/img/spritesheets/lion.png'

// item
import expUpImg from '../../assets/img/spritesheets/expUp.png'

// effects
import beamImg from '../../assets/img/beam.png'
import beamOgg from '../../assets/sounds/beam.ogg'
import explosionImg from '../../assets/img/spritesheets/explosion.png'
import explosionOgg from '../../assets/sounds/explosion.ogg'
import expUpOgg from '../../assets/sounds/expUp.ogg'
import pauseInOgg from '../../assets/sounds/pauseIn.ogg'
import pauseOutOgg from '../../assets/sounds/pauseOut.ogg'
import clawWhiteImg from '../../assets/img/spritesheets/claw-white.png'
import clawYellowImg from '../../assets/img/spritesheets/claw-yellow.png'
import catnipImg from '../../assets/img/spritesheets/catnip.png'
import scratchOgg from '../../assets/sounds/scratch.ogg'
import hitMobOgg from '../../assets/sounds/hitMob.ogg'
import hurtOgg from '../../assets/sounds/hurt.ogg'
import gameOverOgg from '../../assets/sounds/gameover.ogg'
import gameClearOgg from '../../assets/sounds/gameClear.ogg'

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
        this.load.image("background2", background2)
        this.load.image("background3", background3)
        this.load.image("background4", background4)

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

        this.load.spritesheet("claw_white", clawWhiteImg, {
            frameWidth: 32,
            frameHeight: 32,
        })
        
        this.load.spritesheet("claw_yellow", clawYellowImg, {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.spritesheet("catnip", catnipImg, {
            frameWidth: 64,
            frameHeight: 64,
        })

        // MONSTER
        this.load.spritesheet('mob1', monster1, {
            frameWidth: 28,
            frameHeight: 28,
        })
        this.load.spritesheet('mob2', monster2, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('mob3', monster3, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('mob4', monster4, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet("lion", lionImg, {
            frameWidth: 48,
            frameHeight: 64,
        })

        // ITEMS
        this.load.spritesheet("exp-up", expUpImg, {
            frameWidth: 16,
            frameHeight: 16,
        })

        // AUDIOS
        this.load.audio("beam", beamOgg)
        this.load.audio("scratch", scratchOgg)
        this.load.audio("hitMonster", hitMobOgg)
        this.load.audio("explosion", explosionOgg)
        this.load.audio("expUp", expUpOgg)
        this.load.audio('pauseIn', pauseInOgg)
        this.load.audio('pauseOut', pauseOutOgg)
        this.load.audio("hurt", hurtOgg)
        this.load.audio("gameOver", gameOverOgg)
        this.load.audio("gameClear", gameClearOgg)

        // FONT
        this.load.bitmapFont("pixelFont", fontPng, fontXml)
    }

    create() {
        this.scene.start('startScene')

        // MONSTER ANIM
        this.anims.create({
            key: "mob1_anim",
            frames: this.anims.generateFrameNumbers("mob1"),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "mob2_anim",
            frames: this.anims.generateFrameNumbers("mob2"),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "mob3_anim",
            frames: this.anims.generateFrameNumbers("mob3"),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "mob4_anim",
            frames: this.anims.generateFrameNumbers("mob4"),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "lion_anim",
            frames: this.anims.generateFrameNumbers("lion"),
            frameRate: 12,
            repeat: -1,
        })

        this.anims.create({
            key: "lion_idle",
            frames: this.anims.generateFrameNumbers("lion", {
                start: 0,
                end: 0,
            }),
            frameRate: 1,
            repeat: 0,
        })

        // EFFECT
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        })
        
        this.anims.create({
            key: "scratch_white",
            frames: this.anims.generateFrameNumbers("claw_white"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        })

        this.anims.create({
            key: "scratch_yellow",
            frames: this.anims.generateFrameNumbers("claw_yellow"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        })

        this.anims.create({
            key: "catnip_anim",
            frames: this.anims.generateFrameNumbers("catnip"),
            frameRate: 20,
            repeat: -1,
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