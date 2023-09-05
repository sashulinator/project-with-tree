import { onAddTheme } from '~/lib/theme/on-add-theme'
import { ToStringable } from '~/utils/core'
import { Emitter } from '~/utils/emitter'

import { Route } from './routes'

export type Events = {
  addTheme: { [themeName: string]: { [varName: string]: ToStringable } }
  addRoutes: Record<string, Route>
}

const emitter = new Emitter<Events>()

emitter.on('addTheme', onAddTheme)

export { emitter }
