import PlayingScene from "../scenes/playing"

export function loseGame(scene: PlayingScene) {
    scene.sound.get('gameOver').play()
    scene.scene.start('gameOver', {
        monstersKilled: scene.barWrap?.monsterKilled,
        level: scene.barWrap?.level,
        secondElapsed: scene.secondElapsed 
    })
}

// 게임에서 이겼을 때 이긴 효과음을 재생하고,
// GameClearScene으로 전환시키는 함수입니다.
export function winGame(scene: PlayingScene) {
    scene.sound.get('gameClear').play()
    scene.scene.start('gameClearScene', {
        monstersKilled: scene.barWrap?.monsterKilled,
        level: scene.barWrap?.level,
        secondElapsed: scene.secondElapsed 
    })
}