import aAlign from './pages/align/a'
import aCanvasWItem from './pages/canvas/a-w-item'
import aCanvasWNodeVFilter from './pages/canvas/ui-w-node-v-filter'
import uiCheckbox from './pages/checkbox/ui'
import uiLabeled from './pages/labeled/ui'
import uiPaginator from './pages/paginator/ui'
import aPopover from './pages/popover/a'
import uiTolltip from './pages/tooltip/ui'

export const routes = [
  ['Checkbox', uiCheckbox],
  ['Labeled', uiLabeled],
  ['Align', aAlign],
  ['Popover', aPopover],
  ['Tooltip', uiTolltip],
  ['Paginator', uiPaginator],
  ['Canvas', aCanvasWItem, aCanvasWNodeVFilter],
] as const
