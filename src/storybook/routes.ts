import aAccordion from './pages/accordion/a'
import uiAccordion from './pages/accordion/ui'
import uiAccordionVChevron from './pages/accordion/ui-v-chevron'
import aAlign from './pages/align/a'
import aBaloon from './pages/balloon/a'
import aCanvasWItem from './pages/canvas/a-w-item'
import decisionCanvasWNode from './pages/canvas/decision-w-node'
import decisionCanvasWNodeVFilter from './pages/canvas/decision-w-node-v-filter'
import decisionCanvasWNodeWJoint from './pages/canvas/ui-w-node-w-joint'
import uiCheckbox from './pages/checkbox/ui'
import aCollapse from './pages/collapse/a'
import uiDndCanvas from './pages/dnd-canvas/ui'
import uiField from './pages/field/ui'
import uiInput from './pages/input/ui'
import uiInputVClearable from './pages/input/ui-v-clearable'
import uiInputVPassword from './pages/input/ui-v-password'
import uiLabeled from './pages/labeled/ui'
import aList from './pages/list/a'
import uiMentions from './pages/mensions/ui'
import aModal from './pages/modal/a'
import uiModal from './pages/modal/ui'
import uiOrderedList from './pages/ordered-list/ui'
import uiPaginator from './pages/paginator/ui'
import aPopover from './pages/popover/a'
import aTooltip from './pages/tooltip/a'
import uiTooltip from './pages/tooltip/ui'

export const routes = [
  ['Accordion', aAccordion, uiAccordion, uiAccordionVChevron],
  ['Align', aAlign],
  ['Balloon', aBaloon],
  ['Canvas', aCanvasWItem, decisionCanvasWNode, decisionCanvasWNodeWJoint, decisionCanvasWNodeVFilter],
  ['Checkbox', uiCheckbox],
  ['Collapse', aCollapse],
  ['Field', uiField],
  ['Input', uiInput, uiInputVClearable, uiInputVPassword],
  ['Labeled', uiLabeled],
  ['List', aList],
  ['Mentions', uiMentions],
  ['Modal', aModal, uiModal],
  ['Paginator', uiPaginator],
  ['Popover', aPopover],
  ['Tooltip', aTooltip, uiTooltip],
  ['OrderedList', uiOrderedList],
  ['DndCanvas', uiDndCanvas],
] as const
