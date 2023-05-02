import { State } from '~/packages/tree-chart-item'

export interface ChartLinkProps<T> {
  targetState: State<T>
  sourceState: State<T>
  link: { type: string; id: string }
}

export default function ChartLink<T>(props: ChartLinkProps<T>): JSX.Element {
  return <path d={drawPath()} />

  // Private

  function drawPath(): string {
    const sx = props.sourceState.position.x
    const sy = props.sourceState.position.y
    const tx = props.targetState.position.x
    const ty = props.targetState.position.y
    return `M${sy},${sx}L${ty},${tx}`
  }
}
