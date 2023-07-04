import { Emitter } from '~/lib/emitter'
import { onAddTheme } from '~/lib/theme/on-add-theme'
import { ToStringable } from '~/utils/core'

export type Events = {
  addTheme: { [themeName: string]: { [varName: string]: ToStringable } }
}

const emitter = new Emitter<Events>()

emitter.on('addTheme', onAddTheme)

export { emitter }
