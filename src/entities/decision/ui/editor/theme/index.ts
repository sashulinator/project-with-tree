/**
 * styles
 */
import './ui.scss'

/**
 * set theme
 */
import { emitter } from '~/shared/emitter'
import { setCSSVars } from '~/utils/dom'

/**
 * set constants
 */
import { constants } from './models/constants'
import { dark } from './models/dark'
import { light } from './models/light'

setCSSVars(constants)

const themes = { dark, light }
emitter.emit('addThemes', themes)

/**
 * export
 */
export { themes }
export { constants } from './models/constants'
export type { Constants } from './types/constants'
export type { Theme } from './types/theme'
