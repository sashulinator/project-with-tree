import './node.css'

import { Item, GestureDragEvent } from '~/ui/canvas'

import { dark } from '../themes/dark'
import { light } from '../themes/light'
import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'
import { State as NodeState } from '..'

import { ReactElement, cloneElement } from 'react'

emitter.emit('addTheme', { dark, light })

Node.displayName = 'decisionEditor-ui-Canvas-w-Node'

export interface NodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  state: NodeState
  title: ReactElement | null
  toolbar: ReactElement | null
  sourceLinks?: ReactElement | null
  targetLinks?: ReactElement | null
  rootProps?: React.HTMLAttributes<SVGForeignObjectElement>
  onGestureDrug: (event: GestureDragEvent) => void
}

/**
 * Элемент Canvas с фичами
 */
export default function Node(props: NodeProps): JSX.Element {
  const { title, toolbar, sourceLinks, targetLinks, state, rootProps, ...itemProps } = props

  return (
    <Item
      {...itemProps}
      dataId={state.id}
      ref={props.state.ref.set}
      x={state.position.value.x}
      y={state.position.value.y}
      className={c(props.className, Node.displayName)}
      style={{ width: '20rem' }}
      rootProps={{ ...rootProps, style: { overflow: 'visible', ...rootProps?.style } }}
    >
      {toolbar && cloneElement(toolbar, { className: 'toolbar' })}
      {title && cloneElement(title, { className: 'title' })}
      <div className='links'>
        {targetLinks && cloneElement(targetLinks, { className: 'targetLinks' })}
        <hr style={{ opacity: '0.1' }} />
        {sourceLinks && cloneElement(sourceLinks, { className: 'targetLinks' })}
      </div>
    </Item>
  )
}
