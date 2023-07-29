import './node.css'

import { Item } from '~/ui/canvas'

import { dark } from '../themes/dark'
import { light } from '../themes/light'
import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'
import { NodeState } from '../../_node'
import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'

emitter.emit('addTheme', { dark, light })

Node.displayName = 'decisionEditor-ui-Canvas-w-Node'

export interface NodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  state: NodeState
  title: React.ReactNode
  toolbar: React.ReactNode
  sourceLinks: React.ReactNode
  targetLinks: React.ReactNode
  rootProps?: React.HTMLAttributes<SVGForeignObjectElement>
  onGestureDrug: (event: GestureDragEvent) => void
}

/**
 * Элемент Canvas с фичами
 */
function Node(props: NodeProps): JSX.Element {
  const { title, toolbar, sourceLinks, targetLinks, state, rootProps, ...itemProps } = props

  return (
    <Item
      {...itemProps}
      dataId={state.id}
      ref={props.state.ref.set}
      x={state.position.value.x}
      y={state.position.value.y}
      className={c(props.className, Node.displayName)}
      rootProps={{ ...rootProps, style: { overflow: 'visible', ...rootProps?.style } }}
    >
      <div className={c('toolbar')}>{toolbar}</div>
      <div className={c('title')}>{title}</div>
      <div className='links'>
        <div className='targetLinks'>{targetLinks}</div>
        <div className='sourceLinks'>{sourceLinks}</div>
      </div>
    </Item>
  )
}

export { Node }
