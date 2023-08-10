import { Scene } from "phaser"
import Config from '../index'
import PlayingScene from "../scenes/playing"

// pause된 scene을 저장할 변수입니다.
let scene_paused: Scene | null = null
// pause된 시각 또는 pause가 해제된 시각을 저장할 변수입니다.
let time_paused = Date.now() - 100
// pause 유형을 저장할 변수입니다. ("pause" 또는 "levelup")
let type_pause: string 

interface PAUSE_TEXT_BY_TYPE_INFO {
    pause: {
        text: string,
        fontSize: number
    },
    levelup: {
        text: string[]
        fontSize: number
    },
    [key: string]: any
}

// pause의 유형에 따라 띄울 문구와 그 크기를 맵핑해준 객체입니다.
const PAUSE_TEXT_BY_TYPE: PAUSE_TEXT_BY_TYPE_INFO = {
    pause: {
        text: "Pause",
        fontSize: 60
    },
    levelup: {
        text: [
            "You're on the Next Level!",
            '',
            "Press Enter to Keep Going",
        ],
        fontSize: 40
    }
}

export function pause(scene: PlayingScene, type: string) {
    const game = scene.game
    // scene이 pause 해제된 지 100ms가 지났고, scene이 active 하다면
    if (Date.now() - time_paused > 100 && game.scene.isActive(scene)) {
        // scene을 일시정지해줍니다.
        game.scene.pause(scene)

        // 각종 변수에 값을 설정해줍니다.
        scene_paused = scene
        time_paused = Date.now()
        type_pause = type

        // 검은 veil과 문구를 띄웁니다.
        scene.veil = createVeil(scene)
        scene.textPause = createPauseText(scene, type_pause)

        const getScene = game.scene.getScene(scene)
        // pause 유형에 따라 다른 소리를 재생해줍니다.
        if (type_pause === 'pause') {
            getScene.sound.get('pauseIn').play()
        } else if (type_pause === 'levelup') {
            getScene.sound.get('pauseOut').play()
        }
    }
}

export function resume(event: KeyboardEvent, game: Phaser.Game) {
    if (
        ((type_pause === "pause" && event.key === "Escape") ||
            (type_pause === "levelup" && event.key === "Enter")) &&
        Date.now() - time_paused > 100 &&
        scene_paused
    ) {
        // scene을 재개(resume)해줍니다.
        const previousScene = game.scene.getScene(scene_paused) as PlayingScene
        game.scene.resume(scene_paused)

        // veil과 문구를 없애줍니다.
        togglePauseScreen(previousScene, false)

        // pause 해제 소리를 재생합니다.
        previousScene.sound.get('pauseOut').play()

        // 레벨업으로 인한 일시정지였을 경우, pause 해제 후 PlayingScene의 afterLevelUp 함수를 실행해 줍니다.
        if (type_pause === 'levelup') {
            previousScene.afterLevelUp()
        }
        // 각종 변수를 적절히 설정해줍니다.
        scene_paused = null
        time_paused = Date.now()
    }
}

// scene에 반투명 검은 veil 화면을 만들어주는 함수입니다.
// 화면이 pause되어도 반투명한 화면을 통해 게임의 상황을 확인할 수 있도록 만들어줍니다.
export function createVeil(scene: Scene) {
    return scene.add
        .graphics({ x: 0, y: 0 })
        .fillStyle(0x000000, 0.3)
        .fillRect(0, 0, Config.width as number, Config.height as number)
        .setDepth(110)
        .setScrollFactor(0)
}

// pause시 화면에 나타낼 텍스트를 만들어주는 함수입니다.
export function createPauseText(scene: Scene, type: string) {
    return scene.add
        .text(Config.width as number / 2,
            Config.height as number / 2,
            PAUSE_TEXT_BY_TYPE[type].text,
            { fontSize: PAUSE_TEXT_BY_TYPE[type].fontSize })
        .setOrigin(0.5)
        .setDepth(120)
        .setScrollFactor(0)
}

// pause 화면(veil + text)을 띄우거나 내리는 함수입니다.
export function togglePauseScreen(scene: PlayingScene, isVisible: Boolean) {
    scene.veil.setVisible(isVisible)
    scene.textPause.setVisible(isVisible)
}