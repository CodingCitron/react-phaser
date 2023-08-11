import Monster from "../characters/monster";
import Player from "../characters/player";
import PlayingScene from "../scenes/playing";
import { getRandomPosition } from './math'

export function addMonsterEvent(
    scene: PlayingScene, 
    repeatGap: number,
    texture: string,
    anim: string,
    hitpoint: number,
    dropRate: number,
) {
    const player = scene.player as Player

    const timer = scene.time.addEvent({
        delay: repeatGap,
        callback: () => {
            let [x, y] = getRandomPosition(player.x, player.y)
            scene.monsters?.add(new Monster(
                scene,
                x,
                y,
                texture,
                anim,
                hitpoint,
                dropRate
            ))
        },
        loop: true
    })

    scene.monsterEvents?.push(timer)
}

export function removeOldestMonsterEvent(scene: PlayingScene) {
    if(scene.monsterEvents?.length) {
        (scene.monsterEvents[0] as Phaser.Time.TimerEvent).remove()
        scene.monsterEvents.shift()
    }
}

/**
 * scene의 (x, y) 위치에 mobTexture 이미지, mobAnim 애니메이션, mobHp의 HP를 가진
 * Mob object 하나를 추가합니다.
 * 위치 (x, y)는 getRandomPosition 함수를 통해 정해집니다.
 */
export function addMob(scene: PlayingScene, mobTexture: string, mobAnim: string, mobHp: number) {
    let [x, y] = getRandomPosition(scene.player!.x, scene.player!.y)
    scene.monsters!.add(new Monster(scene, x, y, mobTexture, mobAnim, mobHp, 0))
}