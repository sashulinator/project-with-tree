import { State } from '~/widgets/chart-item'

export interface ChartItemProps extends React.HTMLAttributes<SVGGElement> {
  children: React.ReactNode
  state: State<unknown>
}
