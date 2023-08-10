import Config from '../index'
import PlayingScene from '../scenes/playing'

export function createTime(scene: PlayingScene) {
    // scene에 플레이 시간(초 단위)을 멤버 변수로 추가
    scene.secondElapsed = 0

    // 시간 텍스트 생성
    scene.timeText = scene.add
        .text(Config.width as number - 134, Config.height as number - 100, "00:00", { fontSize: 30 })
        .setOrigin(0.5)
        .setDepth(100)
        .setScrollFactor(0)
    // 1초마다 플레이 시간에 1을 더하고 이를 mm:ss 형식으로 변환한 텍스트를 화면에 띄움
    scene.time.addEvent({
        callback: () => {
            scene.secondElapsed += 1
            scene.timeText.setText(getTimeString(scene.secondElapsed))
        },
        delay: 1000,
        loop: true,
    })
}

// 시간을 초 단위로 받아 mm:ss 형식으로 변환해주는 함수입니다.
export function getTimeString(seconds: number) {
    const timeMinute = Math.floor(seconds / 60 % 60)
        .toString()
        .padStart(2, "0")
    const timeSecond = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0")
    return `${timeMinute}:${timeSecond}`
}