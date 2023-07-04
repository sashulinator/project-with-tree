import { Emitter } from '~/lib/emitter'
import { ToStringable } from '~/utils/core'

export type Events = {
  addTheme: { [themeName: string]: { [varName: string]: ToStringable } }
}

const emitter = new Emitter<Events>()

export { emitter }
