import aAccordion from './pages/accordion/a'
import aAlign from './pages/align/a'
import aBaloon from './pages/balloon/a'
import aCanvasWItem from './pages/canvas/a-w-item'
import decisionCanvasWNode from './pages/canvas/decision-w-node'
import decisionCanvasWNodeVFilter from './pages/canvas/decision-w-node-v-filter'
import decisionCanvasWNodeWJoint from './pages/canvas/ui-w-node-w-joint'
import uiCheckbox from './pages/checkbox/ui'
import uiLabeled from './pages/labeled/ui'
import aModal from './pages/modal/a'
import uiModal from './pages/modal/ui'
import uiOrderedList from './pages/ordered-list/ui'
import uiPaginator from './pages/paginator/ui'
import aPopover from './pages/popover/a'
import aTooltip from './pages/tooltip/a'
import uiTooltip from './pages/tooltip/ui'

export const routes = [
  ['Accordion', aAccordion],
  ['Align', aAlign],
  ['Balloon', aBaloon],
  ['Canvas', aCanvasWItem, decisionCanvasWNode, decisionCanvasWNodeWJoint, decisionCanvasWNodeVFilter],
  ['Checkbox', uiCheckbox],
  ['Labeled', uiLabeled],
  ['Modal', aModal, uiModal],
  ['Paginator', uiPaginator],
  ['Popover', aPopover],
  ['Tooltip', aTooltip, uiTooltip],
  ['OrderedList', uiOrderedList],
] as const
