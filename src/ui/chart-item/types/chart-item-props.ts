import { Item } from '~/entities/decision'
import { State as TreeState } from '~/packages/chart'
import { State as ItemState } from '~/packages/chart-item'
import { Any } from '~/utils/core'

export interface ChartItemProps {
  onClick: (event: MouseEvent) => void
  children: React.ReactNode
  state: ItemState<Item>
  treeState: TreeState<Any, Any>
}
