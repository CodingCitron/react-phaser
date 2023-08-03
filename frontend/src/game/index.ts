import { Types } from "phaser"
import { BootScene } from "./scenes/boot"
import PlayingScene from "./scenes/playing"

// console.log(window.innerWidth, window.innerHeight)

const gameConfig: Types.Core.GameConfig = {
    width: window.innerWidth, // 840,
    height: window.innerHeight, //480,
    type: Phaser.AUTO,
    // scale: {
    //   mode: Phaser.Scale.FIT,
    //   autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    render: {
      antialias: false,
      pixelArt: true,
      roundPixels: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: process.env.DEBUG === 'true' 
            debug: true
        }
    },
    scene: [BootScene, PlayingScene] // [BootScene, EndScene] 여러가지 사용
}
  
  export default gameConfig