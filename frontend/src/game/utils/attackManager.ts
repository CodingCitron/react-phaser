import Player from "../characters/player"
import Beam from "../effects/beam"
import PlayingScene from "../scenes/playing"
import Catnip from "../effects/catnip"
import Claw from "../effects/claw"

export function addAttackEvent(
    scene: PlayingScene, 
    attackType: string, 
    damage: number,
    scale: number,
    repeatGap: number = 0    
) {
    const player = scene.player as Player
    const reslut = {} as any
    reslut[attackType] = null

    switch(attackType) {
        case 'beam':
        case 'claw':
            const timer = scene.time.addEvent({
                delay: repeatGap,
                callback: () => {
                    doAttackOneSet(
                        scene,
                        attackType,
                        damage,
                        scale
                    )

                },
                loop: true
            })

            scene.attackEvent[attackType] = {
                timer, damage, scale, repeatGap
            }
           break
        case 'catnip':
            const catnip = new Catnip(
                scene, [
                    (scene.player?.x as number) + 1, 
                    (scene.player?.y as number) + 1
                ], 
                    damage, 
                    scale
            )

            scene.attackEvent[attackType] = { object: catnip, damage: damage } 
            break
        default:
            break
    }

    // return reslut
}

function doAttackOneSet(scene: PlayingScene, attackType: string, damage: number, scale: number) {
    const player = scene.player as Player

    switch (attackType) {
        case 'beam':
            new Beam(scene, [player.x, player.y - 16], damage, scale)
            break
        case 'claw':
            const direction = player.nowDirection
            const dirX = direction[0]
            const dirY = direction[1]

            const xValue = player.x + (player.width * player.scale + 8) * dirX
            const yValue = player.y + (player.height * player.scale + 8) * dirY

            new Claw(
                scene,
                [xValue, yValue],
                direction,
                damage,
                scale
            )
            
            // scene.time.addEvent({
            //     delay: 500,
            //     callback: () => {
            //         new Claw(
            //             scene,
            //             [player.x - xValue, player.y],
            //             dirX,
            //             damage,
            //             scale
            //         )
            //     },
            //     loop: false,
            // })
            break

        default:
            break
    }
}

// scene에 있는 attackType의 공격을 제거해주는 함수입니다.
export function removeAttack(scene: PlayingScene, attackType: string) {
    // catnip의 경우 object를 제거합니다.
    if (attackType === "catnip") {
        scene.attackEvent[attackType].object.destroy()
        return
    }

    // 다른 공격(beam, claw)의 경우 설정했던 timer를 비활성화합니다.
    scene.time.removeEvent(scene.attackEvent[attackType].timer)
}

// scene에 있는 attackType 공격의 damage를 재설정해주는 함수입니다.
export function setAttackDamage(scene: PlayingScene, attackType: string, newDamage: number) {
    const scale = scene.attackEvent[attackType].scale
    const repeatGap = scene.attackEvent[attackType].repeatGap
    removeAttack(scene, attackType)
    addAttackEvent(scene, attackType, newDamage, scale, repeatGap)
}

// scene에 있는 attackType 공격의 scale을 재설정해주는 함수입니다.
export function setAttackScale(scene: PlayingScene, attackType: string, newScale: number) {
    const damage = scene.attackEvent[attackType].damage
    const repeatGap = scene.attackEvent[attackType].repeatGap
    removeAttack(scene, attackType)
    
    addAttackEvent(scene, attackType, damage, newScale, repeatGap)
}

// scene에 있는 attackType 공격의 repeatGap을 재설정해주는 함수입니다.
export function setAttackRepeatGap(scene: PlayingScene, attackType: string, newRepeatGap: number) {
    // catnip의 경우 repeatGap이 없으므로 예외처리해 줍니다.
    if (attackType === 'catnip') {
        console.error("Cannot set catnip's repeat gap")
        return
    }

    const damage = scene.attackEvent[attackType].damage
    const scale = scene.attackEvent[attackType].scale
    removeAttack(scene, attackType)
    addAttackEvent(scene, attackType, damage, scale, newRepeatGap)
}
