import aAlign from './pages/align/a'
import uiCheckbox from './pages/checkbox/ui'
import uiLabeled from './pages/labeled/ui'

export const routes = [
  ['Checkbox', uiCheckbox],
  ['Labeled', uiLabeled],
  ['Align', aAlign],
] as const
