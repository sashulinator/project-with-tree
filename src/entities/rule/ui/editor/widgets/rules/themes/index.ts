import { emitter } from '~/shared/emitter'

import { dark } from './dark'
import { light } from './light'

const themes = { dark, light }

emitter.emit('addThemes', themes)

export { themes }
export type { CSSVars } from './types'
export { common as themeCommon } from './common'
