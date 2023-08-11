import { Types } from "phaser"
import { BootScene } from "./scenes/boot"
import PlayingScene from "./scenes/playing"
import GameOverScene from "./scenes/gameover"
import StartScene from "./scenes/startScene"
import GameClearScene from "./scenes/gameclear"
// console.log(window.innerWidth, window.innerHeight)

const gameConfig: Types.Core.GameConfig = {
    width: window.innerWidth + 34, // 840,
    height: window.innerHeight + 34, //480,
    type: Phaser.AUTO,

    // scale: {
    //   mode: Phaser.Scale.FIT,
    //   autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    render: {
      antialias: true,
      pixelArt: true,
      // roundPixels: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: import.meta.env.DEV
        }
    },
    scene: [BootScene, StartScene, PlayingScene, GameOverScene, GameClearScene] // [BootScene, EndScene] 여러가지 사용
}
  
  export default gameConfig