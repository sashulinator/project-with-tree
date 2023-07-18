import { emptyFn } from '../function/empty-fn'
import { Notifier } from './notifier'

describe(Notifier.name, () => {
  it('on, emit', () => {
    const notifier = new Notifier<string>()

    notifier.add((value) => expect(value).toBe('hello'))

    notifier.notify('hello')

    expect(notifier.listeners.length).toBe(1)
  })

  it('off ', () => {
    const notifier = new Notifier()

    notifier.add(emptyFn)

    //not existing function
    notifier.remove(() => {})
    expect(notifier.listeners.length).toBe(1)

    //existing function
    notifier.remove(emptyFn)
    expect(notifier.listeners.length).toBe(0)
  })
})
