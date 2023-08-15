import aAlign from './pages/align/a'
import uiCheckbox from './pages/checkbox/ui'
import uiLabeled from './pages/labeled/ui'
import aPopover from './pages/popover/a'

export const routes = [
  ['Checkbox', uiCheckbox],
  ['Labeled', uiLabeled],
  ['Align', aAlign],
  ['Popover', aPopover],
] as const
