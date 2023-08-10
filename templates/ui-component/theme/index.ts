/**
 * styles
 */
import './ui.scss'

/**
 * set constants
 */
import { constants } from './models/constants'
import { setCSSVars } from '~/utils/dom'
setCSSVars(constants)

/**
 * set theme
 */
import { emitter } from '~/shared/emitter'
import { dark } from './models/dark'
import { light } from './models/light'
const themes = { dark, light }
emitter.emit('addTheme', themes)

/**
 * export
 */
export { themes }
export { constants } from './models/constants'
export type { Constants } from './types/constants'
export type { Theme } from './types/theme'
