import { Types } from "phaser"
import { BootScene } from "./scenes/boot"
import PlayingScene from "./scenes/playing"
import GameOverScene from "./scenes/gameover"
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
            // debug: process.env.DEBUG === 'true' 
            debug: true
        }
    },
    scene: [BootScene, PlayingScene, GameOverScene] // [BootScene, EndScene] 여러가지 사용
}
  
  export default gameConfig