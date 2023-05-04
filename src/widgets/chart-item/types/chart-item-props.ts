import { Item } from '~/entities/decision'
import { State as ItemState } from '~/widgets/chart-item'

export interface ChartItemProps extends React.HTMLAttributes<SVGGElement> {
  children: React.ReactNode
  state: ItemState<Item>
}
