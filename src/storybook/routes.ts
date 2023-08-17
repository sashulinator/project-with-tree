import aAlign from './pages/align/a'
import aBaloon from './pages/balloon/a'
import aCallout from './pages/callout/a'
import aCanvasWItem from './pages/canvas/a-w-item'
import decisionCanvasWNode from './pages/canvas/decision-w-node'
import decisionCanvasWNodeVFilter from './pages/canvas/decision-w-node-v-filter'
import decisionCanvasWNodeWJoint from './pages/canvas/ui-w-node-w-joint'
import uiCheckbox from './pages/checkbox/ui'
import uiLabeled from './pages/labeled/ui'
import uiPaginator from './pages/paginator/ui'
import aPopover from './pages/popover/a'
import aTooltip from './pages/tooltip/a'
import uiTooltip from './pages/tooltip/ui'

export const routes = [
  ['Align', aAlign],
  ['Balloon', aBaloon],
  ['Callout', aCallout],
  ['Canvas', aCanvasWItem, decisionCanvasWNode, decisionCanvasWNodeWJoint, decisionCanvasWNodeVFilter],
  ['Checkbox', uiCheckbox],
  ['Labeled', uiLabeled],
  ['Paginator', uiPaginator],
  ['Popover', aPopover],
  ['Tooltip', aTooltip, uiTooltip],
] as const
