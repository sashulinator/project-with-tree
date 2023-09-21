import { Any, Position } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

type MousePosition = { clientX: number; clientY: number }

type Props = {
  getScale: () => number
  getTranslate: () => Position
}

/**
 * @final
 */
export class MousePositionProp<N extends string> extends Prop<N, Position> {
  private _mousePosition: MousePosition

  private getScale: () => number

  private getTranslate: () => Position

  constructor(eventName: N, props: Props, emitter: Emitter<Any>) {
    super(eventName, { x: 0, y: 0 }, emitter)

    this._mousePosition = { clientX: 0, clientY: 0 }

    this.getScale = props.getScale

    this.getTranslate = props.getTranslate

    emitter.on('*', (name) => {
      if (name === eventName) return
      this.updateMousePosition(this._mousePosition)
    })
  }

  subscribe = (): void => {
    document.addEventListener('mousemove', (e) => this.updateMousePosition(e))
    document.addEventListener('mouseenter', (e) => this.updateMousePosition(e))
  }

  unsubscribe = (): void => {
    document.removeEventListener('mousemove', (e) => this.updateMousePosition(e))
    document.removeEventListener('mouseenter', (e) => this.updateMousePosition(e))
  }

  private updateMousePosition(ev: { clientX: number; clientY: number }): void {
    this._mousePosition = { clientX: ev.clientX, clientY: ev.clientY }
    const x = Math.round(ev.clientX)
    const y = Math.round(ev.clientY)

    const canvasTranslate = this.getTranslate()
    const scale = this.getScale()

    this.set({
      x: (x - canvasTranslate.x) / scale,
      y: (y - canvasTranslate.y) / scale,
    })
  }
}
