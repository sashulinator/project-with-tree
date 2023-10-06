/**
 * set theme
 */
import { emitter } from '~/shared/emitter'

/**
 * set constants
 */
import { dark } from './models/dark'
import { light } from './models/light'

const themes = { dark, light }
emitter.emit('addThemes', themes)

/**
 * export
 */
export { themes }
export type { Theme } from './types/theme'
