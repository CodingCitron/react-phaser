export interface Weapon extends Phaser.Physics.Arcade.Sprite {
    damage: number
}
export class StaticWeapon extends Phaser.Physics.Arcade.Sprite {
    [key: string]: any
}
