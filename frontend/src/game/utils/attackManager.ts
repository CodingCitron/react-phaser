import Player from "../characters/player";
import Beam from "../effects/beam";
import PlayingScene from "../scenes/playing";

export function addAttckEvent(
    scene: PlayingScene, 
    attackType: string, 
    attackDamage: number,
    attackScale: number,
    repeatGap: number    
) {
    
    const reslut = {} as any
    reslut[attackType] = null

    switch(attackType) {
        case 'beam':
            reslut[attackType] = scene.time.addEvent({
                delay: repeatGap,
                callback: () => {
                    shootBeam(
                        scene,
                        attackDamage,
                        attackScale
                    )

                },
                loop: true
            })
           break
        default:
            break
    }

    return reslut
}

function shootBeam(scene: PlayingScene, attackDamage: number, attackScale: number) {
    const player = scene.player as Player
    
    new Beam(
        scene, 
        [player.x as number, player.y as number - 16], 
        attackDamage, 
        attackScale
    )
}