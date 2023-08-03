import { Scene, GameObjects } from "phaser";
import background from '../../assets/img/grass.png'
import player from '../../assets/img/characters/cat-set.png'
import player2 from '../../assets/img/characters/Basic Charakter Spritesheet.png'
import gameConfig from "..";

interface Player extends GameObjects.Sprite {
    moving?: boolean 
}

export class BootScene extends Scene {
    private player?: Player
    private keyboardInput?: Phaser.Types.Input.Keyboard.CursorKeys

    static PLAYER_SPEED = 2

    preload() {
        this.load.image('background', background)
        // this.load.image('player', player)

        this.load.spritesheet('player', player, {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    init() {
        this.scale.on("resize", this.resize, this)
    }

    update(time: number, delta: number): void {
        this.move(this.player as GameObjects.Sprite)
    }

    create() {
        const isMove = false

        // const logo = this.add.image(400, 150, 'logo')
        
        // this.tweens.add({
        //     targets: logo,
        //     y: 450,
        //     duration: 2000,
        //     ease: "Power2",
        //     yoyo: true,
        //     loop: -1
        // })

        const background = this.add.image(0, 0, 'background')
        // const player = this.add.image(
        //     gameConfig.width as number / 2, 
        //     gameConfig.height as number / 2, 'player')

        background.setOrigin(0, 0)
        // player.setOrigin(0, 0)
        // player.scale = 2

        this.player = this.add.sprite(
            gameConfig.width as number / 2, 
            gameConfig.height as number / 2, 'player')
        this.player.moving = false

        this.anims.create({
            key: 'player_anim',
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 7
            }),
            frameRate: 12,
            repeat: -1
        })

        // this.anims.create({
        //     key: 'player_idle',
        //     frames: this.anims.generateFrameNumbers('player', {
        //         start: 0,
        //         end: 0
        //     }),
        //     frameRate: 1,
        //     repeat: 0
        // })

        this.keyboardInput = this.input.keyboard?.createCursorKeys()
        // this.player.play('player_anim')
    }

    resize(gameSize: GameObjects.Components.Size) {
        this.cameras.resize(gameSize.width, gameSize.height)
    }

    move(player: Player) {
        const speed = BootScene.PLAYER_SPEED

        if(this.keyboardInput?.left.isDown || this.keyboardInput?.right.isDown || 
            this.keyboardInput?.up.isDown || this.keyboardInput?.down.isDown) {
                console.log('')

            if(!player.moving) {
                const sprite = player.play('player_anim')
                // console.log(sprite.anims.generateFrameNumbers)
            }

            player.moving = true
        } else {
            if(player.moving) {
                const sprite = player.play('player_anim')
                sprite.anims.pause()
                // sprite.anims.showOnStart = true
                // sprite.anims.currentAnim?.getFrameByProgress(1)
                // player.play('player_idle')
            }

            player.moving = false
        }

        if(this.keyboardInput?.left.isDown) {
            player.x -= speed
            player.flipX = false
        } else if(this.keyboardInput?.right.isDown) {
            player.x += speed
            player.flipX = true
        } 

        if(this.keyboardInput?.up.isDown) {
            player.y -= speed
            player.flipY = false
        } else if(this.keyboardInput?.down.isDown) {
            player.y += speed
            player.flipY = true
        }

    }
}