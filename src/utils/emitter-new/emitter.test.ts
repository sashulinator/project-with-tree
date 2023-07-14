import { Emitter } from './emitter'

type Events = {
  first: { objectType: boolean }
  second: string
  third: number
}

describe(Emitter.name, () => {
  it('on', () => {
    const emitter = new Emitter<Events>()

    emitter.on('first', (event) => {
      event.objectType
      expect(event).toEqual({ objectType: true })
    })

    emitter.emit('first', { objectType: true })
  })

  it('off', () => {
    const emitter = new Emitter<Events>()

    expect(emitter.listeners.second?.length).toBe(undefined)

    const listener = () => {}

    emitter.on('second', listener)

    expect(emitter.listeners.second?.length).toBe(1)

    emitter.off('second', listener)

    expect(emitter.listeners.second?.length).toBe(0)
  })
})
