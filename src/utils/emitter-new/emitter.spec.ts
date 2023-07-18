import { emptyFn } from '../function/empty-fn'
import { Emitter } from './emitter'

describe(Emitter.name, () => {
  it('on, emit', () => {
    const emitter = new Emitter<string>()

    emitter.add((value) => expect(value).toBe('hello'))

    emitter.emit('hello')

    expect(emitter.listeners.length).toBe(1)
  })

  it('off ', () => {
    const emitter = new Emitter()

    emitter.add(emptyFn)

    //not existing function
    emitter.remove(() => {})
    expect(emitter.listeners.length).toBe(1)

    //existing function
    emitter.remove(emptyFn)
    expect(emitter.listeners.length).toBe(0)
  })
})
