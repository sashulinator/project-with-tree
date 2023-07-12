import { Dictionary } from '../dictionary'

import { Prop } from './prop'
import { Emitter } from '~/lib/emitter'

type Events = {
  test: { additional: string; value: string }
  additional: { value: string; additional: string }
}

describe(Prop.name, () => {
  it('test types', () => {
    const emitter = new Emitter<Events>()

    const prop = new Prop('test', 'string', emitter)

    prop.emitter.on('test', (event) => {
      event.additional
      event.value
    })

    prop.emitter.emit('additional', { value: '', additional: '' })
  })
})
