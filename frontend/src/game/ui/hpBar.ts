import Phaser from "phaser"
import { clamp } from "../utils/math"
import Player from "../characters/player"

export default class HpBar extends Phaser.GameObjects.Graphics {
    public width: number
    public height: number
    public border: number
    public maxHP: number
    public currentHP: number

    // HP bar를 추가할 scene, 위치를 위한 player, 최대 HP 값인 maxHp를 파라미터로 전달받습니다.
    constructor(scene: Phaser.Scene, player: Player, maxHP: number) {
        super(scene)

        // HP Bar의 width, height, border를 설정해줍니다.
        this.width = 60
        this.height = 12
        this.border = 2

        // (m_x, m_y)로 HP bar의 맨 왼쪽 위 지점을 지정합니다.
        this.x = player.x - this.width / 2 
        this.y = (player.y + player.height) + 2

        // 최대 HP, 현재 HP 값을 저장할 멤버 변수를 만들어줍니다.
        // 처음에는 HP가 최대입니다.
        this.maxHP = maxHP
        this.currentHP = maxHP
        // HP bar를 화면에 그려줍니다.
        this.draw()
        // setScrollFactor는 화면이 이동해도 오브젝트의 위치가 고정되어 보이게 하는 함수입니다.
        this.setScrollFactor(0)
        // depth를 적절히 설정해줍니다.
        this.setDepth(20)

        scene.add.existing(this)
    }

    // HP를 증가시키고 HP bar를 다시 그리는 메소드입니다.
    increase(amount: number) {
        this.currentHP = clamp(this.currentHP + amount, 0, this.maxHP)
        this.draw()
    }

    // HP를 감소시키고 HP bar를 다시 그리는 메소드입니다.
    decrease(amount: number) {
        this.currentHP = clamp(this.currentHP - amount, 0, this.maxHP)
        this.draw()
    }

    // HP bar를 실제로 화면에 그려주는 메소드입니다.
    draw() {
        // 이전에 그렸던 HP bar는 지워줍니다.
        this.clear()

        // HP bar의 border를 검은색으로 그려줍니다.
        this.fillStyle(0x000000)
        this.fillRect(0, 0, this.width, this.height)

        // HP bar의 흰 HP 배경을 그려줍니다.
        // 위에서 그린 검은색 사각형에서 상하좌우로 border만큼 안쪽으로 줄어든 흰색 사각형입니다.
        this.fillStyle(0xffffff)
        this.fillRect(
            this.border,
            this.border,
            this.width - 2 * this.border,
            this.height - 2 * this.border
        )

        // 이제 HP를 그려줄 것입니다.
        // Hp가 30보다 적게 남았다면 빨간색, 30 이상이라면 초록색으로 채워줍니다.
        if (this.currentHP < 30) {
            this.fillStyle(0xff0000)
        } else {
            this.fillStyle(0x00ff00)
        }

        // 총 HP가 100, 남은 HP가 n이라면 흰 HP 배경에서
        // 왼쪽에서부터 n%만 빨간색 또는 초록색 사각형을 그려줍니다.
        let d = Math.floor(
            ((this.width - 2 * this.border) / this.maxHP) * this.currentHP
        )
        this.fillRect(
            this.border,
            this.border,
            d,
            this.height - 2 * this.border
        );
    }
}