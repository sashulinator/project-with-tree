import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

// import { State } from '~/packages/tree-chart-node'
import { Id } from '~/utils/core'

export interface NodeProps {
node: { id: Id; name: string }
// state: State
}

export default function Node(props: NodeProps): JSX.Element {
const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

const dragBind = useDrag((event): void => {
const x = event.lastOffset[0] + event.movement[0]
const y = event.lastOffset[1] + event.movement[1]
api.set({ x, y })
})

return (
<animated.g style={{ x, y }} {...dragBind()}>
<rect width='100' height='100' />
<text>{props.node.name}</text>
</animated.g>
)
}
