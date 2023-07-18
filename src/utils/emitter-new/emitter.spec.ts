import { Emitter } from './emitter'
import { Notifier, Prop } from '../notifier'

type Events = {
  first: { objectType: boolean }
  second: string
  testNumber: { value: number }
}

const notifiers = {
  first: new Notifier<{ objectType: boolean }>(),
  second: new Notifier<string>(),
  testNumber: new Notifier<{ value: number }>(),
}

describe(Emitter.name, () => {
  it('on', () => {
    const emitter = new Emitter<Events>(notifiers)

    emitter.on('first', (event) => {
      event.objectType
      expect(event).toEqual({ objectType: true })
    })

    emitter.emit('first', { objectType: true })
  })

  it('off', () => {
    const emitter = new Emitter<Events>(notifiers)

    expect(emitter.eventNotifiers.second?.listeners.length).toBe(undefined)

    const listener = () => {}

    emitter.on('second', listener)

    expect(emitter.eventNotifiers.second?.listeners.length).toBe(1)

    emitter.off('second', listener)

    expect(emitter.eventNotifiers.second?.listeners.length).toBe(0)
  })

  it('off', () => {
    const testNumber = new Prop(1111)
    const emitter = new Emitter<Events>({ ...notifiers, testNumber })
    emitter.on('testNumber', (ev) => expect(ev.value).toBe(333))
    testNumber.set(333)
  })
})
