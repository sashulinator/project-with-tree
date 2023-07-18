import { EventEmitter } from './event-emitter'
import { Prop } from './prop'

type Events = {
  first: { objectType: boolean }
  second: string
  third: number
  testNumber: { value: number }
}

describe(EventEmitter.name, () => {
  it('on', () => {
    const emitter = new EventEmitter<Events>()

    emitter.on('first', (event) => {
      event.objectType
      expect(event).toEqual({ objectType: true })
    })

    emitter.emit('first', { objectType: true })
  })

  it('off', () => {
    const emitter = new EventEmitter<Events>()

    expect(emitter.emitterMap.second?.listeners.length).toBe(undefined)

    const listener = () => {}

    emitter.on('second', listener)

    expect(emitter.emitterMap.second?.listeners.length).toBe(1)

    emitter.off('second', listener)

    expect(emitter.emitterMap.second?.listeners.length).toBe(0)
  })

  it('off', () => {
    const testNumber = new Prop(1111)
    const emitter = new EventEmitter<Events>({ testNumber })
    emitter.on('testNumber', (ev) => expect(ev.value).toBe(333))
    testNumber.set(333)
  })
})
