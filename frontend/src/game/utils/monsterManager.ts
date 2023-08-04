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
        scene.monsterEvents.shift()
    }
}