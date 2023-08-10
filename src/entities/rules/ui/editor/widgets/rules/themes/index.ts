import { emitter } from '~/shared/emitter'

import { light } from './light'
import { dark } from './dark'

const themes = { dark, light }

emitter.emit('addTheme', themes)

export { themes }
export type { CSSVars } from './types'
export { common as themeCommon } from './common'
