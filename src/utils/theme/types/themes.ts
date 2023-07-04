import { ToStringable } from '~/utils/core'

export type Themes = { [themeName: string]: { [varName: string]: ToStringable } }
