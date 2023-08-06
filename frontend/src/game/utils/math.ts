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

/***
 * @param {Number} value
 * @param {Number} lo
 * @param {Number} hi
 * @returns {number} value가 lo 이상 hi 이하라면 value 그대로, lo 미만이면 lo, hi 초과면 hi를 리턴한다. 
 * @type Number
 */
export function clamp(value: number, lo: number, hi: number) {
    return Math.min(Math.max(value, lo), hi)
}