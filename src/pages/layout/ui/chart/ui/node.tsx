export interface NodeProps {
  item: { id: string; name: string }
}

export default function Node(props: NodeProps): JSX.Element {
  return (
    <g>
      <rect width='100' height='100' />
      <text>{props.item.name}</text>
    </g>
  )
}
