import { Scene } from "phaser"

export function loseGame(playingScene: Scene) {
    // PlayingScene.gameOverSound.play()
    playingScene.scene.start('gameOver')
}