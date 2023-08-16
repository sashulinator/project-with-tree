import aAlign from './pages/align/a'
import aCanvasWItem from './pages/canvas/a-w-item'
import decisionCanvasWNode from './pages/canvas/decision-w-node'
import decisionCanvasWNodeVFilter from './pages/canvas/decision-w-node-v-filter'
import decisionCanvasWNodeWJoint from './pages/canvas/ui-w-node-w-joint'
import uiCheckbox from './pages/checkbox/ui'
import uiLabeled from './pages/labeled/ui'
import uiPaginator from './pages/paginator/ui'
import aPopover from './pages/popover/a'
import uiTolltip from './pages/tooltip/ui'

export const routes = [
  ['Align', aAlign],
  ['Canvas', aCanvasWItem, decisionCanvasWNode, decisionCanvasWNodeWJoint, decisionCanvasWNodeVFilter],
  ['Checkbox', uiCheckbox],
  ['Labeled', uiLabeled],
  ['Paginator', uiPaginator],
  ['Popover', aPopover],
  ['Tooltip', uiTolltip],
] as const
