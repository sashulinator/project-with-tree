import { linear } from './linear'

export function animate(duration: number, draw: (progress: number) => void, timing = linear): void {
  let start = 0

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction: number

    if (start === 0) {
      timeFraction = 0
      start = time
    } else {
      timeFraction = (time - start) / duration
    }

    if (timeFraction > 1) timeFraction = 1

    const progress = timing(timeFraction)

    draw(progress)

    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    }
  })
}
