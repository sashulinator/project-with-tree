import { Emitter } from './emitter'
import { EmitterDictionary } from './emitter-dictionary'
import { Notifier } from '../notifier'

type Events = {
  first: { objectType: boolean }
}

describe(EmitterDictionary.name, () => {
  it('on', () => {
    const emitter = new Emitter({ first: new Notifier<{ objectType: boolean }>() })
    const emitterDictionary = new EmitterDictionary<Emitter<Events>, Events>(
      {
        remove: new Notifier(),
        add: new Notifier(),
        update: new Notifier(),
        first: new Notifier(),
      },
      [emitter],
      (em) => 'id'
    )

    emitterDictionary.on('first', (event) => {
      expect(event.value).toEqual({ objectType: true })
    })

    emitter.emit('first', { objectType: true })
  })
})
