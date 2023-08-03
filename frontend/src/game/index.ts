import { Types } from "phaser"
import { BootScene } from "./scenes/boot"

const gameConfig: Types.Core.GameConfig = {
    width: 840,
    height: 480,
    type: Phaser.AUTO,
/*     scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
      antialias: false,
      pixelArt: true,
      roundPixels: true
    }, */
    physics: {
        default: 'arcade',
        arcade: {
            // debug: process.env.DEBUG === 'true' 
          gravity: {
            y: 200
          }
        }
    },
    scene: [BootScene] // [BootScene, EndScene] 여러가지 사용
}
  
  export default gameConfig