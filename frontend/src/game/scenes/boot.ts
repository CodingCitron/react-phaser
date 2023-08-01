import { Scene, GameObjects } from "phaser";
import logoImg from '../../assets/img/logo.png'

export class BootScene extends Scene {
  preload() {
    this.load.image('logo', logoImg)
  }

  init() {
    this.scale.on("resize", this.resize, this)
  }

  update(time: number, delta: number): void {
      
  }

  create() {
    const logo = this.add.image(400, 150, 'logo')
      
    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: "Power2",
        yoyo: true,
        loop: -1
    });
  }

  resize(gameSize: GameObjects.Components.Size) {
    this.cameras.resize(gameSize.width, gameSize.height)
  }
}