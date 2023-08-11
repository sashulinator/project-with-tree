import './node.css'

import { ReactElement, cloneElement } from 'react'

import { emitter } from '~/shared/emitter'
import { GestureDragEvent, Item } from '~/ui/canvas'
import { c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { ListState, State as NodeState } from '..'
import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

Node.displayName = 'decisionEditor-ui-Canvas-w-Node'

export interface NodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  state: NodeState
  listState: ListState
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
  useUpdate(subscribeOnUpdates)

  const { title, toolbar, sourceLinks, listState, targetLinks, state, rootProps, ...itemProps } = props
  const selected = listState.selection.isSelected(props.state.id)

  return (
    <Item
      {...itemProps}
      dataId={state.id}
      ref={props.state.ref.set}
      x={state.position.value.x}
      y={state.position.value.y}
      className={c(props.className, Node.displayName, selected && `--selected`)}
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

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(listState.on('selection', update))
  }
}
