import config from '../index'

export function getRandomPosition(x: number, y: number) {
    const randRad = Math.random() * Math.PI * 2

    let width = config.width as number
    let height = config.height as number

    const r = Math.sqrt(width * width + height * height) / 2
    const newX = x + r * Math.cos(randRad)
    const newY = y + r * Math.sin(randRad)

    return [newX, newY]
}