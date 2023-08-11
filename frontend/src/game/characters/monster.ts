import PlayingScene from "../scenes/playing"
import Player from "./player"
import { Weapon } from "../types"
import Explosion from "../effects/explosion"
import ExpUp from "../items/expUp"
import { removeAttack } from "../utils/attackManager"
import { winGame } from "../utils/sceneManager"

export default class Monster extends Phaser.Physics.Arcade.Sprite {
    public speed: number
    public hitpoint: number 
    public dropRate?: number
    public events: Phaser.Time.TimerEvent | Phaser.Time.TimerEvent[]
    public canBeAttacked: boolean
    public isBossDead: Boolean = false

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

        if(texture === 'mob2') {
            this.speed = 75
            this.setBodySize(24, 32, false)
        }

        if(texture === 'mob3') {
            this.speed = 100
            this.setBodySize(24, 32, false)
        }

        if(texture === 'mob4') {
            this.speed = 125
            this.setBodySize(24, 32, false)
        }

        if(texture === 'lion') {
            this.speed = 200
            this.setBodySize(40, 64)
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

        if (this.hitpoint <= 0 && !this.isBossDead) {
            this.destroyMonster()
        }
    }

    hitByWeaponDynamic(weapon: Weapon) {
        // 공격에 맞은 소리를 재생합니다.
        this.scene.sound.get('hitMonster').play()

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
        this.scene.sound.get('hitMonster').play()

        // 몬스터 hp 감소
        this.hitpoint -= weapon.damage
    
        // 히트 표시
        this.displayHit()

        // 쿨타임 설정
        this.setCooldown()
    }

    displayHit() {
        // 보스몹이면 투명도를 조절하지 않습니다.
        if (this.texture.key === "lion") return

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
            delay: 500,
            callback: () => {
                this.canBeAttacked = true
            },
            loop: false,
        })
    }

    destroyMonster() {
        // 한번이라도 죽으면 die 메서드에 다시 들어오지 못하도록 m_isDead를 true로 바꿔줍니다.
        this.isBossDead = true

        new Explosion(this.scene, this.x, this.y)
        this.scene.sound.get('explosion').play()

        // random 0 ~ 1 값이 나옴 dropRate는 0.9인데 
        // 0.9 아래의 값이 나오면 아이템을 떨군다.
        if(Math.random() < (this.dropRate as number)) {
            const expUp = new ExpUp(this.scene, this);
            (this.scene as PlayingScene).expUps!.add(expUp)
        }

        (this.scene as PlayingScene).barWrap?.gainMonstersKilled()
        this.scene.time.removeEvent(this.events)

        // 보스몹이 죽었을 때
        if (this.texture.key === "lion") {
            // 공격을 제거합니다. (attackManager.js 참고)
            removeAttack(this.scene as PlayingScene, "catnip")
            removeAttack(this.scene as PlayingScene, "beam")
            removeAttack(this.scene as PlayingScene, "claw")
            // 플레이어가 보스몹과 접촉해도 HP가 깎이지 않도록 만듭니다.
            this.disableBody(true, false)
            // 보스몹이 움직이던 애니메이션을 멉춥니다.
            this.play("lion_idle");
            // 모든 몹의 움직임을 멈춥니다.
            (this.scene as PlayingScene).monsters!.children.each((monster) => {
                (monster as Monster).speed = 0
                return true  
            })

            // 보스몹이 서서히 투멍해지도록 합니다.
            this.scene.time.addEvent({
                delay: 30,
                callback: () => {
                    this.alpha -= 0.01;
                },
                repeat: 100,
            });
            // 보스몹이 투명해진 후, GameClearScene으로 화면을 전환합니다.
            this.scene.time.addEvent({
                delay: 4000,
                callback: () => {
                    winGame(this.scene as PlayingScene)
                },
                loop: false,
            })
        } else { // 보스몹이 아닌 몹이 죽었을 때 몹이 사라집니다.
            this.destroy()
        }
    }
}