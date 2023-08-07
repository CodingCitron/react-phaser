import Phaser, { Scene } from "phaser"
import Monster from "../characters/monster"

interface ITEM_PROPERTY_TYPE {
    [key: string]: {
        exp: number,
        color: string
    }
}

// 몹마다 아이템을 먹으면 상승하는 경험치와 아이템의 색상을 다르게 해줄 것인데,
// 이를 맵핑할 객체를 만들어줍니다.
const ITEM_PROPERTY: ITEM_PROPERTY_TYPE = {
    mob1: {
        exp: 10,
        color: 'red'
    },
    mob2: {
        exp: 20,
        color: 'blue'
    },
    mob3: {
        exp: 30,
        color: 'yellow'
    },
    mob4: {
        exp: 40,
        color: 'green'
    },
}

export default class ExpUp extends Phaser.Physics.Arcade.Sprite {
    public exp: number

    constructor(scene: Scene, monster: Monster) {
        const x = monster.x
        const y = monster.y

        // 몹을 scene과 물리엔진에 추가해주는 부분입니다.
        super(scene, x, y, "exp-up")
        scene.add.existing(this)
        scene.physics.world.enableBody(this)

        // 몹 종류에 따라 경험치 상승량, 아이템 이미지를 다르게 설정합니다.
        // mob.texture.key는 해당 몹 이미지를 LoadingScene에서 load했던 key와 동일합니다.
        this.exp = ITEM_PROPERTY[monster.texture.key].exp
        this.play(ITEM_PROPERTY[monster.texture.key].color)

        // 크기, depth, 물리 영역을 지정해줍니다.
        this.scale = 1.5
        this.setDepth(7)
        this.setBodySize(20, 20)
    }
}