import { Dictionary } from '../dictionary'

import { СontinuousProp } from './continuous-prop'
import { Emitter } from '~/lib/emitter'

type Events = {
  test: { additional: string; value: string; isLast: boolean }
  additional: { value: string; additional: string }
}

describe(СontinuousProp.name, () => {
  it('test types', () => {
    const emitter = new Emitter<Events>()

    const prop = new СontinuousProp('test', 'string', emitter)

    prop.emitter.on('test', (event) => {
      event.additional
      event.value
      event.isLast
    })

    prop.emitter.emit('additional', { value: '', additional: '' })
  })
})
