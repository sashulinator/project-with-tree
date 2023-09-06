import { onThemesAdd } from '~/lib/theme/on-themes-add'
import { Emitter } from '~/utils/emitter'
import { Themes } from '~/utils/theme'

import { Route } from './routes'
import { DARK, LIGHT } from './theme'

export type Events = {
  addThemes: Themes
  addRoutes: Record<string, Route>
}

export const emitter = new Emitter<Events>()

emitter.on('addThemes', onThemesAdd)
emitter.emit('addThemes', { dark: DARK, light: LIGHT })
